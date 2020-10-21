import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import NanoClamp from 'nanoclamp'

import {
  linkResolver,
  processPublicationDates,
  ResponsiveImage,
} from '../utils'

/**
 * @category Utilities
 * @subcategory Layout Helper
 * @function LandingPageElement
 * @param {Object} props
 * @returns {jsx}
 */
function LandingPageElement({ pageElement, layout, imageAspectRatio }) {
  const { _meta, body } = pageElement.node

  const { type, uid, firstPublicationDate, lastPublicationDate } = _meta
  const linkTo = {
    type,
    uid,
  }
  const pageElementDateDetails = processPublicationDates(
    firstPublicationDate,
    lastPublicationDate
  )

  const {
    article_headline_img,
    article_headline,
    article_subtitle,
    article_subcategory,
  } = body[0].primary

  const fullSizeImg = {
    alt: article_headline_img.alt,
    photoCredit: article_headline_img.copyright,
    url: article_headline_img.url,
    dimensions: article_headline_img.dimensions,
  }

  const responsiveSizes = {
    widescreen: article_headline_img.widescreen,
    desktop: article_headline_img.desktop,
    tablet: article_headline_img.tablet,
    mobile: article_headline_img.mobile,
    lo_fi: article_headline_img.lo_fi_placeholder,
  }

  return (
    <article className={layout}>
      <Link to={linkResolver(linkTo)}>
        <div className="card">
          <div className="card-image">
            <figure className={imageAspectRatio}>
              <ResponsiveImage
                largestImg={fullSizeImg}
                responsiveData={responsiveSizes}
              />
            </figure>
          </div>

          <div className="card-content">
            <div className="main-text">
              <div className="details">
                <p className="subtitle is-size-7 text-truncate has-text-grey-lighter">
                  {pageElementDateDetails.hasBeenUpdated ? (
                    <time dateTime={lastPublicationDate}>
                      {`${article_subcategory} | Updated ${pageElementDateDetails.pubDate}`}
                    </time>
                  ) : (
                    <time dateTime={firstPublicationDate}>
                      {`${article_subcategory} | ${pageElementDateDetails.pubDate}`}
                    </time>
                  )}
                </p>
                <NanoClamp
                  className="title is-size-4-desktop is-size-5-touch"
                  id="article-headline"
                  is="h1"
                  text={RichText.asText(article_headline)}
                />
              </div>
              <NanoClamp
                className="blurb has-text-white is-size-6-desktop is-size-7-touch"
                is="p"
                text={RichText.asText(article_subtitle)}
              />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default LandingPageElement
