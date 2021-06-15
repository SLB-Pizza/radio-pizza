import React, { useContext } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider'
import { closeSchedule, handlePlayLive } from '../dispatch'

/**
 * Renders a button in {@link ScheduleBarLayout} that `onClick` tells the {@link RadioPlayer} to play the radio.co live broadcast
 * @function LiveRadioPlayButton
 * @returns {jsx}
 */
export default function LiveRadioPlayButton() {
  const globalState = useContext(GlobalStateContext)
  const { live, playing, playingRadio, scheduleOpen } = globalState

  const dispatch = useContext(GlobalDispatchContext)

  return (
    <div className="column is-narrow">
      {live ? (
        <button
          className="button is-small is-outlined is-rounded live-radio-btn"
          onClick={() => {
            if (!playingRadio) {
              handlePlayLive(dispatch)
            }
            if (scheduleOpen) {
              closeSchedule(dispatch)
            }
          }}
        >
          {playing && playingRadio ? (
            <>
              <span className="icon">
                <Icon icon="headphones" size="lg" className="live-light" />
              </span>
              <span className="live-radio-btn__text">Live</span>
            </>
          ) : (
            <>
              <span className="icon">
                <Icon icon="broadcast-tower" size="lg" className="live-light" />
              </span>
              <span className="live-radio-btn__text">Listen Live</span>
            </>
          )}
        </button>
      ) : (
        <p className="title is-size-6-tablet is-size-7-mobile">Not Live</p>
      )}
    </div>
  )
}
