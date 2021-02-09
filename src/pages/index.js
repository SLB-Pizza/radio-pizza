import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import '../styles/index.scss'
import { Hero, HomeMixes, HomeEvents, HomeFeatures } from '../components'

/**
 * @category Pages
 * @function IndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the layout for index route, `/`
 * @returns {jsx}
 */
function IndexPage({ data }) {
  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * Details: https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
   */
  if (!data) return null

  // Focus the node for the prismicContent check below.
  const homepageData = data.prismic.allHomepages.edges[0]
  // const homeMixesData = data.prismic.allMixs.edges;
  const homeEventsData = data.prismic.allEvents.edges
  const homeFeaturesData = data.prismic.allFeatures.edges

  /**
   * Create objects by pulling data values from carouselSlidesData to pass as props to components in return statement.
   */
  const {
    home_mixes_headline,
    home_mixes_blurb,
    home_events_headline,
    home_events_blurb,
    home_features_headline,
    home_features_blurb,
    homepage_carousel,
    home_mixes,
    editorials,
  } = homepageData.node

  return (
    <div className="has-navbar-fixed-bottom full-height-page">
      <Hero slides={homepage_carousel} />
      <HomeMixes
        headline={home_mixes_headline}
        blurb={home_mixes_blurb}
        homeMixesData={home_mixes}
      />
      <HomeEvents
        headline={home_events_headline}
        blurb={home_events_blurb}
        homeEventsData={homeEventsData}
      />
      <HomeFeatures
        headline={home_features_headline}
        blurb={home_features_blurb}
        homeFeaturesData={homeFeaturesData}
      />
    </div>
  )
}

export const query = graphql`
  query IndexPageQuery {
    prismic {
      allHomepages {
        edges {
          node {
            home_mixes_headline
            home_mixes_blurb
            home_features_headline
            home_features_blurb
            home_events_headline
            home_events_blurb
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
              home_feature {
                ... on PRISMIC_Feature {
                  _linkType
                  headline_block {
                    ... on PRISMIC_FeatureHeadline_blockHeadline_block {
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
              sound_select {
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
      allFeatures(sortBy: meta_firstPublicationDate_DESC, first: 4) {
        edges {
          node {
            _meta {
              uid
              type
              firstPublicationDate
              lastPublicationDate
            }
            headline_block {
              ... on PRISMIC_FeatureHeadline_blockHeadline_block {
                primary {
                  article_category
                  article_subcategory
                  article_headline_img
                  article_headline
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

export default IndexPage

// Mix img square sizes
// --- MOBILE ---
// --- min-max avg:  513.5---
// --- mean:  495.67---
// 767  - 695

// 768  - 332
// 1023 - 460

// --- DESKTOP ---
// --- min-max avg:  350---
// --- mean:  329.33---
// 1024 - 296
// 1215 - 360

// 1216 - 262
// 1407 - 310

// 1408 - 310
// 1920 - 438

// allMixs(sortBy: mix_date_DESC, first: 12) {
//   edges {
//     node {
//       _meta {
//         uid
//         lastPublicationDate
//         firstPublicationDate
//         type
//         tags
//       }
//       featured_residents {
//         mix_resident {
//           ... on PRISMIC_Resident {
//             _meta {
//               uid
//               type
//             }
//             resident_name
//           }
//         }
//       }
//       mix_date
//       mix_image
//       mix_link
//       mix_title
//     }
//   }
// }
