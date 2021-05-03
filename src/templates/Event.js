import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import {
  ContainedImageHero,
  EventHeader,
  EventMapEmbed,
  HMBKDivider,
  SingleMixCard,
  useSiteMetadata,
} from '../components'
import { mappableDataFilter } from '../utils'
import { RichTextHelper } from '../components/helpers'
import { RichText } from 'prismic-reactjs'

/**
 * Render a single Event Prismic CMS entry.
 * @category Templates
 * @function EventsTemplate
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function EventTemplate({ data, path }) {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()
  const prismicContent = data.prismic.allEvents.edges[0].node
  if (!prismicContent) return null

  const [hasMap, setHasMap] = useState(null)
  const [hasInfo, setHasInfo] = useState(null)
  const [hasStream, setHasStream] = useState(null)
  const [eventMixes, setEventMixes] = useState(null)

  let {
    event_start,
    event_end,
    event_blurb,
    main_event_image,
    event_name,
    event_location,
    event_location_physical_address,
    event_header_button_text,
    event_header_button_link,
    event_livestream_embed,
    event_mixes,
  } = prismicContent

  /**
   * @category useEffect
   * @name setEventCategoryData
   */
  useEffect(() => {
    const setEventCategoryData = () => {
      if (data) {
        if (event_blurb) {
          setHasInfo(true)
        }

        /**
         * Boolean to ensure that BOTH location and location link data are present in order to render the link
         */
        const displayEventMap =
          event_location && event_location_physical_address
        if (displayEventMap) {
          setHasMap(true)
        }

        if (event_livestream_embed) {
          setHasStream(true)
        }

        const filteredMixes = mappableDataFilter(event_mixes)
        if (filteredMixes) {
          setEventMixes(filteredMixes)
        }
      }
    }
    return setEventCategoryData()
  }, [data])

  const helmetTitle = event_name ? RichText.asText(event_name) : 'HMBK Event'

  return (
    <main className="full-height-page">
      <Helmet defer={false}>
        <title>{`${helmetTitle} | ${title}`}</title>
        <meta property="og:title" content={`${title} | ${helmetTitle}`} />
        <meta property="og:url" content={`${siteUrl}${path}/`} />
        <meta name="twitter:title" content={`About | ${title}`} />
      </Helmet>
      <article>
        <ContainedImageHero image={main_event_image} isHeader={true} />
        <EventHeader
          startDate={event_start}
          endDate={event_end}
          location={event_location}
          eventName={event_name}
          headerButtonText={event_header_button_text}
          headerButtonLink={event_header_button_link}
        />

        {hasInfo && (
          <section className="section container">
            <div className="columns is-mobile is-multiline">
              <div className="column is-12 content">
                <p className="title is-4">Info</p>
              </div>
              <RichTextHelper richText={event_blurb} />
            </div>
          </section>
        )}

        {hasMap && (
          <EventMapEmbed
            locationName={event_location}
            address={event_location_physical_address}
          />
        )}

        {hasStream && (
          <section className="section container">
            <div className="columns is-mobile is-multiline">
              <div className="column is-12 content">
                <p className="title is-4">Livestreams</p>
              </div>
              <RichTextHelper richText={event_livestream_embed} />
            </div>
          </section>
        )}

        {eventMixes && (
          <section className="section container">
            <div className="columns is-mobile is-multiline">
              <div className="column is-12 content">
                <p className="title is-4">Mixes From This Event</p>
              </div>
              {eventMixes?.map(({ event_mix }, index) => (
                <SingleMixCard
                  key={`single-event-mix-${index}`}
                  data={event_mix}
                  columnLayout={
                    'column is-12-mobile is-6-tablet is-4-widescreen'
                  }
                />
              ))}
            </div>
          </section>
        )}

        <footer className="section container">
          <div className="columns is-mobile is-vcentered">
            <HMBKDivider />
          </div>
        </footer>
      </article>
    </main>
  )
}

export default EventTemplate

export const query = graphql`
  query EventTemplateQuery($uid: String) {
    prismic {
      allEvents(uid: $uid, sortBy: event_start_DESC) {
        edges {
          node {
            event_blurb
            main_event_image
            event_name
            event_end
            event_start
            event_location
            event_livestream_embed
            event_location_physical_address
            event_header_button_text
            event_header_button_link {
              ... on PRISMIC__ExternalLink {
                target
                _linkType
                url
              }
            }
            event_mixes {
              event_mix {
                ... on PRISMIC_Mix {
                  _meta {
                    uid
                    type
                    tags
                  }
                  mix_image
                  mix_title
                  mix_date
                  mix_link
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
`
