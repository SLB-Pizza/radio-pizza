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
  const headlineData = prismicContent.header[0].primary
  const sliceData = prismicContent.body

  /**
   * Grab props for {@link ArticleBylineSubtitle}.
   */
  const featureSubtitle = headlineData.article_subtitle
  const featureDates = {
    first: metadata.firstPublicationDate,
    last: metadata.lastPublicationDate,
  }
  const featureAuthor = headlineData.article_author

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
            header {
              ... on PRISMIC_FeatureHeaderHeadline_block {
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
              ... on PRISMIC_FeatureBodyText {
                type
                label
                primary {
                  body_text
                }
              }
              ... on PRISMIC_FeatureBodyOne_image_and_text {
                type
                label
                primary {
                  oiat_img
                  oiat_text
                }
              }
              ... on PRISMIC_FeatureBodySlice_divider {
                type
              }
              ... on PRISMIC_FeatureBodyTwo_images_and_text {
                label
                type
                primary {
                  tiat_left_img
                  tiat_right_img
                  tiat_text
                }
              }
              ... on PRISMIC_FeatureBodyBlockquote {
                type
                label
                primary {
                  blockquote_text
                  blockquote_bg_img
                  blockquote_attribution
                }
              }
              ... on PRISMIC_FeatureBodyFull_width_image {
                type
                label
                primary {
                  full_width_image
                }
              }
              ... on PRISMIC_FeatureBodyImage_row {
                type
                fields {
                  single_img
                }
              }
              ... on PRISMIC_FeatureBodyText_columns {
                type
                fields {
                  text_column
                }
                primary {
                  text_columns_header
                  text_columns_footer
                }
              }
              ... on PRISMIC_FeatureBodyHmbk_item_and_text {
                type
                label
                primary {
                  oiat_text
                  hmbk_item {
                    ... on PRISMIC_Event {
                      _meta {
                        uid
                        type
                      }
                      event_blurb
                      main_event_image
                      event_name
                      event_end
                      event_start
                      event_location
                    }
                    ... on PRISMIC_Resident {
                      _meta {
                        uid
                        type
                      }
                      resident_name
                      resident_image
                    }
                    ... on PRISMIC_Mix {
                      _meta {
                        uid
                        type
                        tags
                      }
                      mix_date
                      mix_image
                      mix_link
                      mix_title
                      featured_residents {
                        mix_resident {
                          ... on PRISMIC_Resident {
                            resident_name
                          }
                        }
                      }
                    }
                  }
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
