import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Link } from 'gatsby'
import { linkResolver } from '../utils'

function SingleFeatureCard({ metadata, body }) {
  const {
    article_headline_img,
    article_category,
    article_headline,
    article_subtitle,
  } = body[0].primary

  const { lastPublicationDate, type, uid, ...rest } = metadata
  const linkData = {
    type,
    uid,
  }

  return (
    <div className="column is-9-mobile is-6-tablet">
      <Link to={linkResolver(linkData)}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-16by9">
              <img
                src={article_headline_img.url}
                alt={article_headline_img.alt}
              />
            </figure>
          </div>
          <div className="card-content">
            <p className="content-date text-truncate subtitle is-size-7">
              {lastPublicationDate} | {article_category}
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
    </div>
  )
}

export default SingleFeatureCard
