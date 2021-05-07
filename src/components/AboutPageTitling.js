import React from 'react'
import { FallbackImage } from '../utils'

/**
 * Render the bottom-quarter of the {@link AboutIndexPage}, where the titling and tagline appear.
 * @category Layout Helper
 * @function AboutPageTitling
 * @param {Object} aboutTitling
 * @returns {jsx}
 */
export default function AboutPageTitling({ siteTitle, tagline }) {
  return (
    <section className="container about-titling">
      <div className="columns is-mobile is-centered is-vcentered">
        <div className="column is-narrow">
          <figure className="image is-96x96">
            <FallbackImage styleName={'lazyload'} />
          </figure>
        </div>
        <div className="column is-narrow">
          <h1 className="title is-size-1-widescreen is-size-2-desktop is-size-3-tablet is-size-5-mobile">
            {siteTitle ? siteTitle : 'Half Moon'}
          </h1>
          <p className="subtitle is-size-3-widescreen is-size-4-desktop is-size-5-tablet is-size-7-mobile">
            {tagline ? tagline : 'Ears to the concrete.'}
          </p>
        </div>
      </div>
    </section>
  )
}
