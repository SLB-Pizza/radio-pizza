import React from 'react'
import { ImageHelper, RichTextHelper } from '../helpers'

/**
 * Creates a Slice Component that display two images and some text. The text section can be either on the left of the right.
 *
 * **Column `className` breakdown when both images exist**
 *
 * | Breakpoint | Text (`contentClass`) | Each Image (`imageClass`) | Notes |
 * |-|-|-|-|
 * | Mobile | `is-full` | `is-half` | Left layout -- Text above images; Right layout -- images above text |
 * | Tablet | `is-half` | `is-one-quarter` |  |
 * | Desktop | `is-half` | `is-one-quarter` |  |
 * | Widescreen | `is-half` | `is-one-quarter` |  |
 * | FullHD | `is-5` | `is-3` | Wrapper column className `is-centered is-fluid` in effect, total column width is 11 (5+3+3); one column removed from fluid.  |
 * @category CMS Slices
 * @function TwoImagesAndText
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function TwoImagesAndText({ slice }) {
  const { label, primary } = slice

  let { tiat_text, tiat_left_img: leftImg, tiat_right_img: rightImg } = primary

  /**
   * Create placeholder variables for layout and className conditionals.
   */
  let layoutType, contentClass, imageClass

  /**
   * Derive layout type by processing `slice.label`.
   * Will be selected by user in Prismic; two layout labels available:
   *
   * | Prismic Layout Label           | As Received by `<TwoImagesAndText>` |
   * |--------------------------------|-------------------------------------|
   * | Left: Text -- Image -- Image   | `left__text_--_image_--_image`      |
   * | Right: Image -- Image -- Image | `right__image_--_image_--_text`     |
   *
   * The layout label is received all lowercase and `: ` is converted to `__`; split on it to get direction.
   */
  if (!label) {
    layoutType = 'left'
  } else {
    layoutType = label.split('__')[0]
  }

  // leftImg = null; // Styling works
  // rightImg = null; // Styling works
  // tiat_text = null; // Styling works

  /**
   * Determine the column `className` based on the available data.
   *
   * **if `tiat_text` has value**
   * - Both images are `null`: make content "full" width; `is-11` FHD
   * - One of the images is `null`: expand available image size, 6:5 columns FHD
   * - Both images have values - render as normal
   *
   * **else: `tiat_text === null`**
   * - Both images are `null`: section renders with no content
   * - One of the images is `null`: expand available image size, 6:5 columns FHD
   * - Both images have values - render as normal
   */
  if (tiat_text) {
    if (!leftImg && !rightImg) {
      contentClass = 'column is-11-fullhd is-full-tablet is-full-mobile'
    } else if ((!leftImg && rightImg) || (leftImg && !rightImg)) {
      contentClass = 'column is-6-fullhd is-7-tablet is-full-mobile'
      imageClass = 'column is-5-fullhd is-5-tablet is-half-mobile'
    } else {
      contentClass = 'column is-5-fullhd is-half-tablet is-full-mobile'
      imageClass = 'column is-3-fullhd is-one-quarter-tablet is-half-mobile'
    }
  } else {
    if (!leftImg && !rightImg) {
      imageClass = null
    } else if ((!leftImg && rightImg) || (leftImg && !rightImg)) {
      imageClass = 'column is-four-fifths is-four-fifths-tablet is-half-mobile'
    } else {
      imageClass = 'column is-two-fifths is-half-tablet is-half-mobile'
    }
  }

  // console.log(slice.label);
  // console.log("contentClass", contentClass);
  // console.log("imageClass", imageClass);

  return (
    <section className="section container is-fullhd is-fluid slice">
      <div className="columns is-mobile is-centered is-multiline">
        {layoutType === 'left' ? (
          <>
            {tiat_text && (
              <RichTextHelper
                richText={tiat_text}
                columnSizing={contentClass}
              />
            )}
            {leftImg && (
              <ImageHelper imageData={leftImg} columnSizing={imageClass} />
            )}
            {rightImg && (
              <ImageHelper imageData={rightImg} columnSizing={imageClass} />
            )}
          </>
        ) : (
          <>
            {leftImg && (
              <ImageHelper imageData={leftImg} columnSizing={imageClass} />
            )}

            {rightImg && (
              <ImageHelper imageData={rightImg} columnSizing={imageClass} />
            )}
            {tiat_text && (
              <RichTextHelper
                richText={tiat_text}
                columnSizing={contentClass}
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default TwoImagesAndText
