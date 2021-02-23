import PropTypes from 'prop-types'
import React from 'react'

/**
 * Makes tag buttons. Returns null if tagsArray has length 0
 * Used in:
 * - {@link SingleMixCard}
 *
 * @category Layout Helper
 * @function TagButtons
 * @param {String[]} tagsArray - array of strings that are used to make the individual tag buttons
 * @returns {jsx}
 */
export default function TagButtons({ tagsArray }) {
  if (tagsArray.length) {
    return (
      <div className="tags">
        {tagsArray.map((tag, index) => {
          const lowercaseTag = tag.toLowerCase()

          return (
            <span
              key={`span-tag-#${index}`}
              className="tag is-outlined is-rounded is-black"
            >
              {lowercaseTag}
            </span>
          )
        })}
      </div>
    )
  } else {
    return null
  }
}

TagButtons.propTypes = {
  tagsArray: PropTypes.arrayOf(PropTypes.string),
}
