import React from 'react'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'

/**
 * @category CMS Slices
 * @function FullWidthImage
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @param {Object} metadata - data object from Prismic CMS that contains
 * @returns {jsx}
 */
function FullWidthImage({ slice }) {
  const { label, primary } = slice
  const { full_width_image, fwi_titling } = primary

  let layoutType, heroClassName, imgURL

  if (!label) {
    layoutType = 'medium'
  } else {
    layoutType = label
  }

  switch (layoutType) {
    case 'medium':
      heroClassName = 'hero has-background is-fwi is-medium slice debug'
      imgURL = full_width_image.medium.url
      break
    case 'halfpage':
      heroClassName = 'hero has-background is-fwi-halfpage slice debug'
      imgURL = full_width_image.halfheight.url
      break
    case 'fullpage':
      heroClassName = 'hero has-background is-fwi-fullpage slice debug'
      imgURL = full_width_image.url
      break
    default:
      heroClassName = 'hero is-medium slice debug'
  }

  return imgURL ? (
    <section className={heroClassName}>
      <img
        className="hero-background"
        src={imgURL}
        alt={full_width_image.alt}
      />
      <div className="hero-body">
        {fwi_titling && (
          <div className="container">
            <div className="columns">
              <div className="column is-full">
                <div className="content">
                  {
                    <p className="title hero-title is-1">
                      {RichText.asText(fwi_titling)}
                    </p>
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  ) : null
}

export default FullWidthImage
