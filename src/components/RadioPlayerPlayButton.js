import React, { useContext } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider'
import { handlePlayPause } from '../dispatch'

/**
 * Renders an icon with `onClick` functionality that addresses both recorded and broadcasted information.
 * `icon={!playing ? "play" : "pause"}` is correct; we want to render a button that shows the OPPOSITE functionality of what the RadioPlayer is doing.
 * If it's playing; show the PAUSE button to allow the user to pause, and vice versa.
 * @function RadioPlayerPlayButton
 * @returns {jsx}
 */
export default function RadioPlayerPlayButton() {
  const globalState = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  const { isLoading, playing, infoDisplay, live } = globalState

  return (
    <div
      className={
        isLoading
          ? 'column is-narrow mix-data'
          : 'column is-narrow mix-data is-loaded'
      }
    >
      <Icon
        icon={!playing ? 'play' : 'pause'}
        className="icon-color"
        onClick={() => {
          handlePlayPause(dispatch, live, infoDisplay)
        }}
        size="2x"
      />
    </div>
  )
}
