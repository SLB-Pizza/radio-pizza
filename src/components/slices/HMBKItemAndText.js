import React from 'react'
import { ImageHelper, RichTextHelper } from '../helpers'
import {
  SingleEventCard,
  SingleFeatureCard,
  SingleMixCard,
  SingleResidentCard,
} from '../index'

/**
 * Creates a Slice Component that an HMBK media card and some text. The image can be placed either on the left of the right in Prismic.
 * @category CMS Slice
 * @function HMBKItemAndText
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create this slice
 * @returns {jsx}
 */
function HMBKItemAndText({ slice }) {
  const { label, primary } = slice
  let { hmbk_item: media, oiat_text: text } = primary

  let layoutSide,
    textClass,
    mediaClass,
    layoutDetails,
    MediaComponent,
    componentProps

  const mediaComponents = {
    PRISMIC_Event: SingleEventCard,
    PRISMIC_Feature: SingleFeatureCard,
    PRISMIC_Mix: SingleMixCard,
    PRISMIC_Resident: SingleResidentCard,
  }

  if (!media) {
    return null
  }

  /**
   * Select the media card component to use based on the received `media.__typename`.
   */
  const mediaType = media.__typename
  MediaComponent = mediaComponents[mediaType]

  /**
   * Derive layout type by processing `slice.label`.
   * Will be selected by user in Prismic; four layout labels available:
   *
   * | Prismic Layout Label  | As Received by `<HMBKItemAndText>` |
   * |-----------------------|------------------------------------|
   * | Left: Card -- Text    | `left__card_--_text`               |
   * | Right: Text -- Card   | `right__text_--_card`              |
   *
   * The layout label is received all lowercase and `: ` is converted to `__`; split on it to get direction.
   */

  if (!label) {
    layoutSide = 'left'
  } else {
    layoutDetails = label.split('__')
    layoutSide = layoutDetails[0]
  }

  /**
   * Determine the column `className` based on the available data. Similar process to {@link TwoImagesAndText}.
   *
   * **if `text` has value**
   * - `text` is `null`: make content "full" width; `is-11` FHD
   * - `media` is `tall`: content 8 -- media 3 FHD; 9+3 tablet; mobile full
   * - `media` is `wide`: content 7 -- media 4 FHD; 8+4 tablet; mobile full
   *
   * **else: `text === null`**
   * - `media` is `null`: section renders with no content
   * - `media` exists: media 11 FHD; full tablet and mobile
   */
  if (text) {
    if (!media) {
      textClass = 'column is-11-fullhd is-full-tablet is-full-mobile'
    } else {
      switch (mediaType) {
        case 'PRISMIC_Event':
          textClass = 'column is-8-fullhd is-9-tablet is-full-mobile'
          mediaClass = 'column is-3-fullhd is-3-tablet is-full-mobile'
          componentProps = {
            eventData: media,
            eventColumnLayout: mediaClass,
          }
          break
        case 'PRISMIC_Mix':
          textClass = 'column is-8-fullhd is-9-tablet is-full-mobile'
          mediaClass = 'column is-3-fullhd is-3-tablet is-full-mobile'
          componentProps = {
            mixData: media,
            columnLayout: mediaClass,
          }
          break
        case 'PRISMIC_Resident':
          textClass = 'column is-8-fullhd is-9-tablet is-full-mobile'
          mediaClass = 'column is-3-fullhd is-3-tablet is-full-mobile'
          componentProps = {
            resident: media,
          }
          break
        case 'PRISMIC_Feature':
          textClass = 'column is-7-fullhd is-8-tablet is-full-mobile'
          mediaClass = 'column is-4-fullhd is-4-tablet is-full-mobile'
          break
        default:
          textClass = 'column is-8-fullhd is-9-tablet is-full-mobile'
          mediaClass = 'column is-3-fullhd is-3-tablet is-full-mobile'
      }
    }
  } else {
    if (!media) {
      mediaClass = null
    } else {
      mediaClass = 'column is-3-fullhd is-half-tablet is-full-mobile'
    }
  }
  // if (text) {
  //   if (!media) {
  //     textClass = "column is-11-fullhd is-full-tablet is-full-mobile";
  //   } else if (imageSize === "tall_image") {
  //     textClass = "column is-7-fullhd is-8-tablet is-full-mobile";
  //     imageClass = "column is-4-fullhd is-4-tablet is-full-mobile";
  //   } else {
  //     textClass = "column is-4-fullhd is-4-tablet is-full-mobile";
  //     imageClass = "column is-7-fullhd is-8-tablet is-full-mobile";
  //   }
  // } else {
  //   if (!media) {
  //     imageClass = null;
  //   } else {
  //     imageClass = "column is-11-fullhd is-full-tablet is-full-mobile";
  //   }
  // }

  // console.log(layoutSide);
  // console.log(imageSize);
  // console.log("textClass", textClass);
  // console.log("imageClass", imageClass);
  // console.log("===========================\n");

  return (
    <section className="section container is-fullhd is-fluid slice">
      <div className="columns is-mobile is-centered is-multiline">
        {layoutSide === 'left' ? (
          <>
            {text && (
              <RichTextHelper richText={text} columnSizing={textClass} />
            )}
            {media && <MediaComponent {...componentProps} />}
          </>
        ) : (
          <>
            {media && <MediaComponent {...componentProps} />}
            {text && (
              <RichTextHelper richText={text} columnSizing={textClass} />
            )}
          </>
        )}
      </div>
    </section>
  )

  // return (
  //   <section className="section container is-fullhd is-fluid slice">
  //     <div className="columns is-mobile is-centered is-multiline">
  //       {layoutSide === "left" ? (
  //         <>
  //           {text && (
  //             <RichTextHelper richText={text} columnSizing={textClass} />
  //           )}
  //           {image && (
  //             <ImageHelper imageData={image} columnSizing={imageClass} />
  //           )}
  //         </>
  //       ) : (
  //         <>
  //           {image && (
  //             <ImageHelper imageData={image} columnSizing={imageClass} />
  //           )}
  //           {text && (
  //             <RichTextHelper richText={text} columnSizing={textClass} />
  //           )}
  //         </>
  //       )}
  //     </div>
  //   </section>
  // );
}

export default HMBKItemAndText
