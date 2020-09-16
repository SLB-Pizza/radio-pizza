import React from "react";
import { RichText } from "prismic-reactjs";
import processPublicationDates from "../../utils/processPublicationDates";

/**
 * @category CMS
 * @subcategory Slices
 * @function
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @param {Object} metadata - data object from Prismic CMS that contains
 * @returns {jsx}
 */
function HeadlineBlock({ slice, metadata }) {
  /**
   * @namespace
   * @memberof slice
   */
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
   * Pass the metadaa to {@link processPublicationDates}.
   */
  const featureDateDetails = processPublicationDates(
    firstPublicationDate,
    lastPublicationDate
  );

  /**
   * Transform article_category for layout use.
   */
  const allCapsCategory = article_category.toUpperCase();

  return (
    <section
      className="hero"
      role="region"
      aria-labelledby="article-heading"
      style={{ backgroundColor: "blue" }}
    >
      <div
        className="hero-body headline-block"
        style={{
          backgroundImage: `url(${article_headline_img.url})`,
        }}
      >
        <div className="container">
          <div className="columns">
            <div className="column">
              <p className="is-size-6-desktop is-size-7-touch has-text-centered category">
                {allCapsCategory}
                <span>{" ‣ " + article_subcategory}</span>
              </p>
              <div className="content">
                <h1
                  id="article-headline"
                  className="title is-size-1-widescreen is-size-2-desktop is-size-3-tablet is-size-4-mobile has-text-centered"
                >
                  {RichText.asText(article_headline)}
                </h1>

                <h3 className="subtitle is-size-4-desktop is-size-6-touch has-text-centered">
                  {RichText.asText(article_subtitle)}
                </h3>
                <hr />
                <div className="columns is-centered is-vcentered">
                  <div className="column is-narrow">
                    <figure className="image is-48x48">
                      <img
                        className="is-rounded"
                        src={article_author_pic.url}
                        alt={`${hmbk_staff_name}, ${hmbk_staff_position}`}
                      />
                    </figure>
                  </div>
                  <div className="column is-narrow">
                    <p className="has-text-centered">
                      {hmbk_staff_name}
                      {", "}
                      <em>{hmbk_staff_position}</em>
                    </p>
                  </div>
                  <div className="column is-narrow">
                    {featureDateDetails.hasBeenUpdated ? (
                      <p>Updated {featureDateDetails.pubDate}</p>
                    ) : (
                      <p>{featureDateDetails.pubDate}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeadlineBlock;
