import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'

/**
 * Makes tag buttons. Returns null if tagsArray has length 0. Rendered by {@link SingleMixCard}. Dispatches {@link tagDispatch} onClick using the selected tag
 * @category Layout Helper
 * @function TagButtons
 * @param {String[]} tagsArray - array of strings that are used to make the individual tag buttons
 * @returns {jsx}
 */
export default function TagButtons({ tagsArray }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  /**
   * Sends off {@link SELECT_MIX_SEARCH_TAG}
   * Two Dispatch Scenarios:
   * 1. mixSearchTags hasn't been set yet (starts out `null`)
   * 2. mixSearchTags is an array with:
   *    - .length < 3
   *    - doesn't contain the current tag
   *
   * 1 -> dispatch tag wrapped in an array e.g. `['tag']`
   * 2 -> dispatch tag as a string e.g. `'tag'`
   * @category Dispatch Function
   * @name tagDispatch
   */
  const tagDispatch = async tag => {
    if (!globalState.mixSearchTags) {
      await dispatch({
        type: 'SELECT_MIX_SEARCH_TAG',
        payload: {
          mixTag: [tag],
        },
      })
    } else if (
      globalState.mixSearchTags.indexOf(tag) === -1 &&
      globalState.mixSearchTags.length < 3
    ) {
      await dispatch({
        type: 'SELECT_MIX_SEARCH_TAG',
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
            onClick={() => tagDispatch(lowercaseTag)}
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
