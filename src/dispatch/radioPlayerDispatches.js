/**
 * IF a recorded mix is playing
 *    toggle player state
 *    do not trigger the `playingRadio` change
 * ELSE IF HMBK is broadcast
 *    set `playingRadio` to true, so that the toggle reflects the LiveRadioPlayButton and the radio broadcast state
 * @category Dispatch Function
 * @function handlePlayPause
 * @param {Function} dispatch
 * @param {Boolean} liveStatus
 */
export const handlePlayPause = async (dispatch, liveStatus, infoDisplay) => {
  if (infoDisplay === 'recorded') {
    await dispatch({ type: 'TOGGLE_PLAYING' })
  } else if (liveStatus) {
    await dispatch({ type: 'TOGGLE_PLAYING', payload: { playingRadio: true } })
  }
}
/**
 * @category Dispatch Function
 * @function handleMixReady
 * @param {Function} dispatch
 */
export const handleMixReady = async dispatch => {
  await dispatch({ type: 'MIX_LOADED' })
}

/**
 * @category Dispatch Function
 * @function handleEnded
 * @param {Function} dispatch
 * @param {Number} playlistLength - current length of `globalState.playlist.length`
 * @param {Number} playlistCurrIdx - value of `globalState.list_curr_index`
 */
export const handleEnded = async (
  dispatch,
  playlistLength,
  playlistCurrIdx
) => {
  /**
   * Check to see if we are playing a single track or a playlist
   */
  if (playlistLength) {
    /**
     * If `list_curr_index` from global state is less the current playlist's number of tracks, then dispatch func which increments it by one and plays next
     */
    if (playlistLength - 1 > playlistCurrIdx) {
      await dispatch({ type: 'PLAYLIST_PLAY_NEXT' })
    } else {
      await dispatch({ type: 'PLAYLIST_LOOP' })
    }
  }
  return
}
