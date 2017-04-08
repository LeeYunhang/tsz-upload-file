
import { HOST, FETCH_TAGS_URL } from '../utils'

export async function fetchTags() {
  const response = await fetch(FETCH_TAGS_URL)
  const json = await response.json()
  
  return json.data
}