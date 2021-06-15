import React from 'react'
import { LiveBroadcastInfoDisplay } from './index'

/**
 * Renders {@link LiveBroadcastInfoDisplay} with the correct wrapper id for {@link RadioPlayer}.
 * @category Layout Helper
 * @function LiveBroadcastInfoWrapper
 * @param {String} liveTitle - string set by the LiveMarqueeInput on `/hmbk-admin`
 * @param {String} liveGuests - string set by the LiveMarqueeInput on `/hmbk-admin`
 * @returns {jsx}
 */
export default function LiveBroadcastInfoWrapper({ liveTitle, liveGuests }) {
  return (
    <div id="now-playing-details">
      <LiveBroadcastInfoDisplay liveTitle={liveTitle} liveGuests={liveGuests} />
    </div>
  )
}
