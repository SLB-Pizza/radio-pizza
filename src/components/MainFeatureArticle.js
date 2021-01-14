import React from 'react'
import { RichText } from 'prismic-reactjs'

function MainFeatureArticle({ articleData }) {
  const { _meta, headline_block } = articleData
  const {
    article_headline,
    article_subtitle,
    article_category,
    article_subcategory,
  } = headline_block[0].primary

  return (
    <div className="columns main-feature">
      <div className="column is-4">
        <span class="tag is-black">{article_category}</span>
        <div className="feature-titling">
          <h1 className="title hero-title">
            {RichText.asText(article_headline)}
          </h1>
          <h2 className="subtitle">{RichText.asText(article_subtitle)}</h2>
          <button className="button is-rounded is-black">Text</button>
        </div>
      </div>
    </div>
  )
}

export default MainFeatureArticle
