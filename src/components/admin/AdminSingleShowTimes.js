import React from 'react'
import { formatDateTime } from '../../utils'

/**
 * Render the start and end times for a scheduled show. Based on {@link SingleScheduledShowTimes}.
 * @category Layout Helper
 * @function AdminSingleShowTimes
 * @param {String} start - Prismic formatted DateTime string for this particular scheduled show's starts
 * @param {String} end - Prismic formatted DateTime string for this particular scheduled show's ends
 * @returns {jsx}
 */
export default function AdminSingleShowTimes({ start, end, isNowPlaying }) {
  const formattedStart = start
    ? formatDateTime(start, 'hour-minute')
    : 'START TIME MISSING'

  const formattedEnd = end
    ? formatDateTime(end, 'hour-minute')
    : 'END TIME MISSING'

  const timesColumnStyle = isNowPlaying
    ? 'column is-3'
    : 'column is-offset-1 is-3'

  return (
    <div className={timesColumnStyle}>
      <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
        {formattedStart} – {formattedEnd}
      </p>
    </div>
  )
}
