import React from "react";
import { graphql } from "gatsby";
import { SliceZone } from "../components";

/**
 * @category Templates
 * @subcategory Feature
 * @function FeatureTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build features off of `/features/:uid`
 * @returns {jsx}
 */

function FeatureTemplate({ data }) {
  const prismicContent = data.prismic.allFeatures.edges[0];
  if (!prismicContent) return null;
  const featuresData = prismicContent.node;

  // Grab the metadata for the feature and CMS slice data
  const featureMetadata = featuresData._meta;
  const featureSliceData = featuresData.body;

  return (
    <body className="site-page">
      <article>
        {/* HeadlineBlock only here */}
        <SliceZone sliceZone={featureSliceData} metadata={featureMetadata} />
        <main>
          {/*
          SliceZone Content Sections after the HeadlineBlock
          <SliceZone sliceZone={guideSliceData} metadata={guideMetadata} /> */}
        </main>
      </article>
    </body>
  );
}

export const query = graphql`
  query FeaturesTemplateQuery($uid: String) {
    prismic {
      allFeatures(uid: $uid) {
        edges {
          node {
            _meta {
              uid
              lastPublicationDate
              firstPublicationDate
              type
            }
            body {
              ... on PRISMIC_FeatureBodyHeadline_block {
                type
                primary {
                  article_author_pic
                  article_author {
                    ... on PRISMIC_Staff {
                      hmbk_staff_name
                      hmbk_staff_position
                    }
                  }
                  article_category
                  article_headline
                  article_headline_img
                  article_subcategory
                  article_subtitle
                }
              }
              ... on PRISMIC_FeatureBodyText {
                type
                primary {
                  set_first_letter
                  body_text
                }
              }
              ... on PRISMIC_FeatureBodyBlockquote {
                type
                primary {
                  blockquote_type
                  blockquote_text
                  blockquote_attribution
                  blockquote_bg_img
                }
              }
              ... on PRISMIC_FeatureBodyImage_row {
                type
                fields {
                  row_image
                }
              }
              ... on PRISMIC_FeatureBodyOne_image_and_text {
                type
                primary {
                  oiat_layout
                  oiat_text
                  oiat_img
                }
              }
              ... on PRISMIC_FeatureBodyTwo_images___text {
                type
                primary {
                  tiat_layout
                  tiat_text
                  tiat_is_gapless
                  tiat_left_img
                  tiat_right_img
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default FeatureTemplate;
