import React from 'react'
import { Link } from 'gatsby'

import { HomeSingleEvent } from './index'

function HomeEvents() {
  return (
    <div className="container is-fluid" id="home-events">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="display-text is-size-3">Live Events</p>
            <p className="subtitle is-size-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <Link to="/events">
              <button className="button is-small is-outlined is-rounded">
                All Events
              </button>
            </Link>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            <HomeSingleEvent />
            <HomeSingleEvent />
            <HomeSingleEvent />
          </div>
        </div>
      </div>
      {/* TOUCH */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          <p className="display-text is-size-4">Live Events</p>
        </div>
        <div className="column is-narrow">
          <Link to="/events">
            <button className="button is-small is-outlined is-rounded">
              All Events
            </button>
          </Link>
        </div>
        <div className="column is-12">
          <p className="subtitle is-size-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        <HomeSingleEvent />
        <HomeSingleEvent />
        <HomeSingleEvent />
        <HomeSingleEvent />
        <HomeSingleEvent />
        <HomeSingleEvent />
        <HomeSingleEvent />
        <HomeSingleEvent />
      </div>
    </div>
  )
}

export default HomeEvents
