import React from "react";
import { RichText } from "prismic-reactjs";

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

  const { hmbk_staff_name, hmbk_staff_position } = feature_author;
  const allCapsCategory = feature_category.toUpperCase();

  // Determine whether this feature has been update since first publication
  const { firstPublicationDate, lastPublicationDate } = metadata;
  const hasBeenUpdated =
    firstPublicationDate === lastPublicationDate ? false : true;

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
              marginTop: "5vh",
              backgroundColor: "rgba(0,0,0, .85)",
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
                <hr style={{ margin: "2rem 45%" }} />
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
                    <p className="has-text-centered">{firstPublicationDate}</p>
                  </div>
                  {hasBeenUpdated ? (
                    <div className="column is-narrow">
                      <p className="has-text-grey has-text-centered">
                        {lastPublicationDate}
                      </p>
                    </div>
                  ) : null}
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
