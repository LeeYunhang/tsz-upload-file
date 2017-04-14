export function clearSuffix(name) {
  let tmp = name.split('.')
  tmp.pop()
  return tmp.join('.')
}