import React from 'react'
import { FallbackImage } from '../utils'

/**
 * Render the image for an Event template page.
 * @category Layout Helper
 * @function EventTemplateImageHeader
 * @param {Object.<String>} eventImage - object containing image data from Prismic
 * @returns {jsx}
 */
export default function EventTemplateImageHeader({ eventImage }) {
  return (
    <header className="hero has-background event-image">
      {eventImage ? (
        <img
          className="hero-background blurred-bg lazyload"
          src={eventImage.url}
          alt={eventImage.alt}
        />
      ) : (
        <FallbackImage styleName={'hero-background'} />
      )}
      <div className="hero-body is-overlay">
        <div className="bg-gradient is-overlay" />
        <figure className="overlay-image">
          {eventImage ? (
            <>
              <a className="is-overlay" href={eventImage.url} target="_blank" />
              <img
                className="lazyload"
                src={eventImage.url}
                alt={eventImage.alt}
              />
            </>
          ) : (
            <FallbackImage styleName="lazyload" />
          )}
        </figure>
      </div>
    </header>
  )
}
