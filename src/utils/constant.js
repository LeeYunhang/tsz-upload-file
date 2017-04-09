export const ERROR   = Symbol('error')
export const INFO    = Symbol('info')
export const SUCCESS = Symbol('success')
export const WARNING = Symbol('warning')

export const HOST = 'http://www.seeonce.cn:80'

const API_ROOT = HOST + '/tsz/api/v1'

export const FETCH_FILES_URL = `${API_ROOT}/pictures`
export const SYNC_FILE_URL = `${API_ROOT}/pictures`
export const FETCH_TAGS_URL = `${API_ROOT}/tags`

export const FETCH_FILES_COUNT = 30