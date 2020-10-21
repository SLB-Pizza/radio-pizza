import React from 'react'
import { graphql } from 'gatsby'
import { SliceZone } from '../components'

/**
 * @category Templates
 * @subcategory Feature
 * @function CMSGuideTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build cms-help off of `/guide/:uid`
 * @returns {jsx}
 */
function CMSGuideTemplate({ data }) {
  const prismicContent = data.prismic.allCms_guides.edges[0]
  if (!prismicContent) return null
  const cmsDataNode = prismicContent.node

  // Grab the metadata for the feature and the CMS slice data
  const guideMetadata = cmsDataNode._meta
  const guideSliceData = cmsDataNode.body

  return (
    <body className="full-height-page">
      <article>
        {/* HeadlineBlock only here */}
        <SliceZone sliceZone={guideSliceData} metadata={guideMetadata} />
        <main>
          {/*
          SliceZone Content Sections after the HeadlineBlock
          <SliceZone sliceZone={guideSliceData} metadata={guideMetadata} /> */}
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
      </article>
    </body>
  )
}

export const query = graphql`
  query CMSGuideQuery($uid: String) {
    prismic {
      allCms_guides(uid: $uid) {
        edges {
          node {
            _meta {
              type
              uid
              firstPublicationDate
              lastPublicationDate
            }
            body {
              ... on PRISMIC_Cms_guideBodyHeadline_block {
                type
                primary {
                  article_headline_img
                  article_category
                  article_subcategory
                  article_headline
                  article_subtitle
                  article_author_pic
                  article_author {
                    ... on PRISMIC_Staff {
                      hmbk_staff_name
                      hmbk_staff_position
                    }
                  }
                }
              }
              ... on PRISMIC_Cms_guideBodyText {
                type
                primary {
                  set_first_letter
                  body_text
                }
              }
              ... on PRISMIC_Cms_guideBodyFull_width_image {
                type
                primary {
                  full_width_image
                  fwi_height
                  fwi_titling
                }
              }
              ... on PRISMIC_Cms_guideBodyBlockquote {
                type
                primary {
                  blockquote_attribution
                  blockquote_bg_img
                  blockquote_text
                  blockquote_type
                }
              }
              ... on PRISMIC_Cms_guideBodyTwo_images___text {
                type
                label
                primary {
                  tiat_text
                  tiat_right_img
                  tiat_left_img
                  tiat_layout
                  tiat_is_gapless
                }
              }
              ... on PRISMIC_Cms_guideBodyOne_image_and_text {
                type
                label
                primary {
                  oiat_img
                  oiat_layout
                  oiat_text
                }
              }
              ... on PRISMIC_Cms_guideBodyRow_of_images {
                type
                fields {
                  single_img
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CMSGuideTemplate
