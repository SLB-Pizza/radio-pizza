import React from 'react'
import { RichText } from 'prismic-reactjs'
import { ArticleAuthorDetails, ArticleDateTime } from './helpers'

/**
 * Renders a single feature's subtitle, byline and date of first publication or last update.
 * @category Layout Helper
 * @function ArticleByline
 * @param {Object[]} subtitle -  article_subtitle from the {@link FeatureTemplate} Gatsby query; Prismic RichText array
 * @param {Object} dates - dates from the Feature's metadata
 * @param {Object.<String, String|Object>} authorDetails - details from Prismic Staff about author
 * @returns {jsx}
 */
function ArticleByline({ subtitle, dates, authorDetails }) {
  return (
    <section className="section container">
      {subtitle && (
        <div className="columns is-multiline is-vcentered">
          <div className="column is-12 content">
            <p className="subtitle is-size-3-widescreen is-size-4-desktop is-size-5-touch">
              {RichText.asText(subtitle)}
            </p>
          </div>

          {authorDetails && (
            <div className="column">
              <ArticleAuthorDetails authorDetails={authorDetails} />
            </div>
          )}
          <div className="column is-narrow">
            {dates && <ArticleDateTime dates={dates} />}
          </div>
        </div>
      )}
    </section>
  )
}

export default ArticleByline
