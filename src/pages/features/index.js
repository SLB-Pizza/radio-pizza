import React from "react";
import { Link, graphql } from "gatsby";
import { StickyFeature } from "../../components";
import PropTypes from "prop-types";

/**
 * @category Pages
 * @subcategory Indexes
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function FeaturesIndex({ data }) {
  /**
   * Focus the node for the prismicContent check below.
   */
  const prismicContent = data.prismic.allFeatures.edges;

  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * @see https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
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
  const leadFeatureData = dataDocument[0].node;
  const allOtherFeatures = dataDocument.slice(1);

  const { _meta, body } = leadFeatureData;

  // console.log("index > leadFeatureData", leadFeatureData);
  // console.log("index > leadFeatureData.body", body);
  // console.log("index > leadFeatureData._meta", _meta);

  return (
    <main className="site-page">
      <StickyFeature leadFeatureData={leadFeatureData} />
      <ul>
        <li>
          <Link to="/features/dev-test-feature-1">Link to Test Feature 1</Link>
        </li>
        <li>
          <Link to="/features/dev-test-feature-2">Link to Test Feature 2</Link>
        </li>
      </ul>
      <hr />

      <section className="container is-fluid" style={{ marginTop: "10rem" }}>
        <div className="columns is-multiline">
          <div className="column is-12">
            <p
              className="title is-size-3-desktop is-size-4-touch"
              id="first-text"
            >
              Features Data
            </p>
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

export default FeaturesIndex;

FeaturesIndex.propTypes = {
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
            }
          }
        }
      }
    }
  }
`;
