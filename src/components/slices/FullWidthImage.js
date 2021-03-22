import React from 'react'

/**
 * @category CMS Slices
 * @function FullWidthImage
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function FullWidthImage({ slice }) {
  const { label, primary } = slice
  let { full_width_image } = primary

  let layoutType, heroClassName, imgURL

  if (!label) {
    layoutType = 'medium'
  } else {
    layoutType = label
  }

  switch (layoutType) {
    case 'medium':
      heroClassName = 'hero has-background is-fwi-quarterpage'
      imgURL = full_width_image.small.url
      break
    case 'halfpage':
      heroClassName = 'hero has-background is-fwi-halfpage'
      imgURL = full_width_image.medium.url
      break
    case 'fullpage':
      heroClassName = 'hero has-background is-fwi-fullpage'
      imgURL = full_width_image.url
      break
    default:
      heroClassName = 'hero has-background is-fwi-quarterpage'
  }

  return imgURL ? (
    <section className={heroClassName}>
      <img
        className="hero-background"
        src={imgURL}
        alt={full_width_image.alt}
      />
    </section>
  ) : null
}

export default FullWidthImage
