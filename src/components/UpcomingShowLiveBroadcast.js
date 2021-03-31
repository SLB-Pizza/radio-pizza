import React from 'react'

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
          ? 'column next-show is-hidden-mobile text-block'
          : 'column next-show is-hidden-mobile text-block is-loaded'
      }
    >
      <p className="subtitle is-size-6-desktop is-size-7-touch">
        <b>{`${startTimeStr}`}</b>
        {` ${liveShowStr}`}
      </p>
    </div>
  )
}
