/**
 * Receives the data response from {@link getDefaultMix} to process and format for use with the dispatch function
 * @category Utilities
 * @function processDefaultMixData
 * @param {Object} defaultMixData
 * @param {Function} dispatch
 */
export default async function processDefaultMixData(defaultMixData, dispatch) {
  const mixDataObject = defaultMixData.allTopnavs.edges[0].node.default_mix

  if (mixDataObject) {
    const { featured_residents, mix_image, mix_link, mix_title } = mixDataObject

    /**
     * Another case where `objectKeyCount` needs to be assigned `2` for {@link mappableDataFilter}; `__typename` counts!.
     */
    const filteredResidents = mappableDataFilter(featured_residents, 2)
    const mixResidentsString = getResidentString(filteredResidents)

    await dispatch({
      type: 'SET_INITIAL_MIX',
      payload: {
        infoDisplay: 'recorded',
        url: mix_link,
        title: mix_title,
        resident: mixResidentsString,
        img: mix_image.now_playing.url,
      },
    })
    await dispatch({
      type: 'MIX_LOADED',
    })
  } else {
    /**
     * Handle case where no initial mix is selected in the CMS.
     * Already checked for initial live status so this is the final condition,
     * no live "broadcast" and no "recorded" mix data set in CMS to use as `infoDisplay`.
     * Load layout as if mix data exists.
     */
    await dispatch({
      type: 'MIX_LOADED',
    })
  }
}
