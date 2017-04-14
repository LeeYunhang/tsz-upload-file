
export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

function dumpObj(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function dumpFiles() {
  dumpObj('storedFiles', this.storedFiles)
}

export function dumpDataSourceMode() {
  dumpObj('dataSourceIsPublic', this.dataSourceIsPublic)
}

export function dumpTags() {
  dumpObj('storedTags', this.storedTags)
}

export function dumpSearchTags() {
  dumpObj('searchTags', this.searchTags)
}

export function dumpAll() {
  this.dumpFiles()
  this.dumpTags()
  this.dumpSearchTags()
}

