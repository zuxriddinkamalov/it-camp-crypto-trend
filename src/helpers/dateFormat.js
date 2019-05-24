import moment from 'moment'

export const fromNow = (date, format) => {
  const now = moment(new Date())

  if (now.diff(date, 'day') > 1) {
    return moment(date).format(format)
  }

  return moment(date).fromNow()
}

export const format = (date, format) => {
  if (date) return moment(date).format(format)
}
