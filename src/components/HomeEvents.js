import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { HomeSingleEvent } from './index'

function HomeEvents({ blurb, headline }) {
  return (
    <div className="container is-fluid" id="home-events">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb content">
            <p className="title">{RichText.asText(headline)}</p>
            <p className="subtitle">{RichText.render(blurb)}</p>
            <Link to="/events">
              <button className="button is-outlined is-rounded">
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
          <p className="title is-4">{RichText.asText(headline)}</p>
          <p className="subtitle is-6">{RichText.asText(blurb)}</p>
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
