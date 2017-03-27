export { intersection, union, difference } from './set-operations.js'

export function clearSuffix(name) {
  let tmp = name.split('.')
  tmp.pop()
  return tmp.join('.')
}

export const ERROR   = Symbol('error')
export const INFO    = Symbol('info')
export const SUCCESS = Symbol('success')
export const WARNING = Symbol('warning')
