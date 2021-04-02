import React, { Fragment, useEffect, useState } from 'react'
import {
  EventHeader,
  EventMapEmbed,
  EventTemplateImageHeader,
} from '../../../components'
import { RichTextHelper } from '../../../components/helpers'
import { toggleColumn } from '../../../utils'
import eventTemplateSampleData from './data/EventTemplate.json'

/**
 * Render the EventTemplate sample Prismic CMS entry.
 * @category Sample Pages
 * @function SampleEventTemplate
 * @returns {jsx}
 */
function SampleEventTemplate() {
  if (!eventTemplateSampleData) return null

  const [isOpen, setIsOpen] = useState(null)
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
    event_livestream_embed,
  } = eventTemplateSampleData

  /**
   * @category useEffect
   * @name setEventCategoryData
   */
  useEffect(() => {
    const setEventCategoryData = () => {
      if (eventTemplateSampleData) {
        let labels = []

        if (event_blurb) {
          labels.push('Info')
        }

        /**
         * Boolean to ensure that BOTH location and location link data are present in order to render the link
         */
        const displayEventMap =
          event_location && event_location_physical_address
        if (displayEventMap) {
          labels.push('Map')
        }

        if (event_livestream_embed) {
          labels.push('Livestream')
        }
        /**
         * Set categoryLabels based on available data.
         * Set isOpen to the first entry of categoryLabels
         */
        setCategoryLabels(labels)
        setIsOpen(labels[0])
      }
    }
    return setEventCategoryData()
  }, [eventTemplateSampleData])

  event_blurb = null
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

        <section className="container event-info-buttons">
          <div className="columns is-mobile is-vcentered">
            {categoryLabels?.map((category, index) => (
              <Fragment key={`HMBK-${category}-${index}`}>
                {/* DESKTOP SIZED BUTTONS */}
                <div className="column is-hidden-mobile">
                  <button
                    className={
                      isOpen === category
                        ? 'button is-fullwidth is-outlined is-rounded is-focused'
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
                        ? 'button is-small is-fullwidth is-outlined is-rounded is-focused'
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

        {isOpen === 'Info' || isOpen === null ? (
          <section className="section container">
            <div className="columns">
              {event_blurb && <RichTextHelper richText={event_blurb} />}
            </div>
          </section>
        ) : null}

        {isOpen === 'Map' ? (
          <>
            {event_location && event_location_physical_address && (
              <EventMapEmbed
                locationName={event_location}
                address={event_location_physical_address}
              />
            )}
          </>
        ) : null}

        {isOpen === 'Livestream' ? (
          <section className="section container">
            <div className="columns">
              {event_livestream_embed && (
                <RichTextHelper richText={event_livestream_embed} />
              )}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  )
}

export default SampleEventTemplate
