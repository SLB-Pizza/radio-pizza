/**
 * Accepts an array of client-side queried data an array of UID strings.
 * @category Utilities
 * @function getUIDsFromDataArray
 * @param {Object[]} dataArray - data array processed from a client-side query, {@like HomeFeatures}
 * @returns {String[]}
 */
export default function getUIDsFromDataArray(dataArray) {
  return dataArray.map(({ node }) => node._meta.uid)
}
