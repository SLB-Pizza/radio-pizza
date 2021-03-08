import React from 'react'
import { RichText } from 'prismic-reactjs'
import getBlockquoteStyling from '../../utils/getBlockquoteStyling'

/**
 * @category CMS Slices
 * @function Blockquote
 * @param {Object} slice - the data object coming from Prismic CMS that contains all data needed to create the Blockquote slice
 * @prop {String} slice.primary.blockquote_type
 * @prop {Object[]} slice.primary.blockquote_text - Array of paragraph objects containing the quote's text that is passed into RichText.render() inside the blockquote element
 * @prop {Object[]} slice.primary.blockquote_attribution - Array of paragraph objects containing quote attribution details that is passed into RichText.render() inside the cite element
 * @prop {String} slice.primary.blockquote_bg_img.url - the URL from Prismic of background image injected the section element
 * @prop {String} slice.primary.blockquote_bg_img.alt - the alt text from Prismic of background image injected the section element
 * @returns {jsx}
 */

function Blockquote({ slice }) {
  const { label, primary } = slice
  const {
    blockquote_type,
    blockquote_text,
    blockquote_attribution,
    blockquote_bg_img,
  } = primary

  console.log(label) // light__light-color_background_image__black_quote_text

  let layoutType
  let blockquoteClass = 'is-size-1-desktop is-size-3-tablet is-size-4-mobile'
  let citeClass =
    'is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-right'

  if (!label) {
    layoutType = 'none'
  } else {
    layoutType = label.split('__')[0].toLowerCase()
  }

  switch (layoutType) {
    case 'none':
      blockquoteClass += ''
      citeClass += ''
      break
    case 'light':
      blockquoteClass += ' light-bg'
      citeClass += ' has-text-white'
      break
    case 'dark':
      blockquoteClass += ' dark-bg'
      citeClass += ''
      break
    default:
      blockquoteClass = ''
      citeClass = ''
  }

  /**
   * Pass the type and the bg_type objects to {@link getBlockquoteStyling} to derive styling.
   */
  // const blockquoteStyling = getBlockquoteStyling(
  //   blockquote_type,
  //   blockquote_bg_img
  // );

  // console.log("attr", blockquote_attribution);
  return (
    <section className="hero is-medium is-blockquote debug">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-full">
              <div className="content">
                {/* {blockquote_text && (
                  <blockquote className={blockquoteClass}>
                    {RichText.render(blockquote_text)}
                  </blockquote>
                )} */}
                <blockquote className={blockquoteClass}>
                  <p>Short Quote</p>
                </blockquote>
                {blockquote_attribution && (
                  <cite className={citeClass}>
                    {RichText.asText(blockquote_attribution)}
                  </cite>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blockquote
