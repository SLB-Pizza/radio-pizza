import React from 'react'

/**
 * Return a modal to use with images that only have one image size.
 * @category Layout Helper
 * @param {String} imgURL
 * @param {?String} alt - the alt text for the image
 * @param {?String} copyright - the copyright text for the image
 * @param {Function} setOpenFunc - function to toggle the visibility of this image modal
 * @returns {jsx}
 */
export default function OneSizeImageModal({
  imgURL,
  alt,
  copyright,
  setOpenFunc,
}) {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => setOpenFunc(false)} />
      <div className="modal-content" aria-label={alt ? alt : 'article image'}>
        <div className="columns">
          <div className="column img-area">
            <figure className="image">
              <img
                className="has-ratio lazyload inline-image"
                src={imgURL}
                alt={alt || 'article image'}
              />
              {alt && <figcaption className="credit">{alt}</figcaption>}
              {copyright && (
                <figcaption className="credit">{copyright}</figcaption>
              )}
            </figure>
          </div>
          <button
            className="modal-close is-large"
            tabIndex="0"
            aria-label="close"
            onClick={() => setOpenFunc(false)}
          />
        </div>
      </div>
    </div>
  )
}
