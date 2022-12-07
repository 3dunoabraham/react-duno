// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value, length) => {
  return `${value}`.padStart(length, '0');
}
const THE_DATE_NOW = new Date()
export const tenYearsAgoDateString = `${THE_DATE_NOW.getUTCFullYear()-10}-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`
export const tenYearsFutureDateString = `${THE_DATE_NOW.getUTCFullYear()+10}-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`

export const parseUTCString = (_theDate) => {
  // const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  // let theDate = new Date(_theDate.toLocaleString('default', { timeZone: tz }))
  let theDate = new Date(_theDate.toUTCString())
  // console.log("AAAAAAAAA",_theDate,new Date())

  return `${theDate.getUTCFullYear()}-${zeroPad(theDate.getUTCMonth()+1,2)}-${zeroPad(theDate.getUTCDate(),2)}T${zeroPad(theDate.getUTCHours(),2)}:${zeroPad(theDate.getUTCMinutes(),2)}`
}
// export const parseDateToBackendFormat = (theDate) => {
//   return `${theDate.getFullYear()}-${zeroPad(theDate.getMonth()+1,2)}-${zeroPad(theDate.getDate(),2)} ${zeroPad(theDate.getHours(),2)}:${zeroPad(theDate.getMinutes(),2)}`
// }