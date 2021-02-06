import React from 'react'
import { ImageHelper } from './index'

/**
 * Creates a Slice Component that display two images and some text. The text section can be either on the left of the right.
 * @category CMS
 *  Slices
 * @function
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function ImageRow({ slice }) {
  return (
    <section className="container slice">
      <div className="columns is-mobile is-multiline">
        {slice.fields.map(({ single_img }, index) => {
          return (
            <ImageHelper
              key={`img-#${index}-${single_img.alt}`}
              imageData={single_img}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ImageRow
