import React from 'react'
import { HMBKDivider, SingleMixCard } from '../components'

/**
 * Layout for mixes from {@link MixesIndexPage} page query and subsequent fetches by {@link loadMoreMixes}.
 * Renders when no tags are selected for a {@link fetchedMixes}
 * @category Layout Helper
 * @function AllMixesLayout
 * @param {Object[]} mixesDataToMap
 * @param {Function} loadMixesFunc - {@link loadNextMixes} function
 * @param {Boolean} mixLoadState - loading state of the Prismic allMixes page query triggered by {@link loadMoreMixes}
 * @param {String} mixCardLayout - string defining the column sizing for {@link SingleMixCard}
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
            mixData={node}
            columnLayout={mixCardLayout}
          />
        ))}
      </div>
      {mixesDataToMap?.hasMore ? (
        <div className="columns is-mobile is-vcentered">
          {!mixLoadState ? (
            <div className="column">
              <button
                className="button is-fullwidth is-outlined is-rounded"
                onClick={loadMixesFunc}
              >
                More Music!
              </button>
            </div>
          ) : (
            <HMBKDivider forLoading={true} />
          )}
          <div className="column is-narrow">
            <a href="#mixes-header">
              <button className="button is-fullwidth is-outlined is-rounded">
                Top
              </button>
            </a>
          </div>
        </div>
      ) : (
        <div className="columns is-mobile is-vcentered">
          <HMBKDivider />
          <div className="column is-narrow">
            <a href="#all-mixes">
              <button className="button is-fullwidth is-outlined is-rounded">
                Top
              </button>
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default AllMixesLayout
