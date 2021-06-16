import { formatDateTime } from './index'

/**
 * Accepts the current dayJS time object and the start and end times of a scheduled show. Parses the Prismic formatted start and end times and then checks to see if the current time is between the start (inclusive) and the end (exclusive).
 * Called by: {@link SingleDateScheduleEntries}
 * @category Utilities
 * @function isCurrentShowLive
 * @param {Object} currentTime - dayJS Object denoting the current time
 * @param {String} startTime - Prismic DateTime string; to be formatted for use by {@link formatDateTime}
 * @param {String} endTime - Prismic DateTime string; to be formatted for use by {@link formatDateTime}
 * @returns {Boolean}
 * @see {@link https://day.js.org/docs/en/plugin/is-between IsBetween adds .isBetween() API to returns a boolean indicating if a date is between two other dates}
 */
export default function isCurrentShowLive(currentTime, startTime, endTime) {
  const startDayJS = formatDateTime(startTime, 'Prismic-to-dayjs')
  const endDayJS = formatDateTime(endTime, 'Prismic-to-dayjs')

  return formatDateTime(
    currentTime,
    'get-place-in-schedule',
    null,
    startDayJS,
    endDayJS
  )
}
