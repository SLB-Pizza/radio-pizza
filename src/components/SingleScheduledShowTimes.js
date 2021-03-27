import React from 'react'
import { formatDateTime } from '../utils'

/**
 *
 * @category Layout Helper
 * @function SingleScheduledShowTimes
 * @param {String} start - Prismic formatted DateTime string for this particular scheduled show's starts
 * @param {String} end - Prismic formatted DateTime string for this particular scheduled show's ends
 * @returns {jsx}
 */
export default function SingleScheduledShowTimes({ start, end }) {
  const formattedStart = formatDateTime(start, 'hour-minute')
  const formattedEnd = formatDateTime(end, 'hour-minute')

  if (start && end) {
    // Render both the formatted start and end times.
    return (
      <div className="column is-4">
        <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
          {formattedStart} – {formattedEnd}
        </p>
      </div>
    )
  } else if (start && !end) {
    // Only render the formatted start time.
    return (
      <div className="column is-4">
        <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
          {formattedStart}
        </p>
      </div>
    )
  } else {
    // Render a fallback indicating that neither a start time nor an end time have been set.
    return (
      <div className="column is-4">
        <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
          --:-- – --:--
        </p>
      </div>
    )
  }
}
