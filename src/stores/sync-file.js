
import { SYNC_FILE_URL } from '../utils'

// synchronize file to server
export default async function(file) {
  console.log(JSON.stringify(file))
  const response = await fetch(SYNC_FILE_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(file),
  })

  if (response.status === 201) {
    file.isSync = true
  } else {
    throw new Error('synchronize file failed') 
  }

}