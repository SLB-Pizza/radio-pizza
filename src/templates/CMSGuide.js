import React from "react";
import { graphql } from "gatsby";
import { SliceZone } from "../components";

/**
 * @category Templates
 * @subcategory Feature
 * @function CMSGuideTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build cms-help off of `/cms-guide/:uid`
 * @returns {jsx}
 */
function CMSGuideTemplate({ data }) {
  const prismicContent = data.prismic.allCms_guides.edges[0];
  if (!prismicContent) return null;
  const cmsDataNode = prismicContent.node;

  // Grab the metadata for the feature and the CMS slice data
  const guideMetadata = cmsDataNode._meta;
  const guideSliceData = cmsDataNode.body;

  return (
    <main className="site-page feature">
      <SliceZone sliceZone={guideSliceData} metadata={guideMetadata} />
      <hr />
      <section className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-full">
            <h1 className="title">guideSliceData</h1>
            <pre>{JSON.stringify(guideSliceData, null, 2)}</pre>
          </div>
          <div className="column is-full">
            <h1 className="title">cmsDataNode</h1>
            <pre>{JSON.stringify(cmsDataNode, null, 2)}</pre>
          </div>
        </div>
      </section>
    </main>
  );
}

export const query = graphql`
  query CMSGuideQuery($uid: String) {
    prismic {
      allCms_guides(uid: $uid) {
        edges {
          node {
            _meta {
              uid
              firstPublicationDate
              lastPublicationDate
              type
            }
            body {
              ... on PRISMIC_Cms_guideBodyImage_row {
                type
                fields {
                  row_image
                }
              }
              ... on PRISMIC_Cms_guideBodyText {
                type
                primary {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default CMSGuideTemplate;
