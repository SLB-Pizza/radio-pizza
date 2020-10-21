import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { SingleMixCard } from './index'

/**
 * Returns the Mixes content section of the Homepage, directly underneath the {@link Hero} section.
 * @category Site Elements
 * @subcategory Layout Section
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
    <div className="container is-fluid" id="home-mixes">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="display-text is-size-3">
              {RichText.asText(headline)}
            </p>
            <div className="content">{RichText.render(blurb)}</div>
            <Link to="/mixes">
              <button className="button is-small is-outlined is-rounded display-text">
                All Mixes
              </button>
            </Link>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            {homeMixesData.map(({ node }, index) => {
              return (
                <SingleMixCard
                  key={`mixes-page-#${index}`}
                  mixData={node}
                  columnLayout={homeMixesLayout}
                />
              )
            })}
          </div>
        </div>
      </div>
      {/* TOUCH */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop mobile-home-content">
        <div className="column">
          <p className="display-text is-size-4">Daily Mixes</p>
        </div>
        <div className="column is-narrow">
          <Link to="/mixes">
            <button className="button is-small is-outlined is-rounded">
              All Mixes
            </button>
          </Link>
        </div>
        <div className="column is-12 mobile-home-description">
          <p className="subtitle is-size-6">
            These dummy mixes are the same as the ones on the sample bio page.
            You can hover/touch and play them the same way. Try it!
          </p>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {homeMixesData.map(({ node }, index) => {
          return (
            <SingleMixCard
              key={`mixes-page-#${index}`}
              mixData={node}
              columnLayout={homeMixesLayout}
            />
          )
        })}
      </div>
    </div>
  )
}

export default HomeMixes
