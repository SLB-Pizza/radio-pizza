import React from 'react'
import { Link } from 'gatsby'
import { SingleEventCard } from './index'

/**
 * Returns the Events content section of the Homepage.
 * @category Layout Section
 * @function HomeEvents
 * @param {String} headline - the label for this section
 * @param {String} blurb - short description to give the user context
 * @param {Object[]} homeEventsData - Array of data from Prismic received from /index; original data set in Prismic Homepage document
 * @returns {jsx}
 */
function HomeEvents({ blurb, headline, homeEventsData }) {
  const eventPageLayout = 'column is-9-mobile is-two-fifths-tablet is-4-desktop'

  return (
    <div className="container is-fluid" id="home-events">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section content">
            {headline && <h3 className="title">{headline}</h3>}
            {blurb && <p className="subtitle">{blurb}</p>}
            <Link to="/events">
              <button className="button is-outlined is-rounded">
                All Events
              </button>
            </Link>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            {homeEventsData?.map(({ node }, index) => (
              <SingleEventCard
                key={`halfmoon-event-${index}`}
                data={node}
                columnLayout={eventPageLayout}
              />
            ))}
          </div>
        </div>
      </div>
      {/* TOUCH */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          {headline && <h3 className="title is-4">{headline}</h3>}
          {blurb && <p className="subtitle is-6">{blurb}</p>}
        </div>
        <div className="column is-narrow">
          <Link to="/events">
            <button className="button is-small is-outlined is-rounded">
              All Events
            </button>
          </Link>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {homeEventsData?.map(({ node }, index) => (
          <SingleEventCard
            key={`halfmoon-event-${index}`}
            data={node}
            columnLayout={eventPageLayout}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeEvents
