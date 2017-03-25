


export function union(a, b) {
  return Array.from(new Set(a.concat(b)))
}

export function intersection(a, b) {
  return a.filter(v => b.contains(v))
}

export function difference(a = [], b = []) {
  return a.concat(b).filter(v => !a.contains(v) || !b.contains(v))
}