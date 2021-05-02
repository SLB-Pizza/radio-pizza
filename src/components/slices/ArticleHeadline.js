import React from 'react'
import { RichText } from 'prismic-reactjs'
import {
  ArticleHeadlineCategoryInfo,
  ArticleHeadlinePhotoCredit,
} from '../helpers'
import { FallbackImage } from '../../utils'

/**
 * Renders the Article Headline layout made up of the lead image, feature category and subcategory, and headline.
 * @category CMS Slices
 * @function ArticleHeadline
 * @param {Object} headlineData - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @param {?Boolean} isGuide - when true, changes the hero height to allow for {@link AdminHeader} to be placed above it.
 * @returns {jsx}
 */
export default function ArticleHeadline({ headlineData, isGuide }) {
  const {
    article_headline_img,
    article_category,
    article_subcategory,
    article_headline,
  } = headlineData

  /**
   * Process article category details.
   */
  const categoryDetails = article_category || article_subcategory
  return (
    <header
      className={
        isGuide
          ? 'hero article-header__guide has-background'
          : 'hero article-header has-background'
      }
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
      <div className="hero-foot">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-12">
              {categoryDetails && (
                <ArticleHeadlineCategoryInfo
                  category={article_category}
                  subcategory={article_subcategory}
                />
              )}
              <div className="content">
                {article_headline && (
                  <h1
                    id="article-headline"
                    className="title is-size-1-widescreen is-size-2-desktop is-size-3-touch hero-title"
                  >
                    {RichText.asText(article_headline)}
                  </h1>
                )}
                <ArticleHeadlinePhotoCredit
                  alt={article_headline_img.alt}
                  copyright={article_headline_img.copyright}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
