/**
 * Filters out all fetched data objects whose `node._meta.uid` exists within `uidsToRemove`.
 * @category Utilities
 * @function removeDuplicateFetchData
 * @param {Object[]} fetchedDataArr - array of data objects fetched by a `useLazyQuery`
 * @param {String[]} uidsToRemove - return of {@link getUIDsFromDataArray}
 * @returns {Object[]}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter .filter() returns an empty array if all entries are filtered out!}
 */
export default function removeDuplicateFetchData(fetchedDataArr, uidsToRemove) {
  return fetchedDataArr.filter(
    ({ node }) => uidsToRemove.indexOf(node._meta.uid) === -1
  )
}
