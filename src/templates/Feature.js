import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { Helmet } from 'react-helmet'
import { ArticleHeadline } from '../components/slices/'
import {
  ArticleBylineSubtitle,
  SliceZone,
  useSiteMetadata,
} from '../components'
import { HMBKFooter } from '../components/helpers'

/**
 * Renders a single Feature entry. Components in `return` are not short-circuited here at the top-level; they're short circuited at the exact render location in the layout/slice subcomponent they're used.
 * @category Templates
 * @function FeatureTemplate
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to build features off of `/features/:uid`
 * @returns {jsx}
 */
function FeatureTemplate({ data, path }) {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()
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

  /**
   * Helmet value derivation
   */
  const helmetDescription = featureSubtitle ? featureSubtitle : description
  const helmetEditorialTitle = headlineData.article_headline
    ? RichText.asText(headlineData.article_headline)
    : 'Editorial'

  return (
    <main className="full-height-page">
      <Helmet defer={false}>
        <title>{`${helmetEditorialTitle} | ${title}`}</title>
        <meta name="description" content={helmetDescription} />
        <meta property="og:title" content={helmetEditorialTitle} />
        <meta property="og:url" content={`${siteUrl}${path}`} />
        {headlineData?.article_headline_img &&
          headlineData?.article_headline_img?.url && (
            <meta
              property="og:image"
              content={headlineData.article_headline_img.url}
            />
          )}
        <meta name="og:description" content={helmetDescription} />
        {headlineData?.article_headline_img &&
          headlineData?.article_headline_img?.url && (
            <meta property="og:image:type" content="image/webp" />
          )}
        <meta
          name="twitter:title"
          content={`$${helmetEditorialTitle} | ${title}`}
        />
        <meta name="twitter:description" content={helmetDescription} />
        {headlineData?.article_headline_img &&
          headlineData?.article_headline_img?.url && (
            <meta
              name="twitter:image"
              content={headlineData.article_headline_img.url}
            />
          )}
      </Helmet>

      <article>
        <ArticleHeadline headlineData={headlineData} />

        <ArticleBylineSubtitle
          subtitle={featureSubtitle}
          dates={featureDates}
          authorDetails={featureAuthor}
        />

        <SliceZone sliceZone={sliceData} metadata={metadata} />
        <HMBKFooter />
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
              ... on PRISMIC_FeatureBodyInterview {
                type
                fields {
                  current_line
                  current_speaker
                  speaking_now
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
