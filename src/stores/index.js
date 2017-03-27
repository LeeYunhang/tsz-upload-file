import { observable, computed, action } from 'mobx'
import { difference, union, intersection } from '../utils'

class State {
  isUploading = observable(false)
  error = observable(false)
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

  uploadFiles = action(async (files) => {
    let tmpFiles = []

    files = Array.from(files)
    this.isUploading.set(true)
    this.remainFilesCount.set(files.length)
    try {
      while (this.remainFilesCount.get()) {
        let file = files.shift()
        let formData = new FormData()

        formData.append('smfile', file)
        if (file.size > 5000 * 1000) { throw new Error('The file size exceeds the limit') }
        
        let res = await fetch('https://sm.ms/api/upload', { method: 'POST', body: formData })
        let json = await res.json()
        
        if (this.error.get() || res.status !== 200 || json.code !== 'success') { 
          throw new Error('upload failed!') 
        }

        let data = json.data
        tmpFiles.unshift({
          filename: data.filename,
          width: data.width,
          height: data.height,
          size: data.size,
          timestamp: data.timestamp,
          url: data.url,
          deleteUrl: data['delete'],
          tags: []
        })
        this.uploadedFiles.push(tmpFiles[0])
        this.remainFilesCount.set(files.length)
      }
      
      this.addFiles(tmpFiles)
    } catch (e) {
      this.error.set(true)
    } finally {
      this.isUploading.set(false)
      this.error.set(false)
    }
  })

  uploadedFilesCount = computed(() => this.uploadedFiles.length)

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