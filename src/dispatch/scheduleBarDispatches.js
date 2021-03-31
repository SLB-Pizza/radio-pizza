export const closeSchedule = async dispatch => {
  await dispatch({ type: 'CLOSE_SCHEDULE' })
}

export const toggleSchedule = async dispatch => {
  await dispatch({ type: 'TOGGLE_SCHEDULE' })
}

export const handlePlayLive = async dispatch => {
  await dispatch({ type: 'PLAY_LIVE_RADIO' })
}

// TEST ONLY -- just for live toggle
export const handleLiveTest = async dispatch => {
  await dispatch({ type: 'TOGGLE_LIVE_TEST' })
}
