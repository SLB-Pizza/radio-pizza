import React from 'react'
import { getResidentLinks } from '../utils'

/**
 * Renders a single schedule row, containing the start and end times, as well as the name of the radio show.
 * @category Site Elements
 * @function SingleScheduleEntryRow
 * @param {Object.<String, String|Object>} entry - the data object for a single scheduled radio show
 * @returns {jsx}
 */
function SingleScheduleEntryRow({ start, end, show }) {
  const ShowTimes = () => {
    if (start && end) {
      // Render both the formatted start and end times.
      return (
        <div className="column is-4">
          <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
            {start} – {end}
          </p>
        </div>
      )
    } else if (start && !end) {
      // Only render the formatted start time.
      return (
        <div className="column is-4">
          <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
            {start}
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
    if (show !== null) {
      return show.mix_title !== null ? (
        <div className="column is-8">
          <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
            {show.mix_title}
          </p>
          <p className="subtitle is-size-7 has-text-centered">
            {getResidentLinks(show.featured_residents)}
          </p>
        </div>
      ) : (
        <div className="column is-8">
          <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
            {getResidentLinks(show.featured_residents)}
          </p>
        </div>
      )
    }
    return (
      <div className="column is-8">
        <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
          show name here
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
