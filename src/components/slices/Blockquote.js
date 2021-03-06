import React from 'react'
import { RichText } from 'prismic-reactjs'

/**
 * Renders a CMS slice that display a blockquote, who said it, and a background image.
 * @category CMS Slices
 * @function Blockquote
 * @param {Object} slice - the data object coming from Prismic CMS that contains all data needed to create the Blockquote slice
 * @prop {Object[]} slice.primary.blockquote_text - Array of paragraph objects containing the quote's text that is passed into RichText.render() inside the blockquote element
 * @prop {Object[]} slice.primary.blockquote_attribution - Array of paragraph objects containing quote attribution details that is passed into RichText.render() inside the cite element
 * @prop {?String} slice.primary.blockquote_bg_img.url - the URL from Prismic of background image injected the section element
 * @prop {?String} slice.primary.blockquote_bg_img.alt - the alt text from Prismic of background image injected the section element
 * @returns {jsx}
 */

function Blockquote({ slice }) {
  const { label, primary } = slice
  let {
    blockquote_text: text,
    blockquote_attribution: attribution,
    blockquote_bg_img: image,
  } = primary

  let layoutType
  let heroClass = 'hero is-medium is-blockquote'
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
      heroClass += ' has-background'
      blockquoteClass += ' light-bg hero-title'
      citeClass += ' hero-title cite'
      break
    case 'dark':
      heroClass += ' has-background'
      blockquoteClass += ' dark-bg hero-title'
      citeClass += ' hero-title cite'
      break
    default:
      blockquoteClass = ''
      citeClass = ''
  }

  return (
    <section className={heroClass}>
      {layoutType !== 'none' && image && (
        <img className="hero-background" src={image.url} alt={image.alt} />
      )}

      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-full">
              <div className="content">
                {text && (
                  <blockquote className={blockquoteClass}>
                    {RichText.render(text)}
                  </blockquote>
                )}
                {attribution && (
                  <cite className={citeClass}>
                    {RichText.asText(attribution)}
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
