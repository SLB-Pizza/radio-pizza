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
function IndexPage({ data }) {
  // Focus the node for the prismicContent check below.
  const homepageData = data.prismic.allHomepages.edges[0];
  const homeMixesData = data.prismic.allMixs.edges;
  const homeFeaturesData = data.prismic.allFeatures.edges;

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
        {/* <pre>{JSON.stringify(data.prismic, null, 2)}</pre> */}
        <HomeNews
          headline={home_features_headline}
          blurb={home_features_blurb}
          homeFeaturesData={homeFeaturesData}
        />
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
              slide_bg
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
      allFeatures(last: 2) {
        edges {
          node {
            _meta {
              uid
              type
              firstPublicationDate
              lastPublicationDate
            }
            body {
              ... on PRISMIC_FeatureBodyHeadline_block {
                type
                primary {
                  article_headline
                  article_headline_img
                  article_subcategory
                  article_subtitle
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;

// Mix img square sizes
// --- MOBILE ---
// --- min-max avg:  513.5---
// --- mean:  495.67---
// 767  - 695

// 768  - 332
// 1023 - 460

// --- DESKTOP ---
// --- min-max avg:  350---
// --- mean:  329.33---
// 1024 - 296
// 1215 - 360

// 1216 - 262
// 1407 - 310

// 1408 - 310
// 1920 - 438
