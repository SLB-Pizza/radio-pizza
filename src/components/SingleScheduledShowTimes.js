import React from 'react'
import { formatDateTime } from '../utils'

/**
 * Render the start and end times for a scheduled show. Called by
 * @category Layout Helper
 * @function SingleScheduledShowTimes
 * @param {String} start - Prismic formatted DateTime string for this particular scheduled show's starts
 * @param {String} end - Prismic formatted DateTime string for this particular scheduled show's ends
 * @returns {jsx}
 */
export default function SingleScheduledShowTimes({ start, end, isNowPlaying }) {
  const formattedStart = formatDateTime(start, 'hour-minute')
  const formattedEnd = formatDateTime(end, 'hour-minute')

  const timesColumnStyle = isNowPlaying
    ? 'column is-3'
    : 'column is-offset-1 is-3'

  if (start && end) {
    // Render both the formatted start and end times.
    return (
      <div className={timesColumnStyle}>
        <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
          {formattedStart} – {formattedEnd}
        </p>
      </div>
    )
  } else {
    // Render a fallback indicating that neither a start time nor an end time have been set.
    return (
      <div className={timesColumnStyle}>
        <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
          TBD
        </p>
      </div>
    )
  }
}
