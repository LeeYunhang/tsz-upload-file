

export async function uploadFilesAction(state, files) {
  let tmpFiles = []

  console.log(files)
  files = Array.from(files)
  state.isUploading.set(true)
  state.remainFilesCount.set(files.length)
  try {
    while (state.remainFilesCount.get()) {
      let file = files.shift()
      let formData = new FormData()

      formData.append('smfile', file)
      if (file.size > 5000 * 1000) { throw new Error('The file size exceeds the limit') }
      
      let res = await fetch('https://sm.ms/api/upload', { method: 'POST', body: formData })
      let json = await res.json()
      
      if (!state.isUploading.get()) {
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
      state.uploadedFiles.push(tmpFiles[0])
      state.remainFilesCount.set(files.length)
    }
    
    state.addFiles(tmpFiles)
  } catch(e) {
    state.uploadingError.set(true)
  } finally {
    state.isUploading.set(false)
  }
}