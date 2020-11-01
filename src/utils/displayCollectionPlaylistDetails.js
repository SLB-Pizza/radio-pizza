/**
 * Process the collection_playlist array on each collection data node to display in {@link SingleCollection}
 * @function displayCollectionPlaylistDetails
 * @param {Object[]} playlistArray - the collection playlist containing all mix and relevant resident information
 * @returns {Object} an object filled with collection playlist data structured like so: `{mixes: [], tags: [], residents:[]}`
 */
function displayCollectionPlaylistDetails(playlistArray) {
  let mixLinks = []
  let uidChecks = new Set()
  let mixResidents = new Set()
  let mixTags = new Set()

  playlistArray.map(({ endless_mix_entry }) => {
    const { _meta, mix_link, featured_residents } = endless_mix_entry

    // Add the mix_link to this
    mixLinks.push(mix_link)

    // Add the tags to the tags set
    _meta.tags.map(tag => {
      mixTags.add(tag.toLowerCase())
    })

    // Add the residents to the resident set
    featured_residents.map(({ mix_resident }) => {
      let nameToCheck = mix_resident._meta.uid
      if (!uidChecks.has(nameToCheck)) {
        uidChecks.add(nameToCheck)
        mixResidents.add(mix_resident)
      } else {
        uidChecks.add(nameToCheck)
      }
    })
  })

  return {
    mixes: mixLinks,
    tags: [...mixTags.values()],
    residents: [...mixResidents.values()],
  }
}

export default displayCollectionPlaylistDetails
