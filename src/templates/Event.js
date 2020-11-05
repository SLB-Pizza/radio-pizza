import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { EventHeader } from '../components'
import { formatDateTime, htmlSerializer, linkResolver } from '../utils'

import dayjs from 'dayjs'

/**
 * @category Templates
 * @subcategory Event
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
    event_location_link,
    event_header_button_text,
    event_header_button_link,
  } = eventData

  const startTimeEST = formatDateTime(dayjs(event_start), 'UTC-to-EST')
  const endTimeEST =
    event_end !== null ? formatDateTime(dayjs(event_end), 'UTC-to-EST') : null

  /**
   * Boolean to ensure that BOTH location and location link data are present in order to render the link
   */
  const locationDetailsCheck = event_location && event_location_link

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
          startDate={startTimeEST}
          endDate={endTimeEST}
          location={event_location}
          eventName={event_name}
          headerButtonText={event_header_button_text}
          headerButtonLink={event_header_button_link}
        />
        <section className="section container">
          <div className="columns is-mobile">
            <div className="column is-12">
              <div className="content">
                <RichText
                  render={event_blurb}
                  linkResolver={linkResolver}
                  htmlSerializer={htmlSerializer}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="columns is-mobile"></div>
          {locationDetailsCheck && (
            <a href={event_location_link.url} target="_blank">
              {event_location}
            </a>
          )}
        </section>
        {/* <pre>{JSON.stringify(eventData, null, 2)}</pre> */}
        {/* <section
          className="container"
          style={{ backgroundColor: 'darkred', height: '15rem' }}
        ></section>
        <section
          className="container"
          style={{ backgroundColor: 'darkgrey', height: '15rem' }}
        ></section> */}
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
