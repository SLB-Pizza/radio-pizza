import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'

/**
 * Makes tag buttons. Returns null if tagsArray has length 0. Rendered by {@link SingleMixCard}. Dispatches {@link addTagToSearchArray} onClick using the selected tag
 * @category Layout Helper
 * @function TagButtons
 * @param {String[]} tagsArray - array of strings that are used to make the individual tag buttons
 * @param {?Boolean} onMixesPage - optional boolean for use with {@link tagNavigateAndDispatch} function. When `true`, tells that function to ignore the navigate portion of the function and just run {@link addTagToSearchArray}.
 * @returns {jsx}
 */
export default function TagButtons({ tagsArray, onMixesPage }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  /**
   * Dispatches {@link ADD_TAG_TO_MIX_SEARCH} or {@link NEW_TAGS_FOR_TAG_QUERY_SEARCH}.
   *
   * **Two Dispatch Scenarios**
   *
   * 1. mixSearchTags hasn't been set yet (starts out `null`)
   *    - dispatches tag wrapped in an array e.g. `['tag']`.
   * 2. mixSearchTags is an array with:
   *    - `.length < 3`
   *    - doesn't contain the current tag
   *      - dispatches tag as a string e.g. `'tag'`.
   * @category Dispatch Function
   * @function addTagToSearchArray
   * @param {String} tag - the string that appears in a single mix tag
   */
  const addTagToSearchArray = async tag => {
    if (!globalState.mixSearchTags) {
      await dispatch({
        type: 'NEW_TAGS_FOR_TAG_QUERY_SEARCH',
      })
      await dispatch({
        type: 'ADD_TAG_TO_MIX_SEARCH',
        payload: {
          mixTag: [tag],
        },
      })
    } else if (
      globalState.mixSearchTags.indexOf(tag) === -1 &&
      globalState.mixSearchTags.length < 3
    ) {
      await dispatch({
        type: 'NEW_TAGS_FOR_TAG_QUERY_SEARCH',
      })
      await dispatch({
        type: 'ADD_TAG_TO_MIX_SEARCH',
        payload: {
          mixTag: tag,
        },
      })
    }
  }

  /**
   * Function that reads the current location and navigates to `/mixes` ({@link MixesIndexPage}) before firing off the {@link addTagToSearchArray} dispatch function. Reason being that if the dispatch function is allowed to fire before navigating to `/mixes`, the `globalState.mixSearchTags` array will update and not trigger the `useEffect` chain on {@link MixesIndexPage} to fire
   *
   * Pages and Templates that need to pass down the Gatsby's `location` prop through a {@link SingleMixCard} render into this {@link TagButtons} component:
   * - {@link IndexPage}
   * @category Utilities
   * @function tagNavigateAndDispatch
   * @param {String} currentLocation
   * @param {String} tag
   */
  const tagNavigateAndDispatch = (onMixesPage, tag) => {
    if (!onMixesPage) {
      navigate('/mixes')
    }
    addTagToSearchArray(tag)
  }

  return (
    <div className="tags">
      {tagsArray?.map((tag, index) => {
        return (
          <button
            key={`span-tag-#${index}`}
            className="tag is-outlined is-rounded is-black"
            onClick={() => {
              tagNavigateAndDispatch(onMixesPage, tag)
            }}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}

TagButtons.propTypes = {
  tagsArray: PropTypes.arrayOf(PropTypes.string),
}
