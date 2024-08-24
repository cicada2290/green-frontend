export * from './client'
export * from './bucket'
export * from './object'
export * from './offchainAuth'

export const humpToLine = (name: string) => {
  return (
    name.slice(0, 1).toLocaleLowerCase() +
    name
      .slice(1)
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
  )
}

export const forEach = (obj: any) => {
  for (const str in obj) {
    let item = obj[str]
    if (item instanceof Object) {
      item = forEach(item)
    }
    delete obj[str]
    obj[humpToLine(str)] = item
  }
  return obj
}
