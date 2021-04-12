import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import {
  AboutPageCredits,
  AboutPageHero,
  AboutPageTitling,
  SliceZone,
} from '../../components'
import { HMBKFooter } from '../../components/helpers'
import useSiteMetadata from '../../components/SiteMetadata'

/**
 * Layout for /about page.
 * @function AboutIndexPage
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @returns {jsx}
 */
export default function AboutIndexPage({ data }) {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()

  const prismicContent = data.prismic.allAbouts.edges[0].node

  if (!prismicContent) return null

  const { body, header } = prismicContent
  const { primary: aboutHeroData } = header[0]
  return (
    <main className="full-height-page">
      <Helmet defer={false}>
        <html lang="en" />
        <title>{`About | ${title}`}</title>
        <meta
          name="description"
          content={`About | HalfmoonBK Radio - ${description}`}
        />
        <meta name="theme-color" content="#f600ff" />
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={`About | ${title}`} />
        <meta property="og:url" content={`${siteUrl}/about`} />
        <meta property="og:image" content={`/img/HalfMoon-3.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`About | ${title}`} />
        <meta name="twitter:description" content="About | HalfmoonBK Radio" />
        <meta name="twitter:site" content={twitterUsername} />
        <meta name="twitter:image" content={`/img/HalfMoon-3.png`} />
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
              ... on PRISMIC_AboutBodyText_columns {
                type
                label
                fields {
                  text_column
                }
                primary {
                  text_columns_footer
                  text_columns_header
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
