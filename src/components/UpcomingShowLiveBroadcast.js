import React from 'react'

/**
 * Renders the `.upcoming-show` div content when the upcoming show is a Live Broadcast powered by `live_show_title` and `live_show_guests`.
 * @category Layout Helper
 * @function UpcomingShowLiveBroadcast
 * @param {String} startTimeStr - DateTime string; preformatted in {@link UpcomingShow}
 * @param {String} showTitle - string from Prismic query
 * @param {String} showGuests - string from Prismic query
 * @param {Boolean} isLoading - `globalState` pop; originates from {@link UpcomingShow}
 * @returns {jsx}
 */
export default function UpcomingShowLiveBroadcast({
  startTimeStr,
  showTitle,
  showGuests,
  isLoading,
}) {
  let liveShowStr = ''
  if (showTitle) {
    liveShowStr += `${showTitle} `
    if (showGuests) {
      liveShowStr += ` | ${showGuests}`
    }
  } else if (showGuests) {
    liveShowStr += `${showGuests}`
  } else {
    liveShowStr = 'HMBK Live Show'
  }

  return (
    <div
      className={
        isLoading
          ? 'column upcoming-show is-hidden-mobile text-block'
          : 'column upcoming-show is-hidden-mobile text-block is-loaded'
      }
    >
      <p className="subtitle is-size-6-desktop is-size-7-touch">
        <b>{`${startTimeStr}`}</b>
        {` ${liveShowStr}`}
      </p>
    </div>
  )
}
