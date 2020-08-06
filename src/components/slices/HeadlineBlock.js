import React from "react";
import { RichText } from "prismic-reactjs";

function HeadlineBlock({ slice }) {
  const {
    feature_headline_img,
    feature_category,
    feature_subcategory,
    feature_headline,
    feature_subtitle,
    feature_byline,
  } = slice.primary;

  let allCapsCategory = feature_category.toUpperCase();

  return (
    <section
      className="hero"
      style={{
        height: "35vh",
        backgroundImage: `url(${feature_headline_img.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        marginBottom: "15vh",
      }}
    >
      <div
        className="hero-body"
        style={{
          marginTop: "25vh",
          backgroundColor: "rgba(50,100,150, 1)",
          border: "5px dotted white",
        }}
      >
        <div className="container">
          <div
            className="columns"
            style={{
              marginTop: "-10rem",
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
                  {RichText.asText(feature_headline) +
                    "lhasdfhg a sadgadgfaw adgf agd adf a dgd  gaetwyhsdbfdv sdcf"}
                </h1>

                <h3 className="headline-block-subtitle has-text-centered">
                  {RichText.asText(feature_subtitle)}
                </h3>
                <hr style={{ margin: "2rem 45%" }} />
                <p className="has-text-centered">{feature_byline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeadlineBlock;
