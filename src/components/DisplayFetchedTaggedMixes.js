import React from 'react'
import { HMBKDivider, SingleMixCard } from './index'

/**
 * Layout for the mixes fetched when a {@link TagButtons} is clicked.
 * Renders on {@link MixesIndexPage} when `selectedTags` isn't null and {@link fetchTaggedMixes} has returned fetchedMixes results.
 * @category Layout Helper
 * @function DisplayFetchedTaggedMixes
 * @param {Function} fetchFunc - the function used onClick to trigger the {@link fetchTaggedMixes} useLazyQuery in {@link MixesIndexPage}
 * @param {Object[]} fetchedData - array received when a tag query initiates
 * @param {Boolean} isFetching - fetching status from {@link fetchTaggedMixes} useLazyQuery in parent component, {@link MixesIndexPage}
 * @param {String[]} selectedMixes - array of mixes in the current tag query
 * @returns {jsx}
 */
function DisplayFetchedTaggedMixes({
  fetchFunc,
  fetchedData,
  isFetching,
  selectedTags,
}) {
  const mixCardLayout = 'column is-12-mobile is-6-tablet is-4-widescreen'

  return (
    <div className="columns is-mobile">
      <div className="column is-3">
        <div className="sticky-section">
          <div className="content">
            <h1 className="title">{`${fetchedData.totalCount} mixes`}</h1>
            <p className="subtitle">{`${fetchedData.data.length} length of data`}</p>
            <ul>
              {selectedTags?.map((tag, index) => (
                <li key={`tag-${index}`}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="column is-9">
        {isFetching ? (
          <div className="columns is-mobile is-vcentered">
            <HMBKDivider forLoading={true} />
          </div>
        ) : (
          <>
            <div className="columns is-mobile is-multiline">
              {fetchedData?.data.map(({ node }, index) => (
                <SingleMixCard
                  key={`tagged-mix-#${index}`}
                  mixData={node}
                  columnLayout={mixCardLayout}
                />
              ))}
            </div>
            {fetchedData.hasMore ? (
              <div className="columns is-mobile is-vcentered">
                <div className="column">
                  {!isFetching ? (
                    <button
                      className="button is-fullwidth is-outlined is-rounded"
                      onClick={() =>
                        fetchFunc({
                          variables: {
                            after: fetchedData.endCursor,
                            tags: selectedTags,
                          },
                        })
                      }
                    >
                      More Mixes
                    </button>
                  ) : (
                    <HMBKDivider forLoading={true} />
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
        )}
      </div>
    </div>
  )
}

export default DisplayFetchedTaggedMixes
