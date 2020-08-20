import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";

import { CMSSlides, HomeContentSample } from "../../components";

/**
 * @category Pages
 * @subcategory Indexes
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function CMSGuideIndex({ data }) {
  const prismicContent = data.prismic.allHomepages.edges[0];
  if (!prismicContent) return null;
  const cmsGuideData = prismicContent.node;

  return (
    <main className="site-page">
      <section className="container is-fluid">
        <div className="columns">
          <div className="content">
            <div className="column is-12">
              <h1 className="title">HMBK CMS Guide</h1>
              <h3 className="subtitle">Table of Contents</h3>
              <ul>
                <li>Homepage</li>
                <ul>
                  <li>Sample Slide</li>
                </ul>
              </ul>
              <hr />
              <h1 className="title">cmsGuideData</h1>
              <pre>{JSON.stringify(cmsGuideData, null, 2)}</pre>

              {/* <Link to="/cms-help/sample-feature">View Sample Feature</Link> */}
            </div>
          </div>
        </div>
        {/* <CMSSlides slideData={slideData} />
        <HomeContentSample homeContentData={homeContentData} />
        <hr /> */}
      </section>
    </main>
  );
}

export const query = graphql`
  query CMSGuideHomeQuery {
    prismic {
      allCms_guides {
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

export default CMSGuideIndex;
