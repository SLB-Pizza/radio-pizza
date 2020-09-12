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

  const cmsCardColumnLayout = "column is-12 landing-page-element";

  return (
    <main className="container is-fluid black-bg-page">
      <div className="columns is-multiline is-mobile">
        <div className="column is-12">
          <div className="content">
            <h1 className="title is-size-2-widescreen is-size-3-desktop is-size-4-touch">
              HMBK Reference Guides
            </h1>
            <h4 className="subtitle is-size-6-touch">
              Your reference for Prismic CMS, image guidelines, editorial
              standards and more.
            </h4>
          </div>
        </div>

        {cmsGuideData.map((guide, index) => {
          return (
            <LandingPageElement
              key={`CMS-Guide-${index}`}
              pageElement={guide}
              layout={cmsCardColumnLayout}
            />
          );
        })}
      </div>
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
