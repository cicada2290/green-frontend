import dayjs from 'dayjs'

export const unixtimeToDate = (unixtime: number) => {
  return dayjs(unixtime * 1000).format('MMM-DD-YYYY')
}
