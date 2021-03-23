import React from 'react'
import { graphql } from 'gatsby'
import { ArticleHeadline } from '../components/slices/'
import { ArticleBylineSubtitle, HMBKDivider, SliceZone } from '../components'

/**
 * Renders a single Feature entry. Components in `return` are not short-circuited here at the top-level; they're short circuited at the exact render location in the layout/slice subcomponent they're used.
 * @category Templates
 * @function FeatureTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build features off of `/features/:uid`
 * @returns {jsx}
 */
function FeatureTemplate({ data }) {
  const prismicContent = data.prismic.allFeatures.edges[0].node
  if (!prismicContent) return null

  // Grab the metadata for the feature and CMS slice data
  const metadata = prismicContent._meta
  const headlineData = prismicContent.headline_block[0].primary
  const sliceData = prismicContent.body

  /**
   * Grab props for {@link ArticleBylineSubtitle}.
   */
  const featureSubtitle = headlineData.primary.article_subtitle
  const featureDates = {
    first: metadata.firstPublicationDate,
    last: metadata.lastPublicationDate,
  }
  const featureAuthor = headlineData.primary.article_author

  return (
    <main className="full-height-page">
      <article>
        <ArticleHeadline headlineData={headlineData} />

        <ArticleBylineSubtitle
          subtitle={featureSubtitle}
          dates={featureDates}
          authorDetails={featureAuthor}
        />

        <SliceZone sliceZone={sliceData} metadata={metadata} />

        <footer className="section container">
          <div className="columns is-mobile is-vcentered">
            <HMBKDivider />
          </div>
        </footer>
      </article>
    </main>
  )
}

export const query = graphql`
  query FeaturesTemplateQuery($uid: String) {
    prismic {
      allFeatures(uid: $uid) {
        edges {
          node {
            _meta {
              uid
              lastPublicationDate
              firstPublicationDate
              type
            }
            headline_block {
              ... on PRISMIC_FeatureHeadline_blockHeadline_block {
                primary {
                  article_subtitle
                  article_subcategory
                  article_headline_img
                  article_headline
                  article_category
                  article_author {
                    ... on PRISMIC_Staff {
                      hmbk_staff_name
                      hmbk_staff_position
                      hmbk_staff_photo
                    }
                  }
                }
              }
            }
            body {
              ... on PRISMIC_FeatureBodyText {
                type
                primary {
                  set_first_letter
                  body_text
                }
              }
              ... on PRISMIC_FeatureBodyBlockquote {
                type
                primary {
                  blockquote_type
                  blockquote_text
                  blockquote_attribution
                  blockquote_bg_img
                }
              }
              ... on PRISMIC_FeatureBodyImage_group {
                type
                fields {
                  single_img
                }
              }
              ... on PRISMIC_FeatureBodyOne_image_and_text1 {
                type
                primary {
                  oiat_img
                  oiat_layout
                  oiat_text
                }
              }
              ... on PRISMIC_FeatureBodyTwo_images_and_text {
                type
                primary {
                  tiat_is_gapless
                  tiat_layout
                  tiat_left_img
                  tiat_right_img
                  tiat_text
                }
              }
              ... on PRISMIC_FeatureBodyFull_width_image {
                type
                label
                primary {
                  full_width_image
                  fwi_height
                  fwi_titling
                }
              }
            }
          }
        }
      }
    }
  }
`

export default FeatureTemplate
