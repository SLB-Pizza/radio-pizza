import React from 'react'

/**
 * Renders a white div with pulsing white-pink circle acting as the "LIVE" light with "ON AIR" text to inform the user that the currently loaded source in the {@link RadioPlayerDisplay} is the HMBK live radio.co broadcast.
 * Called by {@link LiveBroadcastInfoDisplay}.
 * @category Layout Helper
 * @function LiveMarkerAndText
 * @returns {jsx}
 */
export default function LiveMarkerAndText() {
  return (
    <div className="broadcast-signal">
      <div className="light" />
      <p className="is-size-6-tablet is-size-7-mobile">ON AIR</p>
    </div>
  )
}
