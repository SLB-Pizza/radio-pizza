import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import "../styles/index.scss";
import { Hero, HomeMixes, HomeEvents, HomeNews } from "../components";

/**
 * @category Pages
 * @subcategory Homepage
 * @function IndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the index route, `/`
 * @returns {jsx}
 */
function IndexPageTemplate({ data }) {
  // Focus the node for the prismicContent check below.
  const homepageData = data.prismic.allHomepages.edges[0];
  const homeMixesData = data.prismic.allMixs.edges;

  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * Details: https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
   */
  if (!homepageData || !homeMixesData) return null;

  /**
   * Create objects by pulling data values from carouselSlidesData to pass as props to components in return statement.
   */
  const {
    home_mixes_headline,
    home_mixes_blurb,
    home_events_headline,
    home_events_blurb,
    home_features_headline,
    home_features_blurb,
    homepage_carousel,
  } = homepageData.node;

  // const carouselSlidesData = homepageData.node.homepage_carousel;

  return (
    <div className="has-navbar-fixed-bottom site-page">
      <Hero slides={homepage_carousel} />
      <section className="home-content">
        <HomeMixes
          headline={home_mixes_headline}
          blurb={home_mixes_blurb}
          homeMixesData={homeMixesData}
        />
        <HomeEvents />
        <HomeNews />
      </section>
    </div>
  );
}

export const query = graphql`
  query IndexPageQuery {
    prismic {
      allHomepages {
        edges {
          node {
            home_mixes_headline
            home_mixes_blurb
            home_features_headline
            home_features_blurb
            home_events_headline
            home_events_blurb
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
          }
        }
      }
      allMixs(sortBy: meta_firstPublicationDate_DESC, last: 12) {
        edges {
          node {
            _meta {
              uid
              lastPublicationDate
              firstPublicationDate
              type
              tags
            }
            featured_residents {
              mix_resident {
                ... on PRISMIC_Resident {
                  _meta {
                    uid
                    type
                  }
                  resident_name
                }
              }
            }
            mix_date
            mix_image
            mix_link
            mix_title
          }
        }
      }
    }
  }
`;

export default IndexPageTemplate;
