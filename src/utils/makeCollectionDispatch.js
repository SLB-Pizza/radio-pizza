import { getResidentString } from '../utils'

function makeCollectionDispatch(collectionDataObject) {
  const {
    collection_img,
    collection_title,
    shuffle_mix_order,
    collection_playlist,
  } = collectionDataObject

  let playlistForDispatch = []

  collection_playlist.map(({ endless_mix_entry }) => {
    const entryResidentString = getResidentString(
      endless_mix_entry.featured_residents
    )

    const processedMixEntry = {
      url: endless_mix_entry.mix_link,
      resident: entryResidentString,
    }

    playlistForDispatch.push(processedMixEntry)
  })

  return {
    isLoading: false,
    playing: true,
    collection_title: collection_title,
    collection_img: collection_img.now_playing.url,
    playlist: playlistForDispatch,
  }
}
export default makeCollectionDispatch
