import React from 'react'
import { ResponsiveImage } from './index'

/**
 * Creates an Image Modal; called by {@link ImageHelper}.
 *
 * **CMS Slices passing `columnSizing`**
 * - {@link OneImageAndText}
 * - {@link TwoImagesAndText}
 *
 * **CMS Slices NOT passing `columnSizing`**
 * - {@link ImageRow}
 *
 * @category Layout Helper
 * @function ImageModal
 * @param {?String} columnClassName - optional string prop dictating specific column layouts.
 * @param {Object.<String, String>} fullSizeImg - object containing image data
 * @prop {String} fullSizeImg.url - link from Prismic CMS to the image from the media library
 * @prop {String} fullSizeImg.alt - contains image caption data that's used for accessibility purposes too; comes from Prismic CMS. Its default value should be set when the image is **first uploaded** to the CMS Media Library. A different fullSizeImg.alt value, aka image caption, can be set when the image is selected for use in an article
 * @prop {String} fullSizeImg.photoCredit - contains image credit data; comes from Prismic CMS. Should be set when the image is **first uploaded** to the CMS Media Library
 * @returns {jsx}
 */
function ImageModal({ fullSizeImg, responsiveData, setImgModalOpen }) {
  const { alt, photoCredit } = fullSizeImg

  let photoDescription = ''
  if (alt) {
    photoDescription += alt
    if (photoCredit) {
      photoDescription += ` by ${photoCredit}`
    }
  }

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        onClick={() => setImgModalOpen(false)}
      />
      <div
        className="modal-content"
        aria-label={photoDescription ? photoDescription : 'article image'}
      >
        <div className="columns">
          <div className="column img-area">
            <figure className="image has-ratio">
              <ResponsiveImage
                largestImg={fullSizeImg}
                responsiveData={responsiveData}
              />
              {photoDescription && (
                <figcaption className="subtitle credit">
                  {photoDescription}
                </figcaption>
              )}
            </figure>
          </div>
          <button
            className="modal-close is-large"
            tabIndex="0"
            aria-label="close"
            onClick={() => setImgModalOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageModal
