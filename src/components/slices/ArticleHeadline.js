import React from 'react'
import { RichText } from 'prismic-reactjs'
import { FallbackImage } from '../../utils'

/**
 * Renders the Article Headline layout made up of the lead image, feature category and subcategory, and headline.
 * @category CMS Slices
 * @function ArticleHeadline
 * @param {Object} headlineData - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function ArticleHeadline({ headlineData }) {
  const {
    article_headline_img,
    article_category,
    article_subcategory,
    article_headline,
  } = headlineData.primary

  /**
   * Process article category details.
   */
  let categoryDetails
  if (article_category) {
    if (article_subcategory) {
      categoryDetails = `${article_category} ‣ ${article_subcategory}`
    } else {
      categoryDetails = `${article_category}`
    }
  }

  /**
   * If the image has copyright info (photo credit):
   *    Image alt text — photo credit
   * If the image doesn't have copyright info:
   *    Image alt text
   */
  const headlinePhotoDetails = article_headline_img.copyright ? (
    <figcaption className="credit" id="article-headline-image">
      {`${article_headline_img.alt} — ${article_headline_img.copyright}`}
    </figcaption>
  ) : (
    <figcaption className="credit" id="article-headline-image">
      {article_headline_img.alt}
    </figcaption>
  )

  return (
    <header
      className="hero article-header has-background"
      aria-labelledby="article-headline"
    >
      {article_headline_img ? (
        <img
          className="hero-background"
          src={article_headline_img.url}
          alt={article_headline_img.alt}
        />
      ) : (
        <FallbackImage styleName="hero-background" />
      )}
      <div className="footer-gradient is-overlay" />
      <div className="hero-foot">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-12">
              {categoryDetails && (
                <p className="is-size-6-desktop is-size-7-touch article-category">
                  {categoryDetails}
                </p>
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
                {headlinePhotoDetails}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ArticleHeadline
