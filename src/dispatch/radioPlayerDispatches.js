/**
 * @category Dispatch Function
 * @function handlePlayPause
 * @param {Function} dispatch
 */
export const handlePlayPause = async dispatch => {
  await dispatch({ type: 'TOGGLE_PLAYING' })
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
