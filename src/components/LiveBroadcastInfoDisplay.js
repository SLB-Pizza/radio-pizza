import React from 'react'

/**
 * Renders the `liveShowTitle` and `liveShowGuests` strings when `globalState.live && globalState.playingRadio` in {@link RadioPlayer}
 * @category Layout Helper
 * @function LiveBroadcastInfoDisplay
 * @param {String} liveTitle
 * @param {String} liveGuests
 * @returns {jsx}
 */
export default function LiveBroadcastInfoDisplay({ liveTitle, liveGuests }) {
  return liveTitle ? (
    <div id="now-playing-details">
      <p className="title is-size-6-tablet is-size-7-mobile">{liveTitle}</p>

      {liveGuests && (
        <p className="subtitle is-size-6-tablet is-size-7-mobile">
          {liveGuests}
        </p>
      )}
    </div>
  ) : (
    <div id="now-playing-details">
      {liveGuests && (
        <p className="subtitle is-size-6-tablet is-size-7-mobile">
          {liveGuests}
        </p>
      )}
    </div>
  )
}
