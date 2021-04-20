import React from 'react'
/**
 * Renders the `liveShowTitle` and `liveShowGuests` strings when `globalState.live && globalState.playingRadio`
 * Called by: {@link RadioPlayer}
 * @category Layout Helper
 * @function LiveBroadcastInfoWrapper
 * @param {String} liveTitle - string set by the LiveMarqueeInput on `/hmbk-admin`
 * @param {String} liveGuests - string set by the LiveMarqueeInput on `/hmbk-admin`
 * @returns {jsx}
 */
export default function LiveBroadcastInfoDisplay({ liveTitle, liveGuests }) {
  return liveTitle ? (
    <>
      <p className="title is-size-6-tablet is-size-7-mobile">{liveTitle}</p>

      {liveGuests && (
        <p className="subtitle is-size-6-tablet is-size-7-mobile">
          {liveGuests}
        </p>
      )}
    </>
  ) : (
    <>
      {liveGuests && (
        <p className="title is-size-6-tablet is-size-7-mobile">{liveGuests}</p>
      )}
    </>
  )
}
