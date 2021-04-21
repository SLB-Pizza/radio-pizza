import React from 'react'

/**
 * Renders a column that tells the user when a scheduled show is currently scheduled as ON AIR.
 * @category Layout Helper
 * @function OnAirScheduleTag
 * @returns {jsx}
 */
export default function OnAirScheduleTag() {
  return (
    <div className="column is-1 now-playing">
      <p className="is-size-6-desktop is-size-7-touch has-text-centered">ON</p>
      <p className="is-size-6-desktop is-size-7-touch has-text-centered">AIR</p>
    </div>
  )
}
