import React, { useContext } from 'react'
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
 * @returns {jsx}
 */
export default function TagButtons({ tagsArray }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  /**
   * Sends off {@link ADD_TAG_TO_MIX_SEARCH} and {@link NEW_TAGS_FOR_TAG_QUERY_SEARCH}.
   * Two Dispatch Scenarios:
   * 1. mixSearchTags hasn't been set yet (starts out `null`)
   * 2. mixSearchTags is an array with:
   *    - .length < 3
   *    - doesn't contain the current tag
   *
   * 1 -> dispatch tag wrapped in an array e.g. `['tag']`.
   * 2 -> dispatch tag as a string e.g. `'tag'`,.
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

  return (
    <div className="tags">
      {tagsArray?.map((tag, index) => {
        const lowercaseTag = tag.toLowerCase()
        return (
          <button
            key={`span-tag-#${index}`}
            className="tag is-outlined is-rounded is-black"
            onClick={() => {
              addTagToSearchArray(lowercaseTag)
            }}
          >
            {lowercaseTag}
          </button>
        )
      })}
    </div>
  )
}

TagButtons.propTypes = {
  tagsArray: PropTypes.arrayOf(PropTypes.string),
}
