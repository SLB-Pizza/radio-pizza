import React from 'react'
import { FallbackImage, ResponsiveImage } from '../utils'

/**
 * Renders a stripped down version of {@link ArticleHeadline}; called on {@link AboutIndexPage}.
 * @category Layout Helper
 * @function AboutPageHero
 * @param {Object} headlineData - data object from Prismic CMS that contains all content data needed to create the AboutPageHero
 * @returns {jsx}
 */
export default function AboutPageHero({ aboutHeroIMG }) {
  let fullSizeImg, responsiveSizes
  if (aboutHeroIMG) {
    fullSizeImg = {
      alt: aboutHeroIMG.alt,
      photoCredit: aboutHeroIMG.copyright,
      url: aboutHeroIMG.url,
      dimensions: aboutHeroIMG.dimensions,
    }

    responsiveSizes = {
      widescreen: aboutHeroIMG.widescreen,
      desktop: aboutHeroIMG.desktop,
      tablet: aboutHeroIMG.tablet,
      mobile: aboutHeroIMG.mobile,
      lo_fi: aboutHeroIMG.lo_fi,
    }
  }

  return (
    <header
      className="hero about-page has-background"
      aria-labelledby="article-headline"
    >
      {aboutHeroIMG ? (
        <ResponsiveImage
          largestImg={fullSizeImg}
          responsiveData={responsiveSizes}
          isHeroIMG={true}
        />
      ) : (
        <FallbackImage styleName="hero-background lazyload" />
      )}
      <div className="footer-gradient is-overlay" />
    </header>
  )
}
