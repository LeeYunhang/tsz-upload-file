
import { SYNC_FILE_URL } from '../utils'


function searchParams(params) {
  return Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
}

// synchronize file to server
export default async function(file) {
  console.log(JSON.stringify(file))
  const response = await fetch(SYNC_FILE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=urtf-8',
    },
    body: searchParams(file),
  })

  if (response.status === 201) {
    file.isSync = true
  } else {
    throw new Error('synchronize file failed') 
  }

  // let xhr = new XMLHttpRequest()
  // xhr.open('POST', SYNC_FILE_URL)
  // xhr.setRequestHeader('Content-Type', 'application/json')
  // xhr.send(JSON.stringify(file))

}