import React from 'react'
import { ContentHelper, ImageHelper } from './index'

/**
 * Creates a Slice Component that display two images and some text. The text section can be either on the left of the right.
 * @category CMS
 * @subcategory Slices
 * @function
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function OneImageAndText({ slice }) {
  const { oiat_layout, oiat_text, oiat_img } = slice.primary

  /**
   * Derive layout type by processing tiat_layout. Same process followed as {@link getBlockquoteStyling}
   */
  const layoutType = oiat_layout.split(':')[0]

  const oiatContentClass = 'column is-two-thirds-tablet'
  const oiatImageClass = 'column is-one-third-tablet is-full-mobile'

  return (
    <section className="container slice">
      <div className="columns is-mobile is-multiline">
        {layoutType === 'Left' ? (
          <>
            <ContentHelper
              text={oiat_text}
              columnClassName={oiatContentClass}
            />
            <ImageHelper
              imageData={oiat_img}
              columnClassName={oiatImageClass}
            />
          </>
        ) : (
          <>
            <ImageHelper
              imageData={oiat_img}
              columnClassName={oiatImageClass}
            />
            <ContentHelper
              text={oiat_text}
              columnClassName={oiatContentClass}
            />
          </>
        )}
      </div>
    </section>
  )
}

export default OneImageAndText
