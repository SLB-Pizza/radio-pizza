import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import {
  HomeMixes,
  HomeEvents,
  HomeFeatures,
  StickyItemsLayout,
  SingleMixCard,
  SingleEventCard,
  SingleFeatureCard,
  useSiteMetadata,
} from '../components'
import { HMBKFooter } from '../components/helpers'
import { FallbackImage } from '../utils'

/**
 * Renders the `404` page when taken to a bad route.
 * @category Pages
 * @function NotFoundPage
 * @param {Object} data - sourced from Prismic
 * @returns {jsx}
 */
export default function NotFoundPage({ data }) {
  const prismicContent = data.prismic
  if (!prismicContent) return null

  const { titling, radios, editorials, events } = prismicContent
  const {
    home_mixes_titling,
    home_mixes_blurb,
    home_events_titling,
    home_events_blurb,
    home_editorial_titling,
    home_editorial_blurb,
  } = titling.edges[0].node

  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()
  const smallCardLayout = 'column is-3-desktop is-6-tablet is-12-mobile'
  const largeCardLayout = 'column is-6-desktop is-12-touch'

  return (
    <main className="black-bg-page">
      <Helmet defer={false}>
        <title>{`404 | ${title}`}</title>
      </Helmet>

      <header className="container is-fluid">
        <div className="section is-medium columns is-mobile is-multiline is-centered is-vcentered">
          <div className="column is-narrow">
            <figure className="image is-128x128 is-hidden-touch">
              <FallbackImage styleName={'lazyload'} />
            </figure>
            <figure className="image is-96x96 is-hidden-desktop">
              <FallbackImage styleName={'lazyload'} />
            </figure>
          </div>
          <div className="column is-narrow">
            <h1 className="title is-size-1-widescreen is-size-2-desktop is-size-3-touch has-text-centered">
              404
            </h1>
            <p className="subtitle is-size-3-widescreen is-size-4-desktop is-size-5-touch has-text-centered">
              Looks like you're a bit lost.
            </p>
          </div>
          <div className="column is-12">
            <p className="is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-centered">
              Why not check out one of the following since you're here?
            </p>
          </div>
        </div>
      </header>

      <StickyItemsLayout
        headline={home_mixes_titling}
        blurb={home_mixes_blurb}
        linkURL={'/radio'}
        linkBtnText={'All Radio'}
        itemsToMap={radios.edges}
        layout={'column is-9-mobile is-two-fifths-tablet is-4-desktop'}
        ItemComponent={SingleMixCard}
      />
      <StickyItemsLayout
        headline={home_events_titling}
        blurb={home_events_blurb}
        linkURL={'/events'}
        linkBtnText={'All Events'}
        itemsToMap={events.edges}
        layout={'column is-9-mobile is-two-fifths-tablet is-4-desktop'}
        ItemComponent={SingleEventCard}
      />
      <StickyItemsLayout
        headline={home_editorial_titling}
        blurb={home_editorial_blurb}
        linkURL={'/editorial'}
        linkBtnText={'All Editorial'}
        itemsToMap={editorials.edges}
        layout={'column is-6-tablet is-four-fifths-mobile'}
        ItemComponent={SingleFeatureCard}
      />

      <HMBKFooter />
    </main>
  )
}

export const query = graphql`
  query NotFoundPageQuery {
    prismic {
      titling: allHomepages {
        edges {
          node {
            home_mixes_titling
            home_mixes_blurb
            home_events_titling
            home_events_blurb
            home_editorial_titling
            home_editorial_blurb
          }
        }
      }
      events: allEvents(first: 3, sortBy: meta_lastPublicationDate_DESC) {
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
      editorials: allFeatures(first: 2, sortBy: meta_lastPublicationDate_DESC) {
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
          }
        }
      }
      radios: allMixs(first: 3, sortBy: mix_date_DESC) {
        edges {
          node {
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
`
