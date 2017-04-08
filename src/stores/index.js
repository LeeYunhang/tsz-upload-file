import { observable, computed, action, runInAction } from 'mobx'
import { difference, union, intersection } from '../utils'

import { uploadFilesAction } from './upload-files-action'
import syncFile from './sync-file'
import { dumpAll, dumpDataSourceMode, dumpFiles, dumpSearchTags, dumpTags, getFromStorage } from './storage'
import { fetchFilesByCount, fetchFilesByTags } from './fetch-file'
import { fetchTags } from './fetch-tags'
import { FETCH_FILES_COUNT } from '../utils'

class State {

// ---------- temporary data ----------------
  uploadingError = observable(false)
  syncFileError = observable(false)
  fetchFileError = observable(false)
  remainFilesCount = observable(0)
  isUploading = observable(false)
  uploadedFilesCount = computed(() => this.uploadedFiles.length)
  uploadedFiles = observable([])
  sourceFiles = observable([])
  syncedFileCount = observable(0)
  sourceTags = observable([])
  fetchedFilesCount = 0
  fetchedTags = []

// ---------- permanent data ----------------
  dataSourceIsPublic = observable(getFromStorage('dataSourceIsPublic') || false)
  storedTags = observable(getFromStorage('storedTags') || [])
  searchTags = observable(getFromStorage('searchTags') || [])
  storedFiles = getFromStorage('storedFiles') || []

// ---------- constructor function ----------
  constructor() {

    this.dumpFiles = dumpFiles.bind(this)
    this.dumpDataSourceMode = dumpDataSourceMode.bind(this)
    this.dumpTags = dumpTags.bind(this)
    this.dumpSearchTags = dumpSearchTags.bind(this)
    this.dumpAll = dumpAll.bind(this)
    
    this.refreshSourceFilesAction()
    this.refreshSourceTagsAction()
  }
  
// ----------- network action ---------------

  uploadFilesAction = action(uploadFilesAction.bind(this))

  syncFileAction = action(async (url) => {
    let file = this.getFileByUrl(url)   
    
    try {
      await syncFile(file)
      file.isSync = true
    } catch(e) {
      this.syncFileError.set(true)
    }
  })

  // swtich data source, public or privacy?
  switchDataSourceAction = action(async () => {
    this.dataSourceIsPublic.set(!this.dataSourceIsPublic.get())
    this.dumpDataSourceMode()
    this.refreshSourceFilesAction()
  })

// ------------- stored file ----------------

  addStoredFilesAction = (files) => {
    this.storedFiles.push(...files)
    this.refreshSourceFilesAction()
    this.updateStoredTags()
    this.dumpFiles()
    this.dumpTags()
  }

  deleteStoredFile = (url) => {
    for (let i = 0; i < this.storedFiles.length; ++i) {
      if (this.storedFiles[i].url === url) {
        this.storedFiles.splice(i, 1)
        break
      }
    }
    // for (let i = 0; i < this.sourceFiles.length; ++i) {
    //   if (this.sourceFiles[i].url === url) {
    //     this.sourceFiles.splice(i, 1)
    //   }
    // }
    this.updateStoredTags()
    this.dumpAll()
  }

  updateStoredFile = (url, newFile) => {
    for (let i = 0, length = this.storedFiles.length; i < length; ++i) {
      if (this.storedFiles[i].url === url) {
        this.storedFiles[i] = Object.assign({}, this.storedFiles[i], newFile)
        break
      }
    }


    this.updateStoredTags()
    this.dumpAll()
  }

// ------------- stored tag -----------------

  updateStoredTags = () => {
    let tmp = []

    this.storedTags.clear()
    this.storedFiles.forEach(file => tmp.push(...file.tags))
    this.storedTags.push(...(new Set(tmp)))
  }

// ------------- source tag -----------------
  updateSourceTagsAction = action(async () => {
    this.sourceTags.clear()
    this.updateStoredTags()
    this.sourceTags.push(...(new Set([...this.fetchedTags, ...this.storedTags])))

    console.log(JSON.stringify(this.sourceTags))
  })

  refreshSourceTagsAction = action(async () => {
    let tags = await fetchTags()

    this.fetchedTags = tags
    await this.updateSourceTagsAction()
  })

// ------------- source file ----------------
  addSourceFileAction = action((file) => {
    const { url, width, height } = file
    let length = this.sourceFiles.length
    let tempUrl = `http://placehold.it/${width}x${height}`
    let image = new Image()

    image.src = tempUrl
    this.sourceFiles.push(Object.assign({}, file, { url: tempUrl }))

    image.onload = runInAction(() => {
      if (this.sourceFiles[length] && this.sourceFiles[length].url === tempUrl) {
        this.sourceFiles[length].url = url
      }
    })
  })

  deleteSourceFileAction = action((url) => {
    for (let i = 0; i < this.sourceFiles.length; ++i) {
      if (this.sourceFiles[i].url === url) {
        this.sourceFiles.splice(i, 1)
        break
      }
    }

    if (!this.dataSourceIsPublic.get()) {
      this.deleteStoredFile(url)
    }
  })

  updateSourceFileAction = action((url, newFile) => {
    for (let i = 0; i < this.sourceFiles.length; ++i) {
      if (this.sourceFiles[i].url === url) {
        this.sourceFiles[i] = Object.assign({}, this.sourceFiles[i], newFile)
      }
    }

    if (!this.dataSourceIsPublic.get()) {
      this.updateStoredFile(url, newFile)    
    }
  })
  refreshSourceFilesAction = action(async () => {
    this.fetchedFilesCount = 0
    this.sourceFiles.clear()
    
    await this.fetchFilesToSourceFilesAction()
  })  

  fetchFilesToSourceFilesAction = action(async () => {
    let files

    if (this.dataSourceIsPublic.get()) {
      files = await fetchFilesByCount(this.fetchedFilesCount, FETCH_FILES_COUNT)
      
      if (this.fetchFileError.get()) { return }
    } else {
      files = this.storedFiles.slice(this.fetchedFilesCount, this.fetchedFilesCount + FETCH_FILES_COUNT)
    }

    this.fetchedFilesCount += FETCH_FILES_COUNT
    files.forEach(this.addSourceFileAction)
  })

// ----------------- else -------------------
  getFileByUrl(url) {
    return this.storedFiles.filter(file => file.url === url)[0]
  }
}

export default new State()