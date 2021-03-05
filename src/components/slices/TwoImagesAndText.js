import React from 'react'
import { ImageHelper, RichTextHelper } from '../helpers'

/**
 * Creates a Slice Component that display two images and some text. The text section can be either on the left of the right.
 * @category CMS
 *  Slices
 * @function
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function TwoImagesAndText({ slice }) {
  const {
    tiat_is_gapless,
    tiat_text,
    tiat_left_img,
    tiat_right_img,
  } = slice.primary

  /**
   * Derive layout type by processing `slice.label`.
   * Will be selected by user in Prismic; two layout labels available:
   * - Left: Image-Text
   * - Right: Text-Image
   *
   * The layout label is received all lowercase and `: ` is converted to `__`; split on it to get direction.
   */
  const layoutType = slice.label.split('__')[0]

  const columnsClassName = tiat_is_gapless
    ? 'columns is-mobile is-multiline is-gapless'
    : 'columns is-mobile is-multiline'

  const tiatContentClass = 'column is-half'
  const tiatImageClass = 'column is-one-quarter'

  return (
    <section className="container slice">
      <div className={columnsClassName}>
        {layoutType === 'Left' ? (
          <>
            <RichTextHelper
              richText={tiat_text}
              columnSizing={tiatContentClass}
            />
            <ImageHelper
              imageData={tiat_left_img}
              columnClassName={tiatImageClass}
            />

            <ImageHelper
              imageData={tiat_right_img}
              columnClassName={tiatImageClass}
            />
          </>
        ) : (
          <>
            <ImageHelper
              imageData={tiat_left_img}
              columnClassName={tiatImageClass}
            />

            <ImageHelper
              imageData={tiat_right_img}
              columnClassName={tiatImageClass}
            />
            <RichTextHelper
              richText={oiat_text}
              columnSizing={tiatContentClass}
            />
          </>
        )}
      </div>
    </section>
  )
}

export default TwoImagesAndText
