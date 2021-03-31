import { formatDateTime, isCurrentShowLive } from './index'

/**
 * Accepts the current dayJS time object and the start and end times of a scheduled show. Converts the start and end times and then checks to see if the current time is between the start (inclusive) and the end (exclusive).
 * Called by: {@link UpcomingShow}
 * @category Utilities
 * @function getUpcomingShowDetails
 * @param {Object} currentTime - dayJS Object denoting the current time
 * @param {Object[]} singleDateEntriesArr - array made of one day's `scheduled_entries `data objects
 * @returns {Boolean}
 * @see {@link https://day.js.org/docs/en/plugin/is-between IsBetween adds .isBetween() API to returns a boolean indicating if a date is between two other dates}
 */
export default function getUpcomingShowDetails(
  currentTime,
  scheduleDate,
  singleDateEntriesArr
) {
  let nextShowDetails = {
    date: null,
    isToday: false,
    nextShow: null,
    start: null,
  }

  const entriesWithTimes = singleDateEntriesArr.filter(
    entry => entry.start_time && entry.end_time
  )

  if (entriesWithTimes.length) {
    for (let i = 0; i < singleDateEntriesArr.length; i++) {
      const singleEntry = singleDateEntriesArr[i]

      const isNextShowToday = formatDateTime(
        currentTime,
        'is-schedule-date-today',
        null,
        scheduleDate
      )

      if (isNextShowToday) {
        nextShowDetails.isToday = true
      }

      /**
       * Convert start to dayJS objects for comparison
       */
      const startDayJS = formatDateTime(
        singleEntry.start_time,
        'Prismic-to-dayjs'
      )

      const isSameOrBeforeShow = formatDateTime(
        currentTime,
        'is-same-or-before',
        null,
        startDayJS
      )

      // console.group("Single Show");
      // console.log("today?", isNextShowToday);
      // console.log("start_time", singleEntry.start_time);
      // console.log("isSameOrBeforeShow", isSameOrBeforeShow);
      // console.groupEnd();

      if (isSameOrBeforeShow) {
        if (!nextShowDetails.isToday) {
          nextShowDetails.date = formatDateTime(startDayJS, 'full-month-day')
        }
        nextShowDetails.start = formatDateTime(startDayJS, 'hour-minute')
        nextShowDetails.nextShow = singleEntry
        return nextShowDetails
      }
    }
  }

  return null
}
