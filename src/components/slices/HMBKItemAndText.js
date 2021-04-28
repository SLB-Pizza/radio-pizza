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
    columnLayout,
    mediaType,
    MediaComponent,
    componentProps

  const mediaComponents = {
    PRISMIC_Event: SingleEventCard,
    PRISMIC_Feature: SingleFeatureCard,
    PRISMIC_Mix: SingleMixCard,
    PRISMIC_Resident: SingleResidentCard,
  }

  /**
   * If media exists, select the media card component to use
   * based on the received `media.__typename`.
   */
  if (media) {
    mediaType = media.__typename
    MediaComponent = mediaComponents[mediaType]
  }

  /**
   * Derive layout type by processing `slice.label`.
   * Will be selected by user in Prismic; four layout labels available:
   *
   * | Prismic Layout Label  | As Received by `<HMBKItemAndText>` |
   * |-----------------------|------------------------------------|
   * | Left: Card -- Text    | `left__card_--_text`               |
   * | Right: Text -- Card   | `right__text_--_card`              |
   */

  if (!label) {
    layoutSide = 'left__card_--_text'
  } else {
    layoutSide = label
  }

  /**
   * Determine the column `className` based on the available data. Similar process to {@link TwoImagesAndText}.
   *
   * **if `text` has value**
   * - `media` is `null`: make text "full" width; `is-11` FHD
   * - `media` data exists : text 8 -- media 3 FHD; 9+3 tablet; mobile full
   *
   * **else: `text === null`**
   * - `media` is `null`: slice doesn't render
   * - `media` exists: media 11 FHD; full tablet and mobile
   */
  if (text) {
    if (!media) {
      textClass = 'column is-11-fullhd is-full-tablet is-full-mobile'
    } else {
      textClass = 'column is-8-fullhd is-9-tablet is-full-mobile'
      columnLayout = 'column is-3-fullhd is-3-tablet is-full-mobile'

      switch (mediaType) {
        case 'PRISMIC_Event':
          componentProps = {
            data: media,
            columnLayout,
          }
          break
        case 'PRISMIC_Mix':
          componentProps = {
            data: media,
            columnLayout,
          }
          break
        case 'PRISMIC_Resident':
          componentProps = {
            resident: media,
          }
          break
        case 'PRISMIC_Feature':
          componentProps = {
            data: media,
            columnLayout,
          }
          break
        default:
          textClass = 'column is-8-fullhd is-9-tablet is-full-mobile'
          columnLayout = 'column is-3-fullhd is-3-tablet is-full-mobile'
      }
    }
  } else {
    if (!media) {
      columnLayout = null
    } else {
      columnLayout = 'column is-3-fullhd is-half-tablet is-full-mobile'
    }
  }
  return (
    (text || media) && (
      <section className="section container is-fullhd is-fluid slice">
        <div className="columns is-mobile is-centered is-multiline">
          {layoutSide === 'left__card_--_text' ? (
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
  )
}

export default HMBKItemAndText
