import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Link } from 'gatsby'
import { formatDateTime, linkResolver } from '../utils'

function SingleFeatureCard({ featureColumnLayout, featureData }) {
  const { headline_block, _meta } = featureData

  const { lastPublicationDate, type, uid } = _meta

  const {
    article_headline_img,
    article_headline,
    article_subtitle,
    article_subcategory,
  } = headline_block[0].primary

  const linkData = {
    type,
    uid,
  }

  const articleDate = formatDateTime(lastPublicationDate, 'year-month-day')

  return (
    <article className={featureColumnLayout}>
      <Link to={linkResolver(linkData)}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-16by9">
              <img
                src={article_headline_img.tablet.url}
                alt={article_headline_img.tablet.alt}
              />
            </figure>
          </div>
          <div className="card-content">
            {/* <pre>{JSON.stringify(featureData, null, 2)}</pre> */}
            <p className="content-date text-truncate subtitle is-size-7">
              {articleDate} | {article_subcategory}
            </p>
            <p className="title is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
              {RichText.asText(article_headline)}
            </p>
            <p className="subtitle is-size-7-mobile is-size-6-tablet">
              {RichText.asText(article_subtitle)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default SingleFeatureCard
