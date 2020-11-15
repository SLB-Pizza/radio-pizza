import { getResidentString, playlistShuffle } from '../utils'

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

  // Build the dispatch object
  let dispatchObject = {
    isLoading: false,
    playing: true,
    collection_title: collection_title,
    collection_img: collection_img.now_playing.url,
    playlist: dispatchPlaylist,
  }

  return dispatchObject
}
export default makeCollectionDispatch
