import React from 'react'
import { graphql } from 'gatsby'
import { Hero, HomeMixes, HomeEvents, HomeFeatures } from '../components'
import '../styles/index.scss'

/**
 * Layout for the Index Page of the site.
 * @category Pages
 * @function IndexPage
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to build the layout for index route, `/`
 * @returns {jsx}
 */
function IndexPage({ data }) {
  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * @see {@link https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check Retrieve the document object}
   */
  const prismicContent = data.prismic
  if (!prismicContent) return null

  // Focus the node for the prismicContent check below.
  const homepageData = prismicContent.allHomepages.edges[0]
  const homeEventsData = prismicContent.allEvents.edges

  /**
   * Deconstruct homepageData
   */
  const {
    home_mixes_titling,
    home_mixes_blurb,
    home_events_titling,
    home_events_blurb,
    home_editorial_titling,
    home_editorial_blurb,
    homepage_carousel,
    home_mixes,
    editorials,
  } = homepageData.node

  return (
    <main className="has-navbar-fixed-bottom full-height-page">
      <Hero slides={homepage_carousel} />
      <HomeMixes
        headline={home_mixes_titling}
        blurb={home_mixes_blurb}
        homeMixesData={home_mixes}
      />
      <HomeEvents
        headline={home_events_titling}
        blurb={home_events_blurb}
        homeEventsData={homeEventsData}
      />
      <HomeFeatures
        headline={home_editorial_titling}
        blurb={home_editorial_blurb}
        homeFeaturesData={editorials}
      />
    </main>
  )
}

export const query = graphql`
  query IndexPageQuery {
    prismic {
      allHomepages {
        edges {
          node {
            home_mixes_titling
            home_mixes_blurb
            home_events_titling
            home_events_blurb
            home_editorial_titling
            home_editorial_blurb
            homepage_carousel {
              slide_bg
              slide_cta
              slide_headline
              slide_link {
                ... on PRISMIC__ExternalLink {
                  target
                  _linkType
                  url
                }
                ... on PRISMIC_Feature {
                  _linkType
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Support {
                  support_cta
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Schedule {
                  schedule_date
                  _linkType
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Mix {
                  mix_image
                  mix_title
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Landingpage {
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Resident {
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Event {
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Homepage {
                  _meta {
                    uid
                    type
                  }
                }
              }
            }
            editorials {
              node {
                ... on PRISMIC_Feature {
                  header {
                    ... on PRISMIC_FeatureHeaderHeadline_block {
                      primary {
                        article_subtitle
                        article_subcategory
                        article_headline_img
                        article_headline
                        article_category
                      }
                    }
                  }
                  _meta {
                    uid
                    type
                    lastPublicationDate
                  }
                }
              }
            }
            home_mixes {
              node {
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
                        _meta {
                          uid
                          type
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
      allEvents(sortBy: event_start_DESC, first: 6) {
        edges {
          node {
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
        }
      }
    }
  }
`

export default IndexPage
