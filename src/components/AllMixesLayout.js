import React from 'react'
import { LandingPageFetchAndLoading, SingleMixCard } from '../components'

/**
 * Layout for mixes from {@link RadioIndexPage} page query and subsequent fetches by {@link loadMoreMixes}. Renders when no tags are selected for a {@link fetchedMixes}.
 *
 * This component passes `onMixesPage = true` prop to {@link SingleMixCard} for use in {@link TagButtons}.
 * @category Layout Helper
 * @function AllMixesLayout
 * @param {Object[]} mixesDataToMap - mixes array received from {@link RadioIndexPage}; sourced from its page query and subsequent fetches
 * @param {Function} loadMixesFunc - {@link loadNextMixes} function from {@link RadioIndexPage}
 * @param {Boolean} mixLoadState - loading state of the Prismic allMixes page query triggered by {@link loadMoreMixes}
 * @param {String} mixCardLayout - string defining the column sizing for {@link SingleMixCard}
 *
 * @returns {jsx}
 */
function AllMixesLayout({
  loadMixesFunc,
  mixesDataToMap,
  mixLoadState,
  mixCardLayout,
}) {
  return (
    <>
      <div className="columns is-mobile is-multiline">
        {mixesDataToMap?.data.map(({ node }, index) => (
          <SingleMixCard
            key={`mixes-page-#${index}`}
            data={node}
            columnLayout={mixCardLayout}
            onMixesPage={true}
          />
        ))}
      </div>

      <LandingPageFetchAndLoading
        hasMore={mixesDataToMap.hasMore}
        currentlyFetching={mixLoadState}
        fetchMoreFunc={loadMixesFunc}
        fetchMoreBtnTxt={'More Radio'}
      />
    </>
  )
}

export default AllMixesLayout
