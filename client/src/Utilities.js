function getCurrentDate () {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getCurrentTime () {
  const date = new Date()
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')

  return `${hour}:${minute}:${second}`
}

function getCurrentDateTime () {
  const date = new Date()

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

function formatDate (date) {
  const processedDate = new Date(date)
  return (processedDate.getFullYear() + '-' + String(processedDate.getMonth() + 1).padStart(2, '0') + '-' + String(processedDate.getDate()).padStart(2, '0'))
}

function formatDateTime (date) {
  const processedDate = new Date(date)
  return (processedDate.getFullYear() + '-' + String(processedDate.getMonth() + 1).padStart(2, '0') + '-' + String(processedDate.getDate()).padStart(2, '0') + 'T' + String(processedDate.getHours()).padStart(2, '0') + ':' + String(processedDate.getMinutes()).padStart(2, '0'))
}

function dtlToMysql (dtl) {
  // dtl = datetime-locale picker format
  return dtl.substring(0, 10) + ' ' + dtl.substring(11, 18)
}

function addMinutes (date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

function addOneDay (date) {
  const dateCopy = new Date(date)
  dateCopy.setDate(date.getDate() + 1)
  return dateCopy
}

function subtractOneDay (date) {
  const dateCopy = new Date(date)
  dateCopy.setDate(date.getDate() - 1)
  return dateCopy
}

function getDateArray (eventsList) {
  const dateArray = []

  if (eventsList === undefined) {
    return dateArray
  }
  const oldestDate = new Date(eventsList.data.reduce((prev, curr) => prev.startTime < curr.startTime ? prev : curr).startTime)
  const newestDate = new Date(eventsList.data.reduce((prev, curr) => prev.endTime > curr.endTime ? prev : curr).endTime)
  oldestDate.setHours(0, 0, 0, 0) // sanitize oldestDate and newestDate
  newestDate.setHours(0, 0, 0, 0)

  const mostRecentDate = Math.max((new Date()).getTime(), newestDate.getTime())
  const timeDif = mostRecentDate - oldestDate.getTime()
  const availableDays = Math.ceil(timeDif / (1000 * 3600 * 24)) + 7
  let dateTracker = oldestDate
  for (let i = 0; i < availableDays; i++) {
    dateArray.push(dateTracker)
    dateTracker = addOneDay(dateTracker)
  }
  return dateArray
}

function getMinuteDifference (dtString1, dtString2) {
  const timeDiffMS = Math.abs(new Date(dtString1) - new Date(dtString2))

  return Math.floor((timeDiffMS / 1000) / 60)
}

function getHourDifference (dtString1, dtString2) {
  return (getMinuteDifference(dtString1, dtString2) / 60)
}

// ! current format
// "2023-02-25T23:23:44.000Z"

// mysql datetime format
// "2023-02-25 22:22:22"

// datetime picker format
// "2023-02-25T22:22"

export default {
  getCurrentDate,
  getCurrentTime,
  getCurrentDateTime,
  formatDate,
  formatDateTime,
  dtlToMysql,
  addMinutes,
  addOneDay,
  subtractOneDay,
  getDateArray,
  getMinuteDifference,
  getHourDifference
}
