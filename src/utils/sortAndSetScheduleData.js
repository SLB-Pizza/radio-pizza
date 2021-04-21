import { formatDateTime, sortShowEntriesByStartTime } from './index'

/**
 *
 * @category Utilities
 * @function sortAndSetSchduleData
 * @param {Object[]} previouslyFetchedShowsArr
 * @param {Object[]} fetchedScheduleArr
 * @param {Function} setScheduleDataFunc
 * @param {Function} setProblemShowsFunc
 */
export default function sortAndSetScheduleData(
  previouslyFetchedShowsArr,
  fetchedScheduleArr,
  setScheduleDataFunc,
  setProblemShowsFunc
) {
  for (let i = 0; i < fetchedScheduleArr.length; i++) {
    let preppedScheduleData = []

    const { schedule_date, schedule_entries } = fetchedScheduleArr[i].node

    let currDateObject = {}
    currDateObject.date = formatDateTime(schedule_date, 'schedule-date-heading')
    currDateObject.entries = sortShowEntriesByStartTime(schedule_entries)
    preppedScheduleData.push(currDateObject)
  }
  if (preppedScheduleData.length === 0) {
    return
  } else if (previouslyFetchedShowsArr === null) {
    setScheduleDataFunc(preppedScheduleData)
  } else {
    setScheduleDataFunc(...previouslyFetchedShowsArr, ...preppedScheduleData)
  }
}
