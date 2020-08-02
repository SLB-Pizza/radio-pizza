import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import "../styles/index.scss";
import { Hero, HomeContent } from "../components";

function IndexPageTemplate({ data }) {
  // Focus the node for the prismicContent check below.
  const prismicContent = data.prismic.allHomepages.edges[0];

  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * Details: https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
   */
  if (!prismicContent) return null;

  // Grab the data object from prismicContent
  const document = prismicContent.node;

  // Create objects by pulling data values from document to pass as props to components in return statement.
  const slidesForHero = document.homepage_carousel;
  const homeMixesText = {
    mixesHeadline: document.home_mixes_headline,
    mixesSectionBlurb: document.home_mixes_blurb,
  };
  const homeEventsText = {
    eventsHeadline: document.home_events_headline,
    eventsSectionBlurb: document.home_events_blurb,
  };
  const homeFeaturesText = {
    featuresHeadline: document.home_features_headline,
    featuresSectionBlurb: document.home_features_blurb,
  };

  return (
    <div className="has-navbar-fixed-bottom site-page">
      <Hero slides={slidesForHero} />
      <HomeContent
        homeMixesText={homeMixesText}
        homeEventsText={homeEventsText}
        homeFeaturesText={homeFeaturesText}
      />
    </div>
  );
}

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            homepage_carousel {
              slide_bg_url
              slide_cta
              slide_headline
              slide_link {
                _linkType
                ... on PRISMIC__ExternalLink {
                  target
                  _linkType
                  url
                }
              }
            }
            home_mixes_headline
            home_mixes_blurb
            home_events_headline
            home_events_blurb
            home_features_headline
            home_features_blurb
          }
        }
      }
    }
  }
`;

export default IndexPageTemplate;
