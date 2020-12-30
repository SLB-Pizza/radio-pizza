/**
 * Process the collection_playlist array on each collection data node to display in {@link SingleCollection}
 * @function displayCollectionPlaylistDetails
 * @param {Object[]} playlistArray - the collection playlist containing all mix and relevant resident information
 * @returns {Object} an object filled with collection playlist data structured like so: `{ mixes: [], tags: [], residents:[] }`
 */
function displayCollectionPlaylistDetails(playlistArray) {
  let mixLinks = []
  let uidChecks = new Set()
  let mixResidents = new Set()
  let mixTags = new Set()

  playlistArray.map(({ endless_mix_entry }) => {
    const { _meta, mix_link, featured_residents } = endless_mix_entry

    // Add the mix_link to mixLinks
    mixLinks.push(mix_link)

    // Make each tag lowercase and add it to the tags set
    if (_meta.tags.length) {
      _meta.tags.map(tag => {
        mixTags.add(tag.toLowerCase())
      })
    }

    /**
     * Add the residents to the resident set
     * Grab mix_residents' uid
     * See if the uidChecks Set has it
     *  DOESN'T HAVE IT
     *    - add the current uid to uidChecks Set to reference for next check
     *    - add current mix_resident object to mixResidents Set
     *  DOES HAVE IT
     *    - means we've seen this uid -> already added this resident
     *    - do nothing; go to next mix_resident in featured_residents and test
     */
    for (const { mix_resident } of featured_residents) {
      if (!mix_resident) {
        continue
      } else {
        let nameToCheck = mix_resident._meta.uid
        if (!uidChecks.has(nameToCheck)) {
          uidChecks.add(nameToCheck)
          mixResidents.add(mix_resident)
        }
      }
    }
  })

  // Convert all sets to arrays and return in structured object
  return {
    mixes: mixLinks,
    tags: [...mixTags.values()],
    residents: [...mixResidents.values()],
  }
}

export default displayCollectionPlaylistDetails
