import React from 'react'

/**
 * Render a mix's image when `globalState.playing` is true.
 * @category Layout Helper
 * @function RecordedMixPlayerImage
 * @param {Boolean} isLoading
 * @param {String} imgURL
 * @param {String} imgAltText
 * @returns {jsx}
 */
export default function RecordedMixPlayerImage({
  isLoading,
  imgURL,
  imgAltText,
}) {
  return (
    <div
      className={
        isLoading
          ? 'column is-narrow is-hidden-mobile mix-data'
          : 'column is-narrow is-hidden-mobile mix-data is-loaded'
      }
    >
      <figure className="image is-48x48">
        <img src={imgURL} alt={imgAltText} className="lazyload" />
      </figure>
    </div>
  )
}
