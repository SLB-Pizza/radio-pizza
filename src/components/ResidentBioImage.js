import React from 'react'
import { FallbackImage, ResponsiveImage } from '../utils'

/**
 * Renders the resident image for {@link ResidentBio}.
 * @category Layout Helper
 * @function ResidentBioImage
 * @param {Object} resIMGObj
 * @returns {jsx}
 */
export default function ResidentBioImage({ resIMGObj }) {
  if (resIMGObj) {
    const fullSizeImg = {
      alt: resIMGObj.alt,
      photoCredit: resIMGObj.copyright,
      url: resIMGObj.url,
      dimensions: resIMGObj.dimensions,
    }

    const responsiveSizes = {
      widescreen: resIMGObj.widescreen,
      desktop: resIMGObj.desktop,
      tablet: resIMGObj.tablet,
      mobile: resIMGObj.mobile,
      lo_fi: resIMGObj.lo_fi,
    }

    return (
      <ResponsiveImage
        largestImg={fullSizeImg}
        responsiveData={responsiveSizes}
      />
    )
  }

  return <FallbackImage className="lazyload" alt={'HMBK Resident'} />
}
