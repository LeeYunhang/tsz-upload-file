
import { HOST, FETCH_FILES_URL } from '../utils'

export async function fetchFilesByCount(start, count) {
  try {
    const fetchUrl = `${FETCH_FILES_URL}/${start}/${count}`
    const response = await fetch(fetchUrl)

    if (response.status === 200) {
      let json = await response.json()
      return json.data
    } else {
      throw new Error('fetch files failed!')
    }
  } catch(e) {
    throw e
  }
}

export async function fetchFilesByTags(tags, start, count) {
  try {
    const query = tags.map((tag, index) => `tag${index}=${tag}`).join('&')
    const fetchUrl = `${FETCH_FILES_URL}/${start}/${count}?${query}`
    const response = await fetch(fetchUrl)
    const json = await response.json()

    return json.data
  } catch(e) {
    throw e
  }
}