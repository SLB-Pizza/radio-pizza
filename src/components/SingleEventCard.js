import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import NanoClamp from 'nanoclamp'
import { RichText } from 'prismic-reactjs'
import { FallbackImage, formatDateTime, linkResolver } from '../utils'

function SingleEventCard({ eventColumnLayout, eventData }) {
  const [eventDateLocation, setEventDateLocation] = useState(null)

  const {
    _meta,
    main_event_image,
    event_name,
    event_location,
    event_blurb,
    event_start,
    event_end,
  } = eventData

  useEffect(() => {
    const makeDateLocationStr = () => {
      let resultString = ''

      if (event_start) {
        const start = formatDateTime(event_start, 'year-month-day')
        resultString += start
      }

      if (event_end) {
        const end = formatDateTime(event_end, 'year-month-day')
        resultString += ` - ${end}`
      }

      if (event_location) {
        resultString += ` | ${event_location}`
      }

      setEventDateLocation(resultString)
    }
    return makeDateLocationStr()
  })

  return (
    <article className={eventColumnLayout}>
      <Link to={linkResolver(_meta)}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-1by1">
              {main_event_image ? (
                <img src={main_event_image.url} alt={main_event_image.alt} />
              ) : (
                <FallbackImage />
              )}
            </figure>
          </div>
          <div className="card-content">
            <div className="event-card-sizing">
              <div className="details">
                {eventDateLocation && (
                  <NanoClamp
                    className="subtitle is-size-7 has-text-light-grey"
                    is="p"
                    lines={2}
                    text={eventDateLocation}
                  />
                )}
                {event_name && (
                  <NanoClamp
                    className="title is-size-6"
                    is="p"
                    lines={2}
                    text={RichText.asText(event_name)}
                  />
                )}
              </div>
              {event_blurb && (
                <NanoClamp
                  className="blurb is-size-6 has-text-white"
                  is="p"
                  lines={3}
                  ellipsis={'...'}
                  text={RichText.asText(event_blurb)}
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default SingleEventCard
