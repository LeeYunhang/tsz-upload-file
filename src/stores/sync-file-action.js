
import { SYNC_FILE_URL } from '../utils'


export default async function(state, url) {
  const file = state.getFileByUrl(url)

  const response = await fetch(SYNC_FILE_URL, {
    method: 'POST',
    body: JSON.stringify(file),
    headers: {
      "Content-Type": 'application/json'
    },
    credentials: 'omit'
  })

  if (response.status === 201) {
    file.isSync = true
  } else {
    state.syncFileError.set(true)
  }
}