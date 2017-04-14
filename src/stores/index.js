import { observable, computed, action } from 'mobx'

class State {
  isUploading = observable(false)
  error = observable(false)
  files = observable([])
  uploadedFiles = observable([])

  uploadFiles = action(async (files) => {
    Array.from(files).forEach((file) => this.files.push(file))
    this.isUploading.set(true)

    try {
      while (this.remainFilesCount.get()) {
        let file = this.files[this.remainFilesCount.get() - 1]

        if (file.size > 5000 * 1000) { throw new Error('The file size exceeds the limit') }
        
        let formData = new FormData()
        formData.append('smfile', file)
        let res = await fetch('https://sm.ms/api/upload', { method: 'POST', body: formData })
        let json = await res.json()
        
        console.log(this.files)
        if (this.error.get() || res.status !== 200 || json.code !== 'success') { 
          throw new Error('upload failed!') 
        }
        this.files.pop()

        this.uploadedFiles.unshift({ 
            filename: file.name, 
            url: json.data.url,
            date: Date.now()
        })
      }
    } catch (e) {
      this.error.set(true)
    } finally {
      this.isUploading.set(false)
      this.files.clear()
      this.error.set(false)
    }
  })

  remainFilesCount = computed(() => this.files.length)
  uploadedFilesCount = computed(() => this.uploadedFiles.length)
}

export default new State()