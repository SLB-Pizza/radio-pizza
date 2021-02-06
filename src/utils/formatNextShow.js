import { formatDateTime } from '../utils'

/**
 * Four scenarios:
 * - Next show is NOT today - get and show next show details
 * - Next show IS today; timeNow is before day's programming has begun; show first schedule entry
 * - Next show IS today; timeNow is between start and end of today's programming
 * - Next show IS today; timeNow is after end of today's programming
 * arr.filter based on isBetween start inclusivity, end exclusivity
 *
 * Determines what to display in {@link ScheduleBar} .up-next center column
 * @category Utilities
 * @function formatNextShow
 * @param {Object} nextShowData - the schedule data object
 */
function formatNextShow(nextShowData, currentTime) {
  let formattedNextShowDate = nextShowData.schedule_date
  let todayFormatted = formatDateTime(currentTime, 'prismic-date-query', 0)

  return formattedNextShowDate === todayFormatted
}

export default formatNextShow
