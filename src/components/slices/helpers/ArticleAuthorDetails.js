import React from 'react'
import { FallbackImage } from '../../../utils'

/**
 * Renders the article author pic and name for a given {@link FeatureTemplate}'s {@link ArticleBylineSubtitle}.
 * @category Slice Helper
 * @function ArticleAuthorDetails
 * @param {Object.<String, String|Object>} authorDetails
 * @returns {jsx}
 */
export default function ArticleAuthorDetails({ authorDetails }) {
  const {
    hmbk_staff_name,
    hmbk_staff_position,
    hmbk_staff_photo,
  } = authorDetails
  return (
    <>
      <figure
        className="image is-32x32"
        aria-label={`${hmbk_staff_name}, ${hmbk_staff_position}`}
      >
        {hmbk_staff_photo ? (
          <img
            className="is-rounded"
            src={hmbk_staff_photo.author.url}
            alt={`${hmbk_staff_name}, ${hmbk_staff_position}`}
          />
        ) : (
          <FallbackImage />
        )}
      </figure>
      <span className="is-size-6">{`${hmbk_staff_name}, ${hmbk_staff_position}`}</span>
    </>
  )
}
