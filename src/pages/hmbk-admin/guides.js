import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../../components'
import { HMBKFooter } from '../../components/helpers'
import { AdminHeader, AdminCategorizedGuides } from '../../components/admin'

/**
 * Renders the `/hmbk-admin/guides/` landing page.
 * @category Pages
 * @function CMSGuideIndex
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to build the `/hmbk-admin/guides/` landing page
 * @returns {jsx}
 */
export default function AdminGuides({ data }) {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()
  const [guideCategories, setGuideCategories] = useState(null)
  const prismicContent = data.prismic.allCms_guides.edges
  if (!prismicContent) return null

  useEffect(() => {
    const categorizeGuides = () => {
      if (data) {
        const guideData = {}

        prismicContent.forEach(({ node }) => {
          const keyName = node.cms_guide_category

          if (!guideData[keyName]) {
            guideData[keyName] = { title: keyName, data: [node] }
          } else {
            guideData[keyName].data.push(node)
          }
        })
        setGuideCategories(guideData)
      }
    }
    categorizeGuides()
  }, [])
  const cmsGuideData = prismicContent
  return (
    <main className="black-bg-page">
      <Helmet defer={false}>
        <title>{`Guides | ${title}`}</title>
        <meta property="og:title" content={`Guides | ${title}`} />
        <meta property="og:url" content={`${siteUrl}/hmbk-admin/guides/`} />
        <meta name="twitter:title" content={`Guides | ${title}`} />
      </Helmet>
      <AdminHeader renderHomeLink={true} />

      <section className="section container is-fluid">
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
        </div>
      </section>

      {guideCategories && (
        <AdminCategorizedGuides guideData={guideCategories} />
      )}

      <HMBKFooter />
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
            header {
              ... on PRISMIC_Cms_guideHeaderHeadline_block {
                type
                primary {
                  article_headline
                  article_headline_img
                  article_category
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
`
