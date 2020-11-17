import { getResidentString, playlistShuffle } from '../utils'

/**
 * @category Utilities
 * @function makeCollectionDispatch
 * @param {Object} collectionDataObject - an object containing the data used to build {@link SingleCollection} entry
 * @returns {Object} a dispatch object to pass to {@link MixPlayOverlay}
 */
function makeCollectionDispatch(collectionDataObject) {
  const {
    collection_img,
    collection_title,
    shuffle_mix_order,
    collection_playlist,
  } = collectionDataObject

  let playlistEntries = []

  for (let i = 0; i < collection_playlist.length; i++) {
    const currentEntry = collection_playlist[i]

    /**
     * Build a string from the residents on the mix using {@link getResidentString}
     */
    const entryResidentString = getResidentString(
      currentEntry.endless_mix_entry.featured_residents
    )

    // Each Playlist Mix Entry contains a mix link and a resident string to display
    const processedMixEntry = {
      url: currentEntry.endless_mix_entry.mix_link,
      resident: entryResidentString,
    }
    playlistEntries.push(processedMixEntry)
  }

  /**
   * If the mix is to be shuffled on play, (determined by Boolean shuffle_mix_order), pass the playlistEntries array to {@link playlistShuffle}
   * Else, use playlistEntries array as created
   */
  const dispatchPlaylist = shuffle_mix_order
    ? playlistShuffle(playlistEntries)
    : playlistEntries

  // Grab the first mix entry to set starting mix URL and resident data in dispatch object
  const firstMixEntry = dispatchPlaylist[0]

  // Build the dispatch object
  const dispatchObject = {
    isLoading: false,
    playing: true,
    title: collection_title,
    img: collection_img.now_playing.url,
    url: firstMixEntry.url,
    resident: firstMixEntry.resident,
    playlist: dispatchPlaylist,
  }

  return dispatchObject
}
export default makeCollectionDispatch
