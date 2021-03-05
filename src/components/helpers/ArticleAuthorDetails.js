import React from 'react'
import { FallbackImage } from '../../utils'

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

  /**
   * Determine the authorLabeling string.
   */
  let authorLabeling
  if (hmbk_staff_name) {
    if (hmbk_staff_position) {
      authorLabeling = `${hmbk_staff_name}, ${hmbk_staff_position}`
    } else {
      authorLabeling = hmbk_staff_name
    }
  } else {
    authorLabeling = 'HMBK Staff'
  }

  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column is-narrow">
        <figure className="image is-48x48" aria-label={authorLabeling}>
          {hmbk_staff_photo ? (
            <img
              className="is-rounded"
              src={hmbk_staff_photo.author.url}
              alt={authorLabeling}
            />
          ) : (
            <FallbackImage />
          )}
        </figure>
      </div>
      <div className="column">
        {hmbk_staff_name && (
          <p className="title is-size-6">{hmbk_staff_name}</p>
        )}
        {hmbk_staff_position && (
          <p className="subtitle is-size-7">{hmbk_staff_position}</p>
        )}
      </div>
    </div>
  )
}
