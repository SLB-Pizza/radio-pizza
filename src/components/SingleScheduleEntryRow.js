import React from 'react'
import { getResidentLinks } from '../utils'

/**
 * Renders a single schedule row, containing the start and end times, as well as the name of the radio show.
 * @category Site Elements
 * @function SingleScheduleEntryRow
 * @param {Object.<String, String|Object>} entry - the data object for a single scheduled radio show
 * @returns {jsx}
 */
function SingleScheduleEntryRow({ entry }) {
  const { start_time, end_time, scheduled_show } = entry
  const { mix_title, featured_residents } = scheduled_show

  const ShowTimes = () => {
    const formattedStart = formatDateTime(start_time, 'hour-minute')
    const formattedEnd = formatDateTime(end_time, 'hour-minute')

    if (start_time && end_time) {
      // Render both the formatted start and end times.
      return (
        <div className="column is-4">
          <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
            {formattedStart} – {formattedEnd}
          </p>
        </div>
      )
    } else if (start_time && !end_time) {
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

  const RenderRadioShowName = () => {
    return mix_title !== null ? (
      <div className="column is-8">
        <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
          {mix_title}
        </p>
        <p className="subtitle is-size-7 has-text-centered">
          {getResidentLinks(featured_residents)}
        </p>
      </div>
    ) : (
      <div className="column is-8">
        <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
          {getResidentLinks(featured_residents)}
        </p>
      </div>
    )
  }

  return (
    <div className="columns is-mobile is-vcentered single-show-entry">
      <ShowTimes />
      <RenderRadioShowName />
    </div>
  )
}

export default SingleScheduleEntryRow
