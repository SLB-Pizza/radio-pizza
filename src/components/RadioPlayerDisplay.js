import React, { useContext } from 'react'
import { GlobalStateContext } from '../context/GlobalContextProvider'
import {
  LiveBroadcastInfoWrapper,
  RecordedMixInfoDisplay,
  RecordedMixPlayerImage,
} from './index'

/**
 * Controls what is displayed by {@link RadioPlayer} based on `globalState`.
 * IF currently live
 *    render {@link LiveBroadcastInfoWrapper}
 * ELSE IF current URL exists
 *    render {@link RecordedMixInfoDisplay}
 * ELSE (not live AND no URL)
 *    render null
 * @category Layout Helper
 * @function RadioPlayerDisplay
 * @param {Object.<String,Number>} localPlayerState - the object that's modified and read to parse time values for {@link RecordedMixInfoDisplay}
 * @returns {jsx}
 */
export default function RadioPlayerDisplay({ localPlayerState }) {
  const {
    hours,
    minutes,
    seconds,
    hoursPlayed,
    minutesPlayed,
    secondsPlayed,
  } = localPlayerState

  const globalState = useContext(GlobalStateContext)
  const { live, liveMarquee, title, resident, url } = globalState

  if (live) {
    return (
      <LiveBroadcastInfoWrapper
        liveTitle={liveMarquee.liveShowTitle}
        liveGuests={liveMarquee.liveShowGuests}
      />
    )
  } else if (url) {
    return (
      <RecordedMixInfoDisplay
        title={title}
        residents={resident}
        hoursPlayed={hoursPlayed}
        minutesPlayed={minutesPlayed}
        secondsPlayed={secondsPlayed}
        totalHours={hours}
        totalMinutes={minutes}
        totalSeconds={seconds}
      />
    )
  } else {
    return null
  }
}
