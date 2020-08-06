import React from "react";
import { RichText } from "prismic-reactjs";
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

function HeadlineBlock({ slice, metadata }) {
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

  /**
   * @function processPublicationDates
   * @param {String} firstPubDate - date of initial publish; comes from feature_metadata
   * @param {String} lastPubDate - date of most recent publish(update); comes from feature_metadata
   * @returns {Object} dateDetails
   */
  function processPublicationDates(firstPubDate, lastPubDate) {
    // Default dateDetails to firstPubDate and never updated
    let dateDetails = {
      pubDate: firstPubDate,
      hasBeenUpdated: false,
    };

    // Determine whether this feature has been update since first publication
    const hasBeenUpdated = firstPubDate !== lastPubDate ? true : false;

    // Update dateDetails
    dateDetails.hasBeenUpdated = hasBeenUpdated;

    // If the feature has been updated
    dateDetails.pubDate = hasBeenUpdated
      ? dayjs(lastPubDate).format("MMMM D, YYYY – HH:mm")
      : dayjs(firstPubDate).format("MMMM D, YYYY");

    return dateDetails;
  }

  const featureDateDetails = processPublicationDates(
    firstPublicationDate,
    lastPublicationDate
  );
  const { hmbk_staff_name, hmbk_staff_position } = feature_author;
  const allCapsCategory = feature_category.toUpperCase();

  return (
    <section className="hero">
      <div
        className="hero-body"
        style={{
          height: "35vh",
          backgroundImage: `url(${feature_headline_img.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          marginBottom: "15vh",
        }}
      >
        <div className="container">
          <div
            className="columns"
            style={{
              marginTop: "10vh",
              backgroundColor: "rgba(0,0,0, .75)",
              minHeight: "25vh",
              border: "2px solid white",
              borderRadius: ".75rem",
            }}
          >
            <div className="column" style={{ padding: "1.5rem" }}>
              <p className="is-size-6 has-text-centered">
                {allCapsCategory}
                <span className="has-text-primary">
                  {" ‣ " + feature_subcategory}
                </span>
              </p>
              <div className="content">
                <h1 className="title is-size-1 has-text-centered">
                  {RichText.asText(feature_headline)}
                </h1>

                <h3 className="headline-block-subtitle has-text-centered">
                  {RichText.asText(feature_subtitle)}
                </h3>
                <hr style={{ margin: "2rem 45% .5rem" }} />
                <div className="columns is-centered is-vcentered">
                  <div className="column is-narrow">
                    <figure className="image is-48x48">
                      <img
                        className="is-rounded"
                        style={{ border: "2px solid white" }}
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
