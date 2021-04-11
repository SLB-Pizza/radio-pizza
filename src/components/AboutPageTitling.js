import React from 'react'
import { RichText } from 'prismic-reactjs'
import { FallbackImage } from '../utils'

/**
 * Render the bottom-quarter of the {@link AboutIndexPage}, where the titling and tagline appear.
 * @category Layout Helper
 * @function AboutPageTitling
 * @param {Object} aboutTitling
 * @returns {jsx}
 */
export default function AboutPageTitling({ aboutTitling }) {
  const { article_subtitle, article_headline } = aboutTitling

  return (
    <section className="container about-titling">
      <div className="columns is-centered is-vcentered">
        <div className="column is-narrow">
          <figure className="image is-128x128">
            <FallbackImage styleName={'lazyload'} />
          </figure>
        </div>
        <div className="column is-narrow">
          <h1 className="title is-size-1-widescreen is-size-2-desktop is-size-3-touch">
            {article_headline
              ? RichText.asText(article_headline)
              : 'HalfmoonBK'}
          </h1>
          <p className="subtitle is-size-3-widescreen is-size-4-desktop is-size-5-touch">
            {article_subtitle
              ? RichText.asText(article_subtitle)
              : 'Ears to the concrete.'}
          </p>
        </div>
      </div>
    </section>
  )
}
