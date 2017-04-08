
import { HOST, FETCH_FILES_URL } from '../utils'

export async function fetchFilesByCount(start, count) {
  try {
    const fetchUrl = `${FETCH_FILES_URL}/${start}/${count}`
    console.log(fetchUrl)
    const response = await fetch(fetchUrl)

    if (response.status === 200) {
      let json = await response.json()
      console.log(json)
      return json.data
    } else {
      throw new Error('fetch files failed!')
    }
  } catch(e) {
    throw e
  }
}

export async function fetchFilesByTagsAction(tags) {
  // const query = tags.reduce((pre, tag, i) => pre? `${pre}&tag${i}=${tag}` : `tag${i}=${tag}`, '')
  // const fetchUrl = `${apiUrl}?${query}`
  // const response = await fetch(fetchUrl)
  // const files = JSON.parse((await response.json())).data

  return []
}