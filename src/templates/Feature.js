import React from "react";
import { graphql } from "gatsby";
import { SliceZone } from "../components";

const FeatureTemplate = ({ data }) => {
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
};

export const query = graphql`
  query FeaturesQuery($uid: String) {
    prismic {
      allFeatures(uid: $uid) {
        edges {
          node {
            _meta {
              uid
              firstPublicationDate
              lastPublicationDate
              type
              tags
            }
            body {
              ... on PRISMIC_FeatureBodyHeadline_block {
                type
                label
                primary {
                  feature_headline_img
                  feature_category
                  feature_subcategory
                  feature_headline
                  feature_subtitle
                  feature_author_pic
                  feature_author {
                    ... on PRISMIC_Staff {
                      hmbk_staff_name
                      hmbk_staff_position
                      _meta {
                        uid
                        type
                      }
                      _linkType
                    }
                  }
                }
              }
              ... on PRISMIC_FeatureBodyBlockquote {
                type
                label
                primary {
                  blockquote_type
                  blockquote_text
                  blockquote_attribution
                  blockquote_bg_img
                }
              }
              ... on PRISMIC_FeatureBodyTwo_images___text {
                type
                label
                primary {
                  tiat_layout
                  tiat_text
                  tiat_is_gapless
                  tiat_left_img
                  tiat_right_img
                }
              }
              ... on PRISMIC_FeatureBodyText {
                type
                primary {
                  set_first_letter
                  body_text
                }
              }
              ... on PRISMIC_FeatureBodyBanner_with_caption {
                type
                label
                primary {
                  image_banner
                  title_of_banner
                  description
                  button_label
                }
              }
              ... on PRISMIC_FeatureBodyAuthor_pic_and_quote {
                type
                label
              }
              ... on PRISMIC_FeatureBodyImage_row {
                type
                fields {
                  row_image
                }
              }
            }
            body1 {
              ... on PRISMIC_FeatureBody1Deveverycontenttype {
                type
                label
                primary {
                  title
                  img
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
