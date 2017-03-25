export { intersection, union, difference } from './set-operations.js'

export function clearSuffix(name) {
  let tmp = name.split('.')
  tmp.pop()
  return tmp.join('.')
}