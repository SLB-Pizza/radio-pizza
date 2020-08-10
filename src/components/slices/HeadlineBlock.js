import React from "react";
import { RichText } from "prismic-reactjs";
import processPublicationDates from "../../utils/processPublicationDates";

/**
 * @component
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @param {Object} metadata - data object from Prismic CMS that contains
 * @returns {jsx}
 */
function HeadlineBlock({ slice, metadata }) {
  /**
   * Destructure slice and metadata for ease of use.
   */
  const {
    feature_headline_img,
    feature_category,
    feature_subcategory,
    feature_headline,
    feature_subtitle,
    feature_author,
    feature_author_pic,
  } = slice.primary;

  const { firstPublicationDate, lastPublicationDate } = metadata;
  const { hmbk_staff_name, hmbk_staff_position } = feature_author;

  /**
   * Send the publication date info off to be processed.
   */
  const featureDateDetails = processPublicationDates(
    firstPublicationDate,
    lastPublicationDate
  );

  /**
   * Transform feature_category for layout use.
   */
  const allCapsCategory = feature_category.toUpperCase();

  return (
    <section className="hero">
      <div
        className="hero-body headline-block"
        style={{
          backgroundImage: `url(${feature_headline_img.url})`,
        }}
      >
        <div className="container">
          <div className="columns">
            <div className="column">
              <p className="is-size-6-desktop is-size-7-touch has-text-centered category">
                {allCapsCategory}
                <span>{" ‣ " + feature_subcategory}</span>
              </p>
              <div className="content">
                <h1 className="title is-size-1-widescreen is-size-2-desktop is-size-3-tablet is-size-4-mobile has-text-centered">
                  {RichText.asText(feature_headline)}
                </h1>

                <h3 className="is-size-4-desktop is-size-6-touch has-text-centered">
                  {RichText.asText(feature_subtitle)}
                </h3>
                <hr />
                <div className="columns is-centered is-vcentered">
                  <div className="column is-narrow">
                    <figure className="image is-48x48">
                      <img
                        className="is-rounded"
                        src={feature_author_pic.url}
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
