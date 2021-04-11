import React from 'react'
import { FallbackImage } from '../utils'

/**
 * Renders a stripped down version of {@link ArticleHeadline}; called on {@link AboutIndexPage}.
 * @category Layout Helper
 * @function AboutPageHero
 * @param {Object} headlineData - data object from Prismic CMS that contains all content data needed to create the AboutPageHero
 * @returns {jsx}
 */
export default function AboutPageHero({ headlineData }) {
  const { article_headline_img } = headlineData

  return (
    <header
      className="hero about-page has-background"
      aria-labelledby="article-headline"
    >
      {article_headline_img ? (
        <img
          className="hero-background lazyload"
          src={article_headline_img.url}
          alt={article_headline_img.alt}
        />
      ) : (
        <FallbackImage styleName="hero-background lazyload" />
      )}
      <div className="footer-gradient is-overlay" />
    </header>
  )
}
