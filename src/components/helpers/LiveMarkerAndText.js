import React from 'react'

/**
 * Renders a pulsing circle and "LIVE" text to inform the user that the currently loaded source in the {@link RadioPlayerDisplay} is the HMBK live radio.co broadcast.
 * Called by {@link LiveBroadcastInfoDisplay}.
 * @category Layout Helper
 * @function LiveMarkerAndText
 * @returns {jsx}
 */
export default function LiveMarkerAndText() {
  return (
    <div className="broadcast-signal">
      <div className="light" />
      <p>ON AIR</p>
    </div>
  )
}
