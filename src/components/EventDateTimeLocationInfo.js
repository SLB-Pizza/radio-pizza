import React from 'react'
import { RichText } from 'prismic-reactjs'
import { formatDateTime } from '../utils'
import Nanoclamp from 'nanoclamp'

/**
 * Renders a single {@link EventTemplate}'s date, start time, end time, and location inside {@link EventHeader}. All props received from {@link EventHeader}.
 * @category Layout Helper
 * @function EventDateTimeLocationInfo
 * @param {Boolean} isSticky
 * @param {Boolean} renderEventButton
 * @param {String} start
 * @param {String} end
 * @param {String} location
 * @param {String} eventName
 * @returns {jsx}
 */
export default function EventDateTimeLocationInfo({
  isSticky,
  renderEventButton,
  start,
  end,
  location,
  eventName,
}) {
  const startText = start ? formatDateTime(start, 'long-form-date-time') : null
  const endText = end ? formatDateTime(end, 'long-form-date-time') : null

  /**
   * Build the `eventInfoString` that will will be rendered by the component.
   */
  let eventInfoString = ''
  if (startText) {
    eventInfoString += startText
    if (endText) {
      eventInfoString += ` to ${endText}`
    }
  }
  if (location) {
    eventInfoString += ` | ${location}`
  }

  return (
    <div
      className={
        renderEventButton ? 'column is-9-tablet is-8-mobile' : 'column is-12'
      }
    >
      <div className="content">
        {eventName?.length && (
          <Nanoclamp
            className={
              isSticky
                ? 'title is-size-5-tablet is-size-6-mobile'
                : 'title is-size-4-tablet is-size-5-mobile'
            }
            is="h1"
            lines={2}
            text={RichText.asText(eventName)}
          />
        )}

        {eventInfoString && (
          <Nanoclamp
            is="p"
            className={
              isSticky
                ? 'subtitle is-size-7'
                : 'subtitle is-size-6-tablet is-size-7-mobile'
            }
            lines={1}
            text={eventInfoString}
          />
        )}
      </div>
    </div>
  )
}
