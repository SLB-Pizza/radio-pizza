import React from "react";
import { Link, graphql } from "gatsby";
import Highlight, { defaultProps } from "prism-react-renderer";
import { StickyFeature, SliceZone } from "../../components";
import { ParallaxHeadline } from "../../components/slices";
import PropTypes from "prop-types";

/**
 * @category Pages
 * @subcategory Indexes
 * @function SupportPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 * @returns {jsx}
 */
function SupportPage({ data }) {
  /**
   * Focus the node for the prismicContent check below.
   */
  const prismicContent = data.prismic.allSupports.edges[0];

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
  const supportPageData = prismicContent.node;

  /**
   * Pull out parts from supportPageData to make passing data easier.
   */
  const supportHeader = {
    cta: supportPageData.support_cta,
    hook: supportPageData.support_cta_hook,
    img: supportPageData.support_cta_bg_img,
  };
  const supportSlice = supportPageData.body;

  return (
    <main className="site-page">
      {/* <StickyFeature leadFeatureData={leadFeatureData} /> */}
      <ParallaxHeadline
        cta={supportHeader.cta}
        hook={supportHeader.hook}
        imgObj={supportHeader.img}
      />
      <SliceZone sliceZone={supportSlice} />
      <hr />

      <section className="container is-fluid">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h1 className="title">supportSlice</h1>
            <pre>{JSON.stringify(supportSlice, null, 2)}</pre>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SupportPage;

SupportPage.propTypes = {
  leadFeatureData: PropTypes.exact({
    _meta: PropTypes.object.isRequired,
    body: PropTypes.arrayOf(PropTypes.object),
  }),
  allOtherFeatures: PropTypes.arrayOf(PropTypes.object),
};

export const query = graphql`
  query SupportPage {
    prismic {
      allSupports {
        edges {
          node {
            support_cta
            support_cta_bg_img
            support_cta_hook
            body {
              ... on PRISMIC_SupportBodyOne_image_and_text {
                type
                primary {
                  oiat_layout
                  oiat_text
                  oiat_img
                }
              }
            }
          }
        }
      }
    }
  }
`;
