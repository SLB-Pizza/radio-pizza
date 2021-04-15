/**
 * Dispatches CHANGE_URL to switch from whatever is in {@link RadioPlayer} to the selected mix.
 * @category Dispatch Function
 * @function playCollection
 * @param {Function} dispatch
 * @param {String} mixURL - URL of the mix source to play
 * @param {String} mixTitle - processed mix titling
 * @param {String} mixResidents - if mix has residents, is result of {@link getResidentString}
 * @param {String} mixImgURL - img to display for the mix
 */
export const changeURL = async (
  dispatch,
  mixURL,
  mixTitle,
  mixResidents,
  mixImgURL
) => {
  await dispatch({ type: 'SHOW_LOADING' })
  await dispatch({
    type: 'CHANGE_URL',
    payload: {
      url: mixURL,
      title: mixTitle,
      resident: mixResidents,
      img: mixImgURL,
    },
  })
  return
}

/**
 * Dispatch corresponds to "PLAYLIST_PLAY_FIRST".
 * @category Dispatch Function
 * @function playCollection
 * @see {@link makeCollectionDispatch}
 * @param {Function} dispatch
 * @param {Object} collectionDetails
 */
export const playCollection = async (dispatch, collectionDetails) => {
  await dispatch({ type: 'SHOW_LOADING' })
  await dispatch({ type: 'PLAYLIST_START', payload: collectionDetails })
}
