import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Link } from 'gatsby'
import NanoClamp from 'nanoclamp'

import { FallbackImage } from '../utils'
import { formatDateTime, linkResolver } from '../utils'

/**
 * Returns a Feature card layout used on the homepage, single /resident focus page, and the /features landing page
 * @category Media Card
 * @function SingleFeatureCard
 * @param {Object} data - data used to fill out an Editorial card
 * @param {String} [columnLayout="column"] - string dictating column
 * @returns {jsx}
 */
function SingleFeatureCard({ columnLayout = 'column', data }) {
  const { header, _meta } = data

  const { lastPublicationDate, type, uid } = _meta

  const {
    article_headline_img,
    article_headline,
    article_subtitle,
    article_subcategory,
  } = header[0].primary

  const linkData = {
    type,
    uid,
  }

  const articleDate = formatDateTime(lastPublicationDate, 'year-month-day')

  return (
    <article className={columnLayout}>
      <Link to={linkResolver(linkData)}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-16by9">
              {article_headline_img ? (
                <img
                  className="lazyload"
                  src={article_headline_img.tablet.url}
                  alt={article_headline_img.tablet.alt}
                />
              ) : (
                <FallbackImage styleName="lazyload" />
              )}
            </figure>
          </div>
          <div className="card-content">
            <div className="feature-card-sizing">
              <div className="details">
                {articleDate && (
                  <NanoClamp
                    className="subtitle is-size-7 has-text-grey-lighter"
                    is="p"
                    lines={1}
                    text={
                      article_subcategory
                        ? `${articleDate} | ${article_subcategory}`
                        : articleDate
                    }
                  />
                )}

                {article_headline && (
                  <NanoClamp
                    className="title is-size-6"
                    is="p"
                    lines={2}
                    text={RichText.asText(article_headline)}
                  />
                )}
              </div>

              {article_subtitle && (
                <NanoClamp
                  className="blurb is-size-6 has-text-white"
                  is="p"
                  lines={3}
                  ellipsis={'...'}
                  text={RichText.asText(article_subtitle)}
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default SingleFeatureCard
