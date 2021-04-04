import React from 'react'
import { FallbackImage } from '../utils'

/**
 * Render the image for an Event template page.
 * @category Layout Helper
 * @function ContainedImageHero
 * @param {Object.<String>} image - object containing image data from Prismic
 * @param {Boolean} isHeader - dictates whether to use make a header element or a section element
 * @returns {jsx}
 */
export default function ContainedImageHero({ image, isHeader }) {
  const { url, alt, copyright } = image

  return isHeader ? (
    <>
      <header className="hero has-background contained-image">
        {image ? (
          <img
            className="hero-background blurred-bg lazyload"
            src={url}
            alt={alt}
          />
        ) : (
          <FallbackImage styleName={'hero-background'} />
        )}
        <div className="hero-body is-overlay">
          <div className="bg-gradient is-overlay" />
          <figure className="overlay-image">
            {image ? (
              <a href={url} target="_blank">
                <img className="lazyload" src={url} alt={alt} />
              </a>
            ) : (
              <FallbackImage styleName="lazyload" />
            )}
          </figure>
        </div>
      </header>
      {alt && <figcaption className="credit">{alt}</figcaption>}
      {copyright && <figcaption className="credit">{copyright}</figcaption>}
    </>
  ) : (
    <>
      <section className="hero has-background contained-image">
        {image ? (
          <img
            className="hero-background blurred-bg lazyload"
            src={url}
            alt={alt}
          />
        ) : (
          <FallbackImage styleName={'hero-background'} />
        )}
        <div className="hero-body is-overlay">
          <div className="bg-gradient is-overlay" />
          <figure className="overlay-image">
            {image ? (
              <a href={url} target="_blank">
                <img className="lazyload" src={url} alt={alt} />
              </a>
            ) : (
              <FallbackImage styleName="lazyload" />
            )}
          </figure>
        </div>
      </section>
      {alt && <figcaption className="credit">{alt}</figcaption>}
      {copyright && <figcaption className="credit">{copyright}</figcaption>}
    </>
  )
}
