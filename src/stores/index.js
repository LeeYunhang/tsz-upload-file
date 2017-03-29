import { observable, computed, action } from 'mobx'
import { difference, union, intersection } from '../utils'

import { uploadFilesAction } from './upload-files-action'
import syncFileAction from './sync-file-action'

class State {
  // kind of errors
  uploadingError = observable(false)
  syncFileError = observable(false)

  dataSourceIsPublic = observable(false)
  isUploading = observable(false)
  remainFilesCount = observable(0)
  uploadedFiles = observable([])
  allTags = observable(JSON.parse(localStorage.getItem('allTags')) || [])
  searchTags = observable(JSON.parse(localStorage.getItem('searchTags')) || [])
  storedFiles = observable(JSON.parse(localStorage.getItem('storedFiles')) || [])

  static dumpObj(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  constructor() {
    this.updateTags()
    this.dumpTags()
  }

  uploadFiles = action(uploadFilesAction.bind(null, this))

  syncFile = action(syncFileAction.bind(null, this))

  uploadedFilesCount = computed(() => this.uploadedFiles.length)

  switchDataSource = null

  dumpFiles() {
    State.dumpObj('storedFiles', this.storedFiles)
  }

  dumpTags() {
    State.dumpObj('allTags', this.allTags)
  }

   dumpSearchTags() {
    State.dumpObj('searchTags', this.searchTags)
  }

  dumpAll() {
    this.dumpFiles()
    this.dumpTags()
    this.dumpSearchTags()
  }

  addFiles(files) {
    this.storedFiles.push(...files)
    this.updateTags()
    this.dumpFiles()
    this.dumpTags()
  }

  getFileByUrl(url) {
    return this.storedFiles.filter(file => file.url === url)[0]
  }

  deleteFiles(urls) {
    urls.forEach(url => {
      for (let i = 0; i < this.storedFiles.length; ++i) {
        if (this.storedFiles[i].url === url) {
          this.storedFiles.splice(i, 1)
        }
      }
    })
    this.updateTags()
    this.dumpFiles()
    this.dumpTags()
  }

  updateFile(url, newFile) {
    for (let i = 0, length = this.storedFiles.length; i < length; ++i) {
      if (this.storedFiles[i].url === url) {
        this.storedFiles[i] = Object.assign({}, this.storedFiles[i], newFile)
        break
      }
    }
    this.updateTags()
    this.dumpFiles()
    this.dumpTags()
  }

  updateTags() {
    this.allTags.clear()
    this.storedFiles.forEach(file => {
      file.tags.forEach(tag => {
        if (!this.allTags.includes(tag)) {
          this.allTags.push(tag)
        }
      })
    })
  }
}


export default new State()