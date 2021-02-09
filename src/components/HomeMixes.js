import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { SingleMixCard } from './index'

/**
 * Returns the Mixes content section of the Homepage, directly underneath the {@link Hero} section.
 * @category Site Elements
 * @function HomeMixes
 * @param {Object} data - from HomeMixesQuery
 * @property {Object} data.prismic.allHomepages.edges[0] - data node object containing the RichText objects for the Home Mixes headline and blurb
 * @property {Object[]} data.prismic.allMixs.edges - Array of mix data objects to map the {@link SingleMixCard} component over
 * @returns {jsx}
 */
function HomeMixes({ headline, blurb, homeMixesData }) {
  /**
   * The string passed into {@link SingleMixCard} that defines the column sizing for the mix cards in the Mixes section of the Homepage.
   */
  const homeMixesLayout = 'column is-9-mobile is-two-fifths-tablet is-4-desktop'

  return (
    <div className="section container is-fluid" id="home-mixes">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb content">
            {headline && <p className="title">{RichText.asText(headline)}</p>}
            {blurb && <p className="subtitle">{RichText.render(blurb)}</p>}
            <Link to="/mixes">
              <button className="button is-outlined is-rounded">
                All Mixes
              </button>
            </Link>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            {homeMixesData.length &&
              homeMixesData.map(({ sound_select }, index) => {
                return (
                  <SingleMixCard
                    key={`mixes-page-#${index}`}
                    mixData={sound_select}
                    columnLayout={homeMixesLayout}
                  />
                )
              })}
          </div>
        </div>
      </div>
      {/* TOUCH */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          {headline && (
            <p className="title is-4">{RichText.asText(headline)}</p>
          )}
          {blurb && <p className="subtitle is-6">{RichText.asText(blurb)}</p>}
        </div>
        <div className="column is-narrow">
          <Link to="/mixes">
            <button className="button is-small is-outlined is-rounded">
              All Mixes
            </button>
          </Link>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {homeMixesData.length &&
          homeMixesData.map(({ sound_select }, index) => {
            return (
              <SingleMixCard
                key={`mixes-page-#${index}`}
                mixData={sound_select}
                columnLayout={homeMixesLayout}
              />
            )
          })}
      </div>
    </div>
  )
}

export default HomeMixes
