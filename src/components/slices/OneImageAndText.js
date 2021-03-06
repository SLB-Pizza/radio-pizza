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
  const { oiat_img, oiat_text, image_type, text_block_position } = slice.primary

  let textClass, imageClass

  // Split the image type string on the whitespace to obtain the layout type.
  const layout = image_type.split(' ')[0]

  /**
   * 1. Check to see if `oiat_img` exists.
   * 2. Check to see if layout is "Tall".
   * 3. Set class data for a "Wide" image layout.
   */
  if (!oiat_img) {
    textClass = 'column is-full'
  } else if (layout === 'Tall') {
    textClass = 'column is-two-thirds-tablet is-full-mobile'
    imageClass = 'column is-one-third-tablet is-full-mobile'
  } else {
    textClass = 'column is-one-third-tablet is-full-mobile'
    imageClass = 'column is-two-thirds-tablet is-full-mobile'
  }

  return (
    <section className="section container slice debug">
      <div className="columns is-mobile is-multiline">
        {!text_block_position ? (
          <>
            <RichTextHelper richText={oiat_text} columnSizing={textClass} />
            {oiat_img && (
              <ImageHelper imageData={oiat_img} columnClassName={imageClass} />
            )}
          </>
        ) : (
          <>
            {oiat_img && (
              <ImageHelper imageData={oiat_img} columnClassName={imageClass} />
            )}
            <RichTextHelper richText={oiat_text} columnSizing={textClass} />
          </>
        )}
      </div>
    </section>
  )
}

export default OneImageAndText
