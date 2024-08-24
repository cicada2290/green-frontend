export const toHex32 = (num: number): string => {
  return `0x${num.toString(16).padStart(64, '0')}`
}

export const shortenHex = (hexNumber: string, keepEnd: number = 7): string => {
  const strippedHex = hexNumber.slice(2)

  if (strippedHex.length <= keepEnd) {
    return hexNumber
  }

  const zeroPaddingLength = strippedHex.length - keepEnd
  const zerosToShow = Math.min(zeroPaddingLength, 13)
  const shortened = `0x${'0'.repeat(zerosToShow)}...${strippedHex.slice(-keepEnd)}`

  return shortened
}
