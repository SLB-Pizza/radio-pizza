import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";

import { CMSSlides, HomeContentSample } from "../../components";

/**
 * @category Pages
 * @subcategory Indexes
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/guide` landing page
 */
function CMSGuideIndex({ data }) {
  const prismicContent = data.prismic.allCms_guides.edges[0];
  if (!prismicContent) return null;
  const cmsGuideData = prismicContent.node;

  return (
    <main className="site-page">
      <section className="container is-fluid">
        <div className="columns">
          <div className="column is-12">
            <div className="content">
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
              <Link to="/guide/image-group-examples">
                Link to image-group-examples
              </Link>

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
  query CMSGuideIndexQuery {
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
          }
        }
      }
    }
  }
`;

export default CMSGuideIndex;
