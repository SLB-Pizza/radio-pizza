import React, { useContext } from 'react'
import {
  FetchedTagStickySection,
  LandingPageFetchAndLoading,
  SingleMixCard,
} from './index'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
import { scrollToTop } from '../utils'

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
      scrollToTop()
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
   * @function markSameTagsInQuery
   * @param {Boolean} isSame - used to determine which type to dispatch
   */
  const markSameTagsInQuery = async isSame => {
    if (isSame) {
      await dispatch({
        type: 'USING_SAME_TAGS_IN_MIX_QUERY',
      })
    } else {
      await dispatch({
        type: 'NEW_TAGS_FOR_TAG_QUERY_SEARCH',
      })
      scrollToTop()
    }
  }

  /**
   * Fires off both {@link markSameTagsInQuery} with a `true` value and the `fetchFunc` {@link fetchTaggedMixes}.
   * @category Utility Function
   * @function dispatchAndFetchTaggedMixes
   */
  const dispatchAndFetchTaggedMixes = () => {
    markSameTagsInQuery(true)
    fetchFunc({
      variables: {
        after: fetchedData.endCursor,
        tags: selectedTags,
      },
    })
  }

  const mixCardLayout = 'column is-12-mobile is-6-tablet is-4-widescreen'

  return (
    <div className="columns is-mobile">
      <FetchedTagStickySection
        selectedTags={selectedTags}
        totalCount={fetchedData.totalCount}
        removeTagFromSearchArray={removeTagFromSearchArray}
        markSameTagsInQuery={markSameTagsInQuery}
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

        <LandingPageFetchAndLoading
          hasMore={fetchedData.hasMore}
          currentlyFetching={isFetching}
          fetchMoreFunc={dispatchAndFetchTaggedMixes}
          fetchMoreBtnTxt={'More Mixes Like These'}
        />
      </div>
    </div>
  )
}

export default DisplayFetchedTaggedMixes
