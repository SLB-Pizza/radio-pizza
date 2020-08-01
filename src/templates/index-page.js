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

  // Structure the node's data to pass as props
  const slidesForHero = document.homepage_carousel;

  return (
    <div className="has-navbar-fixed-bottom site-page">
      <Hero slides={slidesForHero} />
      <HomeContent />
    </div>
  );
}

export const query = graphql`
  query HomepageQuery {
    prismic {
      allHomepages {
        edges {
          node {
            homepage_carousel {
              layout_bg_image
              slide_headline
              slide_cta
            }
          }
        }
      }
    }
  }
`;

export default IndexPageTemplate;
