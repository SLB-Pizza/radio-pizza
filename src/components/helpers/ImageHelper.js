import React, { useState } from 'react'
import { ImageModal, ResponsiveImage } from '../../utils'
/**
 * Creates a JSX segment that CMS Slices call on to format images. Its text counterpart is {@link RichTextHelper}. Called upon by {@link ResponsiveImage}
 *
 * **CMS Slices passing this prop**
 * - {@link OneImageAndText}
 * - {@link TwoImagesAndText}
 *
 * **CMS Slices NOT passing this prop**
 * - {@link ImageRow}
 * @category Layout Helper
 * @function ImageHelper
 * @param {?String} columnSizing - optional string prop dictating specific column layouts.
 * @param {Object.<String, *>} imageData - contains all image data from Prismic about the image.
 * @returns {jsx}
 */
function ImageHelper({ columnSizing, imageData }) {
  const [imgModalOpen, setImgModalOpen] = useState(false)

  const defaultImageClass = 'column is-12-mobile'

  /**
   * If a columnSizing prop was passed in, use that prop value.
   * Else, use the defaultImageClass defined above.
   */
  const imageColumnClass = columnSizing ? columnSizing : defaultImageClass

  /**
   * {String} fullSizeImg.url - link from Prismic CMS to the image from the media library
   * {String} fullSizeImg.alt - contains image caption data that's used for accessibility purposes too; comes from Prismic CMS. Its default value should be set when the image is **first uploaded** to the CMS Media Library. A different fullSizeImg.alt value, aka image caption, can be set when the image is selected for use in an article
   * {String} fullSizeImg.photoCredit - contains image credit data; comes from Prismic CMS. Should be set when the image is **first uploaded** to the CMS Media Library
   */
  const fullSizeImg = {
    alt: imageData.alt,
    photoCredit: imageData.copyright,
    url: imageData.url,
    dimensions: imageData.dimensions,
  }

  const responsiveSizes = {
    widescreen: imageData.widescreen,
    desktop: imageData.desktop,
    tablet: imageData.tablet,
    mobile: imageData.mobile,
    lo_fi: imageData.lo_fi_placeholder,
  }

  return (
    <div className={`${imageColumnClass}`}>
      <figure
        className="image has-ratio feature-img"
        onClick={() => setImgModalOpen(true)}
        tabIndex="0"
        aria-labelledby={
          fullSizeImg.alt ? fullSizeImg.alt : fullSizeImg.photoCredit
        }
      >
        <ResponsiveImage
          largestImg={fullSizeImg}
          responsiveData={responsiveSizes}
        />
        {fullSizeImg.alt && (
          <figcaption className="credit">{fullSizeImg.alt}</figcaption>
        )}
        {fullSizeImg.photoCredit && (
          <figcaption className="credit">{fullSizeImg.photoCredit}</figcaption>
        )}
      </figure>

      {imgModalOpen ? (
        <ImageModal
          fullSizeImg={fullSizeImg}
          responsiveData={responsiveSizes}
          setImgModalOpen={setImgModalOpen}
        />
      ) : null}
    </div>
  )
}

export default ImageHelper
