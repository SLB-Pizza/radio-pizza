import React from "react";
import { Link } from "gatsby";
import { RichText } from "prismic-reactjs";
import { HomeSingleNews } from "./index";

function HomeFeatures({ headline, blurb, homeFeaturesData }) {
  return (
    <div className="container is-fluid" id="home-news">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="display-text is-size-3">
              {RichText.asText(headline)}
            </p>
            <div className="content">{RichText.render(blurb)}</div>

            <Link to="/features">
              <button className="button is-small is-outlined is-rounded">
                All Features
              </button>
            </Link>
          </div>
        </div>

        <div className="column is-9">
          <div className="columns is-multiline">
            {homeFeaturesData.map((singleFeature, index) => {
              const { _meta, body } = singleFeature.node;

              return (
                <HomeSingleNews
                  key={`index-#${index}-home-feature`}
                  metadata={_meta}
                  body={body}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/*
      Touch Sizes
      */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          <p className="display-text is-size-4">Features</p>
        </div>
        <div className="column is-narrow">
          <Link to="/features">
            <button className="button is-small is-outlined is-rounded">
              All Features
            </button>
          </Link>
        </div>
        <div className="column is-12">
          <p className="subtitle is-size-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {homeFeaturesData.map((singleFeature, index) => {
          const { _meta, body } = singleFeature.node;

          return (
            <HomeSingleNews
              key={`index-#${index}-home-feature`}
              metadata={_meta}
              body={body}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomeFeatures;
