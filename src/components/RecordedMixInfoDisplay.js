import React from 'react'
import { InfoDisplayTimerElement } from './index'
/**
 * Renders the recorded mix's titling, current progress and total duration.
 * @category Layout Helper
 * @function RecordedMixInfoDisplay
 * @param {String} title - `globalState.title`
 * @param {String} residents - `globalState.resident`
 * @param {Number} hoursPlayed - `localState.hoursPlayed` from {@link RadioPlayer}
 * @param {Number} minutesPlayed - `localState.minutesPlayed` from {@link RadioPlayer}
 * @param {Number} secondsPlayed - `localState.secondsPlayed` from {@link RadioPlayer}
 * @param {Number} totalHours - `localState.hours` from {@link RadioPlayer}
 * @param {Number} totalMinutes - `localState.minutes` from {@link RadioPlayer}
 * @param {Number} totalSeconds - `localState.seconds` from {@link RadioPlayer}
 * @returns {jsx}
 */
export default function RecordedMixInfoDisplay({
  title,
  residents,
  hoursPlayed,
  minutesPlayed,
  secondsPlayed,
  totalHours,
  totalMinutes,
  totalSeconds,
}) {
  return title === null ? (
    <div id="now-playing-details">
      <p className="title duration-margin is-size-6-tablet is-size-7-mobile">
        {residents}
      </p>
      <p className="is-size-7">
        {totalHours > 0 ? (
          <InfoDisplayTimerElement timePortion={hoursPlayed} />
        ) : null}
        <InfoDisplayTimerElement timePortion={minutesPlayed} />
        <InfoDisplayTimerElement timePortion={secondsPlayed} isSeconds={true} />
        {' / '}
        {totalHours > 0 ? (
          <InfoDisplayTimerElement timePortion={totalHours} />
        ) : null}
        <InfoDisplayTimerElement timePortion={totalMinutes} />
        <InfoDisplayTimerElement timePortion={totalSeconds} isSeconds={true} />
      </p>
    </div>
  ) : (
    <div id="now-playing-details">
      <p className="title is-size-6-tablet is-size-7-mobile">{title}</p>
      <p className="subtitle duration-margin is-size-7">{residents}</p>
      <p className="is-size-7">
        {totalHours > 0 ? (
          <InfoDisplayTimerElement timePortion={hoursPlayed} />
        ) : null}
        <InfoDisplayTimerElement timePortion={minutesPlayed} />
        <InfoDisplayTimerElement timePortion={secondsPlayed} isSeconds={true} />
        {' / '}
        {totalHours > 0 ? (
          <InfoDisplayTimerElement timePortion={totalHours} />
        ) : null}
        <InfoDisplayTimerElement timePortion={totalMinutes} />
        <InfoDisplayTimerElement timePortion={totalSeconds} isSeconds={true} />
      </p>
    </div>
  )
}
