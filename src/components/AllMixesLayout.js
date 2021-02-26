import React from 'react'
import { SingleMixCard } from '../components'

/**
 * Renders the mixes from {@link MixesIndexPage} page query and subsequent fetches by {@link loadMoreMixes}
 * @category Layout Helper
 * @function AllMixesLayout
 * @param {Object[]} mixesDataToMap
 * @param {Function} loadMixesFunc - {@link loadNextMixes} function
 * @returns {jsx}
 */
export default function AllMixesLayout({
  loadMixesFunc,
  mixesDataToMap,
  mixLoadState,
}) {
  const mixListLayout =
    'column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen'
  return (
    <>
      <div className="columns is-mobile is-multiline">
        {/* All Mixs data in pulled correctly */}
        {mixesDataToMap?.data.map(({ node }, index) => (
          <SingleMixCard
            key={`mixes-page-#${index}`}
            mixData={node}
            columnLayout={mixListLayout}
          />
        ))}
      </div>
      {mixesDataToMap?.hasMore ? (
        <div className="columns is-mobile">
          <div className="column">
            {!mixLoadState ? (
              <button
                className="button is-fullwidth is-outlined is-rounded"
                onClick={loadMixesFunc}
              >
                More Music!
              </button>
            ) : (
              <progress className="progress is-medium is-primary" max="100">
                15%
              </progress>
            )}
          </div>
          <div className="column is-narrow">
            <a href="#mixes-header">
              <button className="button is-fullwidth is-outlined is-rounded">
                Top
              </button>
            </a>
          </div>
        </div>
      ) : (
        <div className="columns is-mobile">
          <div className="column is-offset-10 is-2">
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
