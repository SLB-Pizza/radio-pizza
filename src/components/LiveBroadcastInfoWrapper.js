import React from 'react'
import { LiveBroadcastInfoDisplay } from './index'
import { LiveMarkerAndText } from './helpers'

/**
 * Renders {@link LiveBroadcastInfoDisplay} with the correct wrapper id for {@link RadioPlayer}.
 * @category Layout Helper
 * @function LiveBroadcastInfoWrapper
 * @param {String} liveTitle - string set by the LiveMarqueeInput on `/hmbk-admin`
 * @param {String} liveGuests - string set by the LiveMarqueeInput on `/hmbk-admin`
 * @returns {jsx}
 */
export default function LiveBroadcastInfoWrapper({ liveTitle, liveGuests }) {
  return liveTitle ? (
    <div id="now-playing-details">
      <LiveMarkerAndText />
      <LiveBroadcastInfoDisplay liveTitle={liveTitle} liveGuests={liveGuests} />
    </div>
  ) : (
    <div id="now-playing-details">
      <LiveMarkerAndText />
      <LiveBroadcastInfoDisplay liveTitle={liveTitle} liveGuests={liveGuests} />
    </div>
  )
}
