import React from 'react'
import { RichText } from 'prismic-reactjs'
import { formatDateTime } from '../utils'

/**
 * Renders a single {@link EventTemplate}'s date, start time, end time, and location inside {@link EventHeader}. All props received from {@link EventHeader}.
 * @category Layout Helper
 * @function EventDateTimeLocationInfo
 * @param {Boolean} isSticky
 * @param {Boolean} hasEventButton
 * @param {String} start
 * @param {String} end
 * @param {String} location
 * @param {String} eventName
 * @returns {jsx}
 */
export default function EventDateTimeLocationInfo({
  isSticky,
  hasEventButton,
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
        hasEventButton
          ? 'column is-hidden-mobile'
          : 'column is-12 is-hidden-mobile'
      }
    >
      <div className="content">
        {eventName?.length && (
          <p
            className={
              isSticky
                ? 'title is-size-5'
                : 'title is-size-4-tablet is-size-5-mobile'
            }
          >
            {RichText.asText(eventName)}
          </p>
        )}

        <p
          className={
            isSticky
              ? 'subtitle is-7'
              : 'subtitle is-size-6-tablet is-size-7-mobile'
          }
        >
          {eventInfoString}
        </p>
      </div>
    </div>
  )
}
