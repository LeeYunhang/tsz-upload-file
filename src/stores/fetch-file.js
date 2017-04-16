
import { HOST, FETCH_FILES_URL } from '../utils'

export async function fetchFilesByCount(start, count) {
  const fetchUrl = `${FETCH_FILES_URL}/${start}/${count}`
  const response = await fetch(fetchUrl, {
    method: 'GET',
    credentials: 'include'
  })

  if (response.status === 200) {
    let json = await response.json()
    return json.data
  } else if (response.status === 404) {
    return []
  }
}

export async function fetchFilesByTags(tags, start, count) {
  const query = tags.map((tag, index) => `tag${index}=${tag}`).join('&')
  const fetchUrl = `${FETCH_FILES_URL}/tags/${start}/${count}?${query}`
  
  const response = await fetch(fetchUrl, {
    method: 'GET',
    credentials: 'include'
  })
  const json = await response.json()

  if (response.status === 200) { return json.data }
  else if (response.status === 404) { return [] }
}