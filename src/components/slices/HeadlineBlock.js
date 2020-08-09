import React from "react";
import { RichText } from "prismic-reactjs";
import processPublicationDates from "./utils/processPublicationDates";

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

  const featureDateDetails = processPublicationDates(
    firstPublicationDate,
    lastPublicationDate
  );
  const { hmbk_staff_name, hmbk_staff_position } = feature_author;
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
                <hr />
                <div className="columns is-centered is-vcentered">
                  <div className="column is-narrow author">
                    <figure className="image is-48x48">
                      <img
                        className="is-rounded"
                        src={feature_author_pic.url}
                        alt={`${hmbk_staff_name}, ${hmbk_staff_position}`}
                      />
                    </figure>
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
