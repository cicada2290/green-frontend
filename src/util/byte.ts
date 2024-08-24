export const convertBytes = (bytes: string): string => {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === '0') return '0 Bytes'
  const index = Math.floor(Math.log(Number(bytes)) / Math.log(1024))
  const convertedValue = (Number(bytes) / Math.pow(1024, index)).toFixed(2)
  return `${convertedValue} ${units[index]}`
}
