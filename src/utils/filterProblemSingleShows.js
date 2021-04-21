/**
 * Processes a single date's `schedule_entries` array within {@link sortAndSetScheduleData} `useEffect` on {@link FullSchedule} admin page.
 * @category Utilities
 * @function filterProblemSingleShows
 * @param {Object} problemDateObj
 * @prop {String} problemDateObj.date - current date formatted for schedule headings
 * @prop {Array} problemDateObj.entries - a blank array to fill with bad schedule entries
 * @param {Object[]} singleDateScheduledEntries - `schedule_entries` array within {@link sortAndSetScheduleData} `useEffect`
 * @returns {Object}
 */
export default function filterProblemSingleShows(
  problemDateObj,
  singleDateScheduledEntries
) {
  for (let j = 0; j < singleDateScheduledEntries.length; j++) {
    const singleShow = singleDateScheduledEntries[j]

    const {
      start_time,
      end_time,
      scheduled_show,
      live_show_title,
      live_show_guests,
    } = singleShow

    const hasTimes = start_time && end_time
    const hasShowDetails = scheduled_show || live_show_title || live_show_guests

    if (!hasTimes) {
      problemDateObj.entries.push(singleShow)
    } else if (!hasShowDetails) {
      problemDateObj.entries.push(singleShow)
    }
  }
  return problemDateObj
}
