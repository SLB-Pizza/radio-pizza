import React from "react";
import { StickyFeature } from "../../components";
import PropTypes from "prop-types";

export default function FeaturesIndexPage({ data }) {
  // Focus the node for the prismicContent check below.
  const prismicContent = data.prismic.allFeatures.edges;

  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * Details: https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
   */
  if (!prismicContent) return null;

  /**
   * Grab the first node object from the prismicContent array of nodes to pass as leadfeatureData prop to StickyFeature.
   *
   * The data from the 'FeaturesIndexPage' query comes pre-sorted to show the most recent published feature, NOT the most recently updated.
   *
   * The remaining array of node objects can be mapped over normally using XYZ_Component.
   */

  const dataDocument = prismicContent;
  const leadFeature = prismicContent.shift();
  const leadFeatureData = leadFeature.node;
  const allOtherFeatures = prismicContent;

  const { _meta, body } = leadFeatureData;

  // console.log("index > leadFeatureData", leadFeatureData);
  console.log("index > leadFeatureData.body", body);
  console.log("index > leadFeatureData._meta", _meta);

  return (
    <main className="site-page all-features">
      <StickyFeature leadFeatureData={leadFeatureData} />
      <section className="container is-fluid">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h1 className="title is-size-3-desktop is-size-4-touch">
              Features
            </h1>
          </div>
          <div className="column is-12">
            <h1 className="title">leadFeatureData Data Object</h1>
            <pre>{JSON.stringify(leadFeatureData, null, 2)}</pre>
          </div>
          <div className="column is-12">
            <h1 className="title">allOtherFeatures Data Object</h1>
            <pre>{JSON.stringify(allOtherFeatures, null, 2)}</pre>
          </div>
        </div>
      </section>
    </main>
  );
}

FeaturesIndexPage.propTypes = {
  leadFeatureData: PropTypes.exact({
    _meta: PropTypes.object.isRequired,
    body: PropTypes.arrayOf(PropTypes.object),
  }),
  allOtherFeatures: PropTypes.arrayOf(PropTypes.object),
};

export const query = graphql`
  query FeaturesIndexPage {
    prismic {
      allFeatures(sortBy: meta_firstPublicationDate_DESC) {
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
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
