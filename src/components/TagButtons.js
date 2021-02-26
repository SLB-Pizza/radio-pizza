import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'

/**
 * Makes tag buttons. Returns null if tagsArray has length 0. Rendered by {@link SingleMixCard}. Dispatches {@link } onClick
 * @category Layout Helper
 * @function TagButtons
 * @param {String[]} tagsArray - array of strings that are used to make the individual tag buttons
 * @returns {jsx}
 */
export default function TagButtons({ tagsArray }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  /**
   * If the tag isn't already in the mixSearchTags array and there are less than three items, create and send the dispatch for {@link SELECT_MIX_SEARCH_TAGS}
   */
  const tagDispatch = async tag => {
    if (
      globalState.mixSearchTags.indexOf(tag) === -1 &&
      globalState.mixSearchTags.length < 3
    ) {
      await dispatch({
        type: 'SELECT_MIX_SEARCH_TAGS',
        payload: { mixTag: tag },
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
