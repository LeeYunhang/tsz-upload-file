
// upload file to sm.ms
export async function uploadFilesAction(files) {
  let tmpFiles = []

  console.log(files)
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
      
      if (!this.isUploading.get()) {
        return
      }
      if (res.status !== 200 || json.code !== 'success') { 
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
    
    this.addStoredFilesAction(tmpFiles)
  } catch(e) {
    this.uploadingError.set(true)
  } finally {
    this.isUploading.set(false)
  }
}