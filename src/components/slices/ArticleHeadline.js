import React from 'react'
import { RichText } from 'prismic-reactjs'
import { processPublicationDates } from '../../utils'

/**
 * @category CMS Slices
 * @function ArticleHeadline
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @param {Object} metadata - data object from Prismic CMS that contains the date publication for the HeadlineBlock slice
 * @returns {jsx}
 */
function ArticleHeadline({ headlineData, metadata }) {
  const {
    article_headline_img,
    article_category,
    article_subcategory,
    article_headline,
    article_author_pic,
    article_author,
  } = headlineData.primary

  const { firstPublicationDate, lastPublicationDate } = metadata

  // Boolean used to short circuit author details.
  const hasAuthorDetails = article_author && article_author_pic

  /**
   * Pass the metadata to {@link processPublicationDates}.
   */
  const featureDateDetails = processPublicationDates(
    firstPublicationDate,
    lastPublicationDate
  )

  /**
   * Transform article_category for layout use.
   */
  const allCapsCategory = article_category.toUpperCase()

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
      <img
        className="hero-background"
        src={article_headline_img.url}
        alt={article_headline_img.alt}
      />
      <div className="is-overlay" />
      {headlinePhotoDetails}
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
                    className="title is-size-1-widescreen is-size-4-desktop is-size-5-touch hero-title"
                  >
                    {RichText.asText(article_headline)}
                  </h1>
                )}
              </div>
              {/* </div>

              {/* {hasAuthorDetails && (
              <div className="column is-narrow-desktop">
                <p className="subtitle is-size-6-desktop is-size-7-touch">
                  {`${article_author.hmbk_staff_name}, ${article_author.hmbk_staff_position}`}
                </p>
              </div>
            )} */}
              {/* <div className="column is-narrow-desktop">
              {featureDateDetails.hasBeenUpdated ? (
                <p className="subtitle is-size-6-desktop is-size-7-touch">
                  Updated
                  <time dateTime={lastPublicationDate}>
                    {featureDateDetails.pubDate}
                  </time>
                </p>
              ) : (
                <p className="subtitle is-size-6-desktop is-size-7-touch">
                  <time dateTime={firstPublicationDate}>
                    {featureDateDetails.pubDate}
                  </time>
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ArticleHeadline
