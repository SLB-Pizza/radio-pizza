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
  const document = prismicContent.node;

  // Grab the metadata for the feature and the CMS slice data
  const featureMetadata = document._meta;
  const featureSliceData = document.body;

  return (
    <main className="site-page feature">
      <SliceZone sliceZone={featureSliceData} metadata={featureMetadata} />
      <hr />
      <h3 className="subtitle">
        {`"/features/${featureMetadata.uid}"`} -- featureMetadata Data Object
      </h3>
      <pre>{JSON.stringify(featureMetadata, null, 2)}</pre>
      <hr />
      <h1 className="title">Data Objects passed into{" <SliceZone />"}</h1>
      {featureSliceData.map((slice, index) => (
        <div key={index} style={{ marginTop: "2rem" }}>
          <h3 className="subtitle">
            {slice.type === undefined ? "Unused Slice" : slice.type} Data Object
          </h3>
          <pre>{JSON.stringify(slice, null, 2)}</pre>
        </div>
      ))}
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
                      _meta {
                        type
                        uid
                      }
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
