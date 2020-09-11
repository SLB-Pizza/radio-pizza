import React from "react";
import { graphql, Link } from "gatsby";
import { LandingPageElement } from "../../components";
import { linkResolver } from "../../utils";

import { CMSSlides, HomeContentSample } from "../../components";

/**
 * @category Pages
 * @subcategory Indexes
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/guide` landing page
 */
function CMSGuideIndex({ data }) {
  const prismicContent = data.prismic.allCms_guides.edges;
  if (!prismicContent) return null;
  const cmsGuideData = prismicContent;

  return (
    <main className="container is-fluid black-bg-page">
      <div className="columns is-multiline is-mobile">
        <div className="column is-12">
          <div className="content">
            <h1 className="title">HMBK CMS Guides</h1>
            <h4 className="subtitle">
              Your reference for Prismic CMS, image guidelines, editorial
              standards and more.
            </h4>
          </div>
        </div>
      </div>

      {cmsGuideData.map((guide, index) => {
        return (
          <LandingPageElement key={`CMS-Guide-${index}`} singleGuide={guide} />
        );
      })}

      <div className="columns is-multiline is-mobile">
        <div className="column is-12">
          <div className="content">
            <h1 className="title">prismicContent</h1>
            <pre>{JSON.stringify(prismicContent, null, 2)}</pre>
            {/* <pre>{JSON.stringify(cmsGuideData, null, 2)}</pre> */}
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
            body {
              ... on PRISMIC_Cms_guideBodyHeadline_block {
                type
                primary {
                  article_headline
                  article_subtitle
                  article_headline_img
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
