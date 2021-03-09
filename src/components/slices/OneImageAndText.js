import { left } from 'inquirer/lib/utils/readline'
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
  const { label, primary } = slice
  let { oiat_img, oiat_text } = primary

  let layoutSide, textClass, imageClass, imageSize

  /**
   * Derive layout type by processing `slice.label`.
   * Will be selected by user in Prismic; four layout labels available:
   *
   * | Prismic Layout Label        | As Received by `<OneImageAndText>` |
   * |-----------------------------|------------------------------------|
   * | Left: Tall Image -- Text    | `left__tall_image_--_text`         |
   * | Left: Wide Image -- Text    | `left__wide_image_--_text`         |
   * | Right: Text -- Tall Image   | `right__text_--_tall_image`        |
   * | Right: Text -- Wide Image   | `right__text_--_wide_image`        |
   *
   * The layout label is received all lowercase and `: ` is converted to `__`; split on it to get direction.
   */
  let layoutDetails

  if (!label) {
    layoutSide = left
  } else {
    layoutDetails = label.split('__')
    layoutSide = layoutDetails[0]

    if (layoutSide === 'left') {
      imageSize = layoutDetails[1].split('_--_')[0] // size would be first entry
    } else {
      imageSize = layoutDetails[1].split('_--_')[1] // size would be last entry
    }
  }

  /**
   * Determine the column `className` based on the available data. Similar process to {@link TwoImagesAndText}.
   *
   * **if `oiat_text` has value**
   * - `oiat_text` is `null`: make content "full" width; `is-11` FHD
   * - `imageSize` is `tall_image`: content 7 -- image 4 FHD; 8+4 tablet; mobile full
   * - `imageSize` is `wide_image`: content 4 -- image 7 FHD; 8+4 tablet; mobile full
   *
   * **else: `0iat_text === null`**
   * - `oiat_img` is `null`: section renders with no content
   * - `oiat_img` exists: image 11 FHD; full tablet and mobile
   */
  if (oiat_text) {
    if (!oiat_img) {
      textClass = 'column is-11-fullhd is-full-tablet is-full-mobile'
    } else if (imageSize === 'tall_image') {
      textClass = 'column is-7-fullhd is-8-tablet is-full-mobile'
      imageClass = 'column is-4-fullhd is-4-tablet is-full-mobile'
    } else {
      textClass = 'column is-4-fullhd is-4-tablet is-full-mobile'
      imageClass = 'column is-7-fullhd is-8-tablet is-full-mobile'
    }
  } else {
    if (!oiat_img) {
      imageClass = null
    } else {
      imageClass = 'column is-11-fullhd is-full-tablet is-full-mobile'
    }
  }

  // console.log(layoutSide);
  // console.log(imageSize);
  // console.log("textClass", textClass);
  // console.log("imageClass", imageClass);
  // console.log("===========================\n");

  return (
    <section className="section container is-fullhd is-fluid slice debug">
      <div className="columns is-mobile is-centered is-multiline">
        {layoutSide === 'left' ? (
          <>
            {oiat_text && (
              <RichTextHelper richText={oiat_text} columnSizing={textClass} />
            )}
            {oiat_img && (
              <ImageHelper imageData={oiat_img} columnSizing={imageClass} />
            )}
          </>
        ) : (
          <>
            {oiat_img && (
              <ImageHelper imageData={oiat_img} columnSizing={imageClass} />
            )}
            {oiat_text && (
              <RichTextHelper richText={oiat_text} columnSizing={textClass} />
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default OneImageAndText
