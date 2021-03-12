import React from 'react'
import { ImageHelper } from '../helpers'
import { mappableDataFilter } from '../../utils'

/**
 * Render a row of same-width images, regardless of aspect ratios; {@link ImageHelper} handles that. Wraps to a new line after 12 images because there are more than 12 columns.
 * @category CMS Slices
 * @function ImageRow
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the ImageRow slice
 * @returns {jsx}
 */
function ImageRow({ slice }) {
  const { fields } = slice

  const filteredFields = mappableDataFilter(fields)

  if (filteredFields) {
    return (
      <section className="section container is-fluid slice">
        <div className="columns is-mobile is-centered">
          <div className="column is-11">
            <div className="columns is-mobile is-multiline">
              {filteredFields.map(({ single_img }, index) => {
                return (
                  <ImageHelper
                    key={`img-#${index}-${single_img.alt || 'row'}`}
                    imageData={single_img}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }
  return null
}

export default ImageRow
