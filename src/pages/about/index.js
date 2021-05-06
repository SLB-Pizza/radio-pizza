import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import {
  AboutPageCredits,
  AboutPageHero,
  AboutPageTitling,
  SliceZone,
  useSiteMetadata,
} from '../../components'
import { HMBKFooter } from '../../components/helpers'

/**
 * Layout for /about page.
 * @category Pages
 * @function AboutIndexPage
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @returns {jsx}
 */
export default function AboutIndexPage({ data }) {
  const { title, siteUrl } = useSiteMetadata()

  const prismicContent = data.prismic.allAbouts.edges[0].node

  if (!prismicContent) return null

  const { body, header } = prismicContent
  const { primary: aboutHeroData } = header[0]
  return (
    <main className="full-height-page">
      <Helmet defer={false}>
        <title>{`About | ${title} | Ears to the concrete.`}</title>
        <meta
          property="og:title"
          content={`About | ${title} | Ears to the concrete.`}
        />
        <meta property="og:url" content={`${siteUrl}/about`} />
        <meta
          name="twitter:title"
          content={`About | ${title} | Ears to the concrete.`}
        />
      </Helmet>

      <AboutPageHero headlineData={aboutHeroData} />
      <AboutPageTitling aboutTitling={aboutHeroData} />
      <SliceZone sliceZone={body} />
      <AboutPageCredits />
      <HMBKFooter />
    </main>
  )
}

export const query = graphql`
  query AboutIndexPage {
    prismic {
      allAbouts {
        edges {
          node {
            body {
              ... on PRISMIC_AboutBodyText {
                type
                label
                primary {
                  body_text
                }
              }
              ... on PRISMIC_AboutBodyBlockquote {
                type
                label
                primary {
                  blockquote_attribution
                  blockquote_bg_img
                  blockquote_text
                }
              }
              ... on PRISMIC_AboutBodyHmbk_item_and_text {
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
              ... on PRISMIC_AboutBodyOne_image_and_text {
                type
                label
                primary {
                  oiat_img
                  oiat_text
                }
              }
              ... on PRISMIC_AboutBodyTwo_images_and_text {
                type
                label
                primary {
                  tiat_left_img
                  tiat_right_img
                  tiat_text
                }
              }
              ... on PRISMIC_AboutBodyRow_of_images {
                type
                label
                fields {
                  single_img
                }
              }
            }
            header {
              ... on PRISMIC_AboutHeaderHeadline_block {
                type
                label
                primary {
                  article_subtitle
                  article_headline_img
                  article_headline
                }
              }
            }
          }
        }
      }
    }
  }
`
