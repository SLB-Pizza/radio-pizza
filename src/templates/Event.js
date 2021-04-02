import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import {
  EventHeader,
  EventMapEmbed,
  EventTemplateImageHeader,
} from '../components'
import { htmlSerializer, linkResolver, toggleColumn } from '../utils'
import { RichTextHelper } from '../components/helpers'

/**
 * Render a single Event Prismic CMS entry.
 * @category Templates
 * @function EventsTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function EventTemplate({ data }) {
  const prismicContent = data.prismic.allEvents.edges[0].node
  if (!prismicContent) return null

  const [isOpen, setIsOpen] = useState('Info')
  const [categoryLabels, setCategoryLabels] = useState(null)

  let {
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
  } = prismicContent

  /**
   * @category useEffect
   * @name setEventCategoryData
   */
  useEffect(() => {
    const setEventCategoryData = () => {
      if (data) {
        let labels = ['Info']

        /**
         * Boolean to ensure that BOTH location and location link data are present in order to render the link
         */
        const displayEventMap =
          event_location && event_location_physical_address
        if (displayEventMap) {
          labels.push('Map')
        }
        setCategoryLabels(labels)
      }
    }
    return setEventCategoryData()
  }, [data])

  return (
    <main className="full-height-page">
      <article>
        <EventTemplateImageHeader eventImage={main_event_image} />
        <EventHeader
          startDate={event_start}
          endDate={event_end}
          location={event_location}
          eventName={event_name}
          headerButtonText={event_header_button_text}
          headerButtonLink={event_header_button_link}
        />

        <section className="container">
          <div className="columns is-mobile">
            {categoryLabels?.map((category, index) => (
              <Fragment key={`HMBK-${category}-${index}`}>
                {/* DESKTOP SIZED BUTTONS */}
                <div className="column is-hidden-mobile">
                  <button
                    className={
                      isOpen === category
                        ? 'button active is-fullwidth is-outlined is-rounded'
                        : 'button is-fullwidth is-outlined is-rounded'
                    }
                    id={category}
                    onClick={() => {
                      toggleColumn(category, isOpen, setIsOpen)
                    }}
                  >
                    {category}
                  </button>
                </div>
                {/* TOUCH SIZED BUTTONS */}
                <div className="column is-hidden-tablet">
                  <button
                    className={
                      isOpen === category
                        ? 'button is-small active is-fullwidth is-outlined is-rounded'
                        : 'button is-small is-fullwidth is-outlined is-rounded'
                    }
                    id={category}
                    onClick={() => {
                      toggleColumn(category, isOpen, setIsOpen)
                    }}
                  >
                    {category}
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
        </section>

        {isOpen === 'Info' ? (
          <section className="section container">
            <div className="columns is-mobile">
              <RichTextHelper richText={event_blurb} />
            </div>
          </section>
        ) : null}

        {isOpen === 'Map' ? (
          <EventMapEmbed
            locationName={event_location}
            address={event_location_physical_address}
          />
        ) : null}
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
