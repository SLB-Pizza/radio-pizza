import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { Helmet } from 'react-helmet'
import {
  ArticleBylineSubtitle,
  useSiteMetadata,
  SliceZone,
} from '../components'
import { ArticleHeadline } from '../components/slices'
import { HMBKFooter } from '../components/helpers'
import { AdminHeader } from '../components/admin'

/**
 * @category Templates
 * @function CMSGuideTemplate
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to build cms-help off of `/guide/:uid`
 * @returns {jsx}
 */
function CMSGuideTemplate({ data, path }) {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()

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

  /**
   * Helmet value derivation
   */
  const helmetDescription = guideSubtitle ? guideSubtitle : description
  const helmetGuideTitle = headlineData.article_headline
    ? RichText.asText(headlineData.article_headline)
    : 'Guide'

  return (
    <main className="black-bg-page">
      <Helmet defer={false}>
        <title>{`${helmetGuideTitle} | ${title}`}</title>
        <meta name="description" content={helmetDescription} />
        <meta property="og:title" content={helmetGuideTitle} />
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
          content={`$${helmetGuideTitle} | ${title}`}
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
      <AdminHeader renderHomeLink={true} adminGuide={true} />
      <article>
        <ArticleHeadline headlineData={headlineData} isGuide={true} />
        <ArticleBylineSubtitle
          subtitle={guideSubtitle}
          dates={guideDates}
          authorDetails={guideAuthor}
        />
        <SliceZone sliceZone={sliceData} metadata={metadata} />
        <HMBKFooter renderTopButton={true} />
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
                  article_category
                  article_headline
                  article_headline_img
                  article_subcategory
                  article_subtitle
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
              ... on PRISMIC_Cms_guideBodyText {
                type
                label
                primary {
                  body_text
                }
              }
              ... on PRISMIC_Cms_guideBodyOne_image_and_text {
                type
                label
                primary {
                  oiat_img
                  oiat_text
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
                  blockquote_text
                  blockquote_bg_img
                  blockquote_attribution
                }
              }
              ... on PRISMIC_Cms_guideBodyFull_width_image {
                type
                label
                primary {
                  full_width_image
                }
              }
              ... on PRISMIC_Cms_guideBodyImage_row {
                type
                fields {
                  single_img
                }
              }
              ... on PRISMIC_Cms_guideBodyText_columns {
                type
                fields {
                  text_column
                }
                primary {
                  text_columns_header
                  text_columns_footer
                }
              }
              ... on PRISMIC_Cms_guideBodyHmbk_item_and_text {
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
                    ... on PRISMIC_Feature {
                      _linkType
                      _meta {
                        uid
                        type
                        lastPublicationDate
                        firstPublicationDate
                      }
                      header {
                        ... on PRISMIC_FeatureHeaderHeadline_block {
                          type
                          primary {
                            article_subtitle
                            article_subcategory
                            article_headline_img
                            article_headline
                            article_category
                            article_author {
                              _linkType
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
  }
`

export default CMSGuideTemplate
