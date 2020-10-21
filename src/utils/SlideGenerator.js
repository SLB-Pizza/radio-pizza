import React from 'react'
import { navigate } from 'gatsby'
import { RichText } from 'prismic-reactjs'

/**
 * @category Site Elements
 * @subcategory Layout Helper
 * @function
 * @param {Object} background - Object containing the image's URL and alt data
 * @param {String} background.url - The URL from Prismic of that slide's background image. This can be a relative local path (e.g. "/static/something-local.jpg") or an external image link (e.g. "https://source.unsplash.com/1920x1080/daily?music"). Both work.
 * @param {String} headline - Short string announcing that slide's content
 * @param {String} cta - Medium string giving context to that slide's content; might be a call to action or a breadcrumb for the reader
 * @param {String} link - Object containing the onClick URL
 * @param {String} link.url - The link to navigate to onClick, This can either be an internal link (e.g. "/events"), or an external link (e.g. "https://www.instagram.com").
 * @returns {jsx} a complete layout fragment for use in the return statement, inside the <Slider> component
 */
function SlideGenerator({ background, headline, link, cta }) {
  return (
    <section
      className="hero is-fullheight-with-navbar homepage-hero"
      style={{
        backgroundImage: `url(${background.url})`,
        pointerEvents: 'none',
      }}
    >
      <div
        className="hero-body"
        style={{ position: 'relative', zIndex: 9999999 }}
        onClick={() => {
          navigate(`${link.url}`)
        }}
      >
        <div className="container">
          <div className="columns">
            <div className="column">
              <h1
                className="title is-size-1-desktop is-size-3-touch is-size-5-mobile hero-title"
                style={{ pointerEvents: 'auto' }}
              >
                {RichText.asText(headline)}
              </h1>
              <br />
              <h2
                className="subtitle is-size-5-desktop is-size-5-touch is-size-7-mobile hero-title cta"
                style={{ pointerEvents: 'auto' }}
              >
                {RichText.asText(cta)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SlideGenerator
