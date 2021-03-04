import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { EventHeader, EventMapEmbed } from '../components'
import { formatDateTime, htmlSerializer, linkResolver } from '../utils'

/**
 * @category Templates
 * @function EventsTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function EventTemplate({ data }) {
  const prismicContent = data.prismic.allEvents.edges[0]
  if (!prismicContent) return null
  const eventData = prismicContent.node

  const {
    event_start,
    event_end,
    event_blurb,
    main_event_image,
    event_name,
    event_location,
    event_location_physical_address,
    event_location_link,
    event_header_button_text,
    event_header_button_link,
  } = eventData

  /**
   * Boolean to ensure that BOTH location and location link data are present in order to render the link
   */
  const displayEventMap = event_location && event_location_physical_address

  return (
    <main className="full-height-page">
      <article>
        <header className="hero event-image">
          <div
            className="hero-body"
            style={{
              backgroundImage: `url(${main_event_image.url})`,
            }}
          />
        </header>

        <EventHeader
          startDate={event_start}
          endDate={event_end}
          location={event_location}
          eventName={event_name}
          headerButtonText={event_header_button_text}
          headerButtonLink={event_header_button_link}
        />

        <section className="section container" id="event-blurb">
          <div className="columns is-mobile">
            <div className="column is-12">
              <div className="content">
                <RichText
                  render={event_blurb}
                  linkResolver={linkResolver}
                  htmlSerializer={htmlSerializer}
                />
              </div>

              {displayEventMap && (
                <>
                  <p className="title is-size-4-tablet is-size-5-mobile">
                    Getting to {event_location}
                  </p>
                  <EventMapEmbed
                    locationName={event_location}
                    address={event_location_physical_address}
                  />
                </>
              )}
            </div>
          </div>
        </section>
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
            event_location_physical_address
            event_location_link {
              ... on PRISMIC__ExternalLink {
                target
                url
              }
            }
            event_header_button_text
            event_header_button_link {
              ... on PRISMIC__ExternalLink {
                target
                _linkType
                url
              }
            }
          }
        }
      }
    }
  }
`
