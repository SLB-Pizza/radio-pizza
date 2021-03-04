import React from 'react'
import { Link, graphql } from 'gatsby'
import { linkResolver } from '../../utils'

/**
 * Renders the `/guide` landing page.
 * @category Pages
 * @function CMSGuideIndex
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to build the `/guide` landing page
 * @returns {jsx}
 */
function CMSGuideIndex({ data }) {
  const prismicContent = data.prismic.allCms_guides.edges
  if (!prismicContent) return null
  const cmsGuideData = prismicContent

  const cmsCardColumnLayout = 'column is-12 landing-page-element'
  const cmsImageAspectRatio = 'image is-3by1'

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

        {cmsGuideData.map(({ node }, index) => (
          <div className="column is-12">
            <Link to={linkResolver(node._meta)}>
              <pre>{JSON.stringify(node, null, 2)}</pre>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}

export const query = graphql`
  query CMSGuideIndexQuery {
    prismic {
      allCms_guides(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              uid
              firstPublicationDate
              lastPublicationDate
              type
            }
            cms_guide_category
            # body {
            #   ... on PRISMIC_Cms_guideBodyHeadline_block {
            #     type
            #     primary {
            #       article_headline
            #       article_headline_img
            #       article_subcategory
            #       article_subtitle
            #     }
            #   }
            # }
          }
        }
      }
    }
  }
`

export default CMSGuideIndex
