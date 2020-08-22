import React from "react";
import { RichText } from "prismic-reactjs";
import processPublicationDates from "../../utils/processPublicationDates";

/**
 * @category CMS
 * @subcategory Slices
 * @component
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @param {Object} metadata - data object from Prismic CMS that contains
 * @returns {jsx}
 */
function ArticleHeadline({ slice, metadata }) {
  const {
    article_headline_img,
    article_category,
    article_subcategory,
    article_headline,
    article_subtitle,
    article_author_pic,
    article_author,
  } = slice.primary;

  const { firstPublicationDate, lastPublicationDate } = metadata;
  const { hmbk_staff_name, hmbk_staff_position } = article_author;

  /**
   * Pass the metadata to {@link processPublicationDates}.
   */
  const featureDateDetails = processPublicationDates(
    firstPublicationDate,
    lastPublicationDate
  );

  /**
   * Transform article_category for layout use.
   */
  const allCapsCategory = article_category.toUpperCase();

  /**
   * If the image has copyright info (photo credit):
   *    Image alt text — photo credit
   * If the image doesn't have copyright info:
   *    Image alt text
   */
  const headlinePhotoDetails = article_headline_img.copyright ? (
    <figcaption id="article-headline-image">
      {`${article_headline_img.alt} — ${article_headline_img.copyright}`}
    </figcaption>
  ) : (
    <figcaption id="article-headline-image">
      {article_headline_img.alt}
    </figcaption>
  );

  return (
    <section
      className="hero homepage-hero article-img-titling"
      role="region"
      aria-labelledby="article-headline"
    >
      <div
        className="hero-body"
        aria-labelledby="article-headline-image"
        style={{
          backgroundImage: `url(${article_headline_img.url})`,
        }}
      />
      {headlinePhotoDetails}
      <div className="hero-foot">
        <div className="container article-info">
          <div className="columns is-mobile is-multiline is-vcentered">
            <div className="column is-12">
              <p className="is-size-6-desktop is-size-7-touch">
                {allCapsCategory}
                <span>{" ‣ " + article_subcategory}</span>
              </p>
              <div className="content">
                <h1
                  id="article-headline"
                  className="title is-size-1-widescreen is-size-2-desktop is-size-4-touch"
                >
                  {RichText.asText(article_headline)}
                </h1>

                <h4 className="subtitle is-size-3-widescreen is-size-4-desktop is-size-6-touch">
                  {RichText.asText(article_subtitle)}
                </h4>
              </div>
            </div>
            <div className="column is-narrow">
              <figure className="image is-32x32">
                <img
                  className="is-rounded"
                  src={article_author_pic.url}
                  alt={`${hmbk_staff_name}, ${hmbk_staff_position}`}
                />
              </figure>
            </div>
            <div className="column is-narrow-desktop">
              <p className="subtitle is-size-6-desktop is-size-7-touch">
                {`${hmbk_staff_name}, ${hmbk_staff_position}`}
              </p>
            </div>
            <div className="column is-narrow-desktop">
              {featureDateDetails.hasBeenUpdated ? (
                <p className="subtitle is-size-6-desktop is-size-7-touch">
                  Updated {featureDateDetails.pubDate}
                </p>
              ) : (
                <p className="subtitle is-size-6-desktop is-size-7-touch">
                  {featureDateDetails.pubDate}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArticleHeadline;
