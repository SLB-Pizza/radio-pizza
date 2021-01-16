import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Link } from 'gatsby'
import { linkResolver } from '../utils'

function MainFeatureArticle({ articleData }) {
  const { _meta, headline_block } = articleData
  const {
    article_headline,
    article_subtitle,
    article_category,
    article_subcategory,
  } = headline_block[0].primary

  const linkTo = { type: _meta.type, uid: _meta.uid }
  return (
    <div className="columns main-feature">
      <div className="column is-5">
        <Link to={linkResolver(linkTo)}>
          <div className="lead-details border-color">
            <span className="tag is-outlined is-rounded is-black">
              {`${article_category} ‣ ${article_subcategory}`}
            </span>
            <h1 className="title">{RichText.asText(article_headline)}</h1>
            <h2 className="subtitle">{RichText.asText(article_subtitle)}</h2>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default MainFeatureArticle
