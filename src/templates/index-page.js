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

  // Grab the homepageCarousel array of data objects
  const slidesForHero = document.homepage_carousel;

  return (
    <div className="has-navbar-fixed-bottom site-page">
      <Hero slides={slidesForHero} />
      <HomeContent />
    </div>
  );
}

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            _linkType
            homepage_carousel {
              slide_bg_url
              slide_cta
              slide_link {
                ... on PRISMIC__ExternalLink {
                  target
                  _linkType
                  url
                }
              }
              slide_headline
            }
          }
        }
      }
    }
  }
`;

export default IndexPageTemplate;
