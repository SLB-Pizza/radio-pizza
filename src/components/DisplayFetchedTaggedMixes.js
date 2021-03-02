import React, { useContext } from 'react'
import { FetchedTagStickySection, HMBKDivider, SingleMixCard } from './index'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
/**
 * Layout for the mixes fetched when a {@link TagButtons} is clicked.
 * Renders on {@link MixesIndexPage} when `selectedTags` isn't null and {@link fetchTaggedMixes} has returned fetchedMixes results.
 *
 * This component passes `onMixesPage = true` prop to {@link SingleMixCard} for use in {@link TagButtons}.
 * @category Layout Helper
 * @function DisplayFetchedTaggedMixes
 * @param {Function} fetchFunc - the function used onClick to trigger the {@link fetchTaggedMixes} useLazyQuery in {@link MixesIndexPage}
 * @param {Object[]} fetchedData - array received when a tag query initiates
 * @param {Boolean} isFetching - fetching status from {@link fetchTaggedMixes} useLazyQuery in parent component, {@link MixesIndexPage}
 * @param {String[]} selectedTags - array of mixes in the current tag query
 * @returns {jsx}
 */
function DisplayFetchedTaggedMixes({
  fetchFunc,
  fetchedData,
  isFetching,
  selectedTags,
}) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  /**
   * Dispatches {@link REMOVE_TAG_FROM_SEARCH_ARRAY} when there are 2 or 3 tags in the search array.
   * Dispatches {@link CLEAR_MIX_SEARCH_TAGS} when there is only 1 tag.
   * @category Dispatch Function
   * @name removeTagFromSearchArray
   */
  const removeTagFromSearchArray = async tag => {
    if (globalState.mixSearchTags.length >= 2) {
      await dispatch({
        type: 'REMOVE_TAG_FROM_SEARCH_ARRAY',
        payload: {
          tagToRemove: tag,
        },
      })
    } else {
      await dispatch({
        type: 'CLEAR_MIX_SEARCH_TAGS',
      })
    }
  }

  /**
   * When passed true, dispatches {@link USING_SAME_TAGS_IN_MIX_QUERY}.
   * When pass false, dispatches {@link NEW_TAGS_FOR_TAG_QUERY_SEARCH}.
   *
   * TRUE: internal fetch more button in this component.
   * FALSE: {@link TagButtons} or by the 'Selected Tag' buttons showing what tags were used for the current `fetchedData` data subarray.
   * @category Dispatch Function
   * @function sameTagsInQuery
   * @param {Boolean} isSame - used to determine which type to dispatch
   */
  const sameTagsInQuery = async isSame => {
    if (isSame) {
      await dispatch({
        type: 'USING_SAME_TAGS_IN_MIX_QUERY',
      })
    } else {
      await dispatch({
        type: 'NEW_TAGS_FOR_TAG_QUERY_SEARCH',
      })
    }
  }

  const mixCardLayout = 'column is-12-mobile is-6-tablet is-4-widescreen'

  return (
    <div className="columns is-mobile">
      <FetchedTagStickySection
        selectedTags={selectedTags}
        totalCount={fetchedData.totalCount}
        removeTagFromSearchArray={removeTagFromSearchArray}
        sameTagsInQuery={sameTagsInQuery}
      />
      <div className="column is-8-tablet is-9-desktop">
        <div className="columns is-mobile is-multiline">
          {fetchedData?.data.map(({ node }, index) => (
            <SingleMixCard
              key={`tagged-mix-#${index}`}
              mixData={node}
              columnLayout={mixCardLayout}
              onMixesPage={true}
            />
          ))}
        </div>
        {fetchedData.hasMore ? (
          <div className="columns is-mobile is-vcentered">
            {!isFetching ? (
              <div className="column">
                <button
                  className="button is-fullwidth is-outlined is-rounded"
                  onClick={() => {
                    sameTagsInQuery(true)
                    fetchFunc({
                      variables: {
                        after: fetchedData.endCursor,
                        tags: selectedTags,
                      },
                    })
                  }}
                >
                  More Mixes
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
      </div>
    </div>
  )
}

export default DisplayFetchedTaggedMixes
