import React from 'react'
import { ImageHelper, RichTextHelper } from '../helpers'

/**
 * Creates a Slice Component that display two images and some text. The image can be placed either on the left of the right in Prismic.
 * @category CMS Slice
 * @function OneImageAndText
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function OneImageAndText({ slice }) {
  const { oiat_text, oiat_img } = slice.primary

  /**
   * Derive layout type by processing `slice.label`.
   * Will be selected by user in Prismic; two layout labels available:
   * - Left: Image-Text
   * - Right: Text-Image
   *
   * The layout label is received all lowercase and `: ` is converted to `__`; split on it to get direction.
   */
  const layoutType = slice.label.split('__')[0]

  const oiatContentClass = 'column is-two-thirds-tablet'
  const oiatImageClass = 'column is-one-third-tablet is-full-mobile'

  return (
    <section
      className="section container slice"
      style={{
        borderTop: '2px solid chartreuse',
        borderBottom: '2px solid red',
      }}
    >
      <div className="columns is-mobile is-multiline">
        {layoutType === 'left' ? (
          <>
            <RichTextHelper
              richText={oiat_text}
              columnSizing={oiatContentClass}
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
            <RichTextHelper
              richText={oiat_text}
              columnSizing={oiatContentClass}
            />
          </>
        )}
      </div>
    </section>
  )
}

export default OneImageAndText
