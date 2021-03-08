import React from 'react'
import { graphql } from 'gatsby'
import { ArticleBylineSubtitle, SliceZone } from '../components'
import { ArticleHeadline } from '../components/slices'

/**
 * @category Templates
 * @function CMSGuideTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build cms-help off of `/guide/:uid`
 * @returns {jsx}
 */
function CMSGuideTemplate({ data }) {
  const prismicContent = data.prismic.allCms_guides.edges[0].node
  if (!prismicContent) return null

  // Grab the metadata for the feature and the CMS slice data
  const metadata = prismicContent._meta
  const headlineData = prismicContent.header[0].primary
  const sliceData = prismicContent.body

  /**
   * Grab props for {@link ArticleBylineSubtitle}.
   */
  const guideSubtitle = headlineData.article_subtitle
  const guideDates = {
    first: metadata.firstPublicationDate,
    last: metadata.lastPublicationDate,
  }
  const guideAuthor = headlineData.article_author

  return (
    <main className="full-height-page">
      <article>
        <ArticleHeadline headlineData={headlineData} />

        <ArticleBylineSubtitle
          subtitle={guideSubtitle}
          dates={guideDates}
          authorDetails={guideAuthor}
        />

        <SliceZone sliceZone={sliceData} metadata={metadata} />
        <hr />
        <section className="container is-fluid">
          <div className="columns is-mobile is-multiline">
            <div className="column is-full">
              <h1 className="title">metadata</h1>
              <pre>{JSON.stringify(metadata, null, 2)}</pre>
            </div>
            <div className="column is-full">
              <h1 className="title">headlineData</h1>
              <pre>{JSON.stringify(headlineData, null, 2)}</pre>
            </div>
            <div className="column is-full">
              <h1 className="title">sliceData</h1>
              <pre>{JSON.stringify(sliceData, null, 2)}</pre>
            </div>
          </div>
        </section>
      </article>
    </main>
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
            cms_guide_category
            header {
              ... on PRISMIC_Cms_guideHeaderHeadline_block {
                type
                primary {
                  article_author {
                    ... on PRISMIC_Staff {
                      hmbk_staff_name
                      hmbk_staff_position
                      hmbk_staff_photo
                    }
                  }
                  article_category
                  article_headline
                  article_headline_img
                  article_subcategory
                  article_subtitle
                }
              }
            }
            body {
              ... on PRISMIC_Cms_guideBodyText {
                type
                label
                primary {
                  body_text
                }
              }
              ... on PRISMIC_Cms_guideBodyOne_image_and_text1 {
                type
                label
                primary {
                  oiat_img
                  oiat_text
                  image_type
                  text_block_position
                }
              }
              ... on PRISMIC_Cms_guideBodySlice_divider {
                type
              }
              ... on PRISMIC_Cms_guideBodyTwo_images_and_text {
                label
                type
                primary {
                  tiat_left_img
                  tiat_right_img
                  tiat_text
                }
              }
              ... on PRISMIC_Cms_guideBodyBlockquote {
                type
                label
                primary {
                  blockquote_type
                  blockquote_text
                  blockquote_bg_img
                  blockquote_attribution
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
