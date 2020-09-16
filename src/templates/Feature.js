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
    <main className="full-height-page">
      <article>
        {/* HeadlineBlock only here */}
        <SliceZone sliceZone={featureSliceData} metadata={featureMetadata} />
        {/*
          SliceZone Content Sections after the HeadlineBlock
          <SliceZone sliceZone={guideSliceData} metadata={guideMetadata} /> */}
      </article>
    </main>
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
              ... on PRISMIC_FeatureBodyImage_group {
                type
                fields {
                  single_img
                }
              }
              ... on PRISMIC_FeatureBodyOne_image_and_text1 {
                type
                primary {
                  oiat_img
                  oiat_layout
                  oiat_text
                }
              }
              ... on PRISMIC_FeatureBodyTwo_images_and_text {
                type
                primary {
                  tiat_is_gapless
                  tiat_layout
                  tiat_left_img
                  tiat_right_img
                  tiat_text
                }
              }
              ... on PRISMIC_FeatureBodyFull_width_image {
                type
                label
                primary {
                  full_width_image
                  fwi_height
                  fwi_titling
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
