import React from "react";
import { Link, graphql } from "gatsby";
import Highlight, { defaultProps } from "prism-react-renderer";
import { StickyFeature } from "../../components";
import { ParallaxHeadlineBlock } from "../../components/slices";
import PropTypes from "prop-types";

export default function SupportIndexPage({ data }) {
  // Focus the node for the prismicContent check below.
  const prismicContent = data.prismic.allSupports.edges;

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
  const aboutPageData = dataDocument[0].node;
  const code = JSON.stringify(aboutPageData, null, 2);

  const {
    _meta,
    support_cta,
    support_cta_bg_img,
    support_cta_hook,
  } = aboutPageData;

  // const { _meta, body } = aboutPageData;

  return (
    <main className="site-page">
      {/* <StickyFeature leadFeatureData={leadFeatureData} /> */}
      <ParallaxHeadlineBlock
        cta={support_cta}
        hook={support_cta_hook}
        imgObj={support_cta_bg_img}
      />

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
            <Highlight {...defaultProps} code={code} language="json">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </section>
    </main>
  );
}

SupportIndexPage.propTypes = {
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
            _meta {
              uid
            }
            _linkType
            support_cta
            support_cta_bg_img
            support_cta_hook
          }
        }
      }
    }
  }
`;
