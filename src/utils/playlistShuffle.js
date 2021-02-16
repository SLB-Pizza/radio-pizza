/**
 * Implementation of the Fisher-Yates In-Place Array shuffling algorithm.
 * Receives an array of collection mix objects from {@link makeCollectionDispatch}
 * @see {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle |Fisher-Yates Shuffle - Wikipedia}
 * @function playlistShuffle
 * @param {Object[]} collectionPlaylist
 * @returns {Object[]} the shuffled playlist
 */
function playlistShuffle(array) {
  let m = array.length,
    t,
    i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

export default playlistShuffle
