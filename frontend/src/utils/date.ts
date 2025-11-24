const monthAbbreviations = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const formatUTC = (date: string) => {
  if (!date) return 'Never'
  const d = new Date(date)
  const day = d.getDate()
  const month = monthAbbreviations[d.getMonth()]
  return `${day} ${month}`
}
