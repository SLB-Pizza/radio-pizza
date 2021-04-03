import React, { Fragment, useEffect, useState } from 'react'
import {
  EventHeader,
  EventMapEmbed,
  EventTemplateImageHeader,
  HMBKDivider,
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

  const [hasMap, setHasMap] = useState(null)
  const [hasInfo, setHasInfo] = useState(null)
  const [hasStream, setHasStream] = useState(null)

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
      }
    }
    return setEventCategoryData()
  }, [])

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

        {hasInfo && (
          <section className="section container">
            <div className="columns is-mobile is-multiline">
              <div className="column is-12 content event-section-title">
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
              <div className="column is-12 content event-section-title">
                <p className="title is-4">Livestreams</p>
              </div>
              <RichTextHelper richText={event_livestream_embed} />
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

export default SampleEventTemplate
