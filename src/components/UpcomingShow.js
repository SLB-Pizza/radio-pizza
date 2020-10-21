import React from 'react'
import { getResidentLinks, formatDateTime } from '../utils'

/**
 * @function UpcomingShow
 * @param {?Object[]} { showData }
 * @returns {jsx}
 */
function UpcomingShow({ showData }) {
  const { schedule_date, schedule_entries } = showData

  /**
   * No schedule_entries or schedule_date data available to process.
   */
  if (schedule_entries === undefined) {
    return (
      <div className="column next-show is-loaded is-hidden-mobile">
        <p className="subtitle is-size-6-desktop is-size-7-touch">
          Taking a short break! No upcoming shows planned.
        </p>
      </div>
    )
  }

  const { start_time, scheduled_show } = schedule_entries[0]
  const { mix_title, featured_residents } = scheduled_show

  const showDate = formatDateTime(schedule_date, 'full-month-day')
  const showStart = formatDateTime(start_time, 'hour-minute')
  const showName = mix_title

  if (!!showName) {
    return (
      <div className="column next-show is-loaded is-hidden-mobile">
        <p className="subtitle is-size-6-desktop is-size-7-touch">
          {`${showDate} @ ${showStart}: ${showName} - ${getResidentLinks(
            featured_residents
          )}`}
        </p>
      </div>
    )
  } else {
    return (
      <div className="column next-show is-loaded is-hidden-mobile">
        <p className="subtitle is-size-6-desktop is-size-7-touch">
          {`${showDate} at ${showStart}: ${getResidentLinks(
            featured_residents
          )}`}
        </p>
      </div>
    )
  }
}

export default UpcomingShow
