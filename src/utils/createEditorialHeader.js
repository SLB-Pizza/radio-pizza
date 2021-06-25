export default function createEditorialHeader(
  featuredEditorials,
  initialFetchEditorials,
  setFunctions
) {
  const {
    second_highlight_editorial,
    first_highlight_editorial,
  } = featuredEditorials

  const {
    setEditorialsUIDsToFilter,
    setFeaturesToMap,
    setFeaturesHighlights,
  } = setFunctions

  /**
   * Create an array to collect editorialHeaderData node to pass into {@link getUIDsFromDataArray}
   */
  const editorialsToFilter = []
  if (second_highlight_editorial) {
    editorialsToFilter.push({ node: second_highlight_editorial })
  }
  if (first_highlight_editorial) {
    editorialsToFilter.push({ node: first_highlight_editorial })
  }

  /**
   * IF editorialsToFilter already has elements
   *    grab UIDs from elements
   */
}
