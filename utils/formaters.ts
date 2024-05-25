export const buildSuffix = (num: number | undefined) => {
  if (typeof num === 'undefined') {
    return '😣'
  }
  const suffixes = ['', 'К', 'М']
  let i = 0
  while (num >= 1000 && i < suffixes.length - 1) {
    num /= 1000
    i++
  }
  const roundedNum = Math.round(num * 10) / 10
  const suffix = suffixes[i]
  return roundedNum + suffix
}
export const buildTime = (minutes: number | undefined) => {
  if (typeof minutes !== 'number' || minutes < 0) {
    return '😣'
  }
  let hours = Math.floor(minutes / 60)
  minutes = minutes % 60

  let result = ''
  if (hours > 0) {
    result += hours + 'h '
  }
  result += minutes + 'm'

  return result
}
export const buildDate = (date: string | undefined): string => {
  if (typeof date === 'undefined') {
    return '😣'
  }
  const newDate = new Date(date)
  const month = newDate.toLocaleString('en-US', { month: 'long' })
  const day = newDate.getDate()
  const year = newDate.getFullYear()

  return `${month} ${day}, ${year}`
}
