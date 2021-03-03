import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { useQuery } from '@apollo/client'

import { SingleMixCard } from './index'
import { FILL_HOME_MIXES } from '../queries'
import { mappableDataFilter } from '../utils'

/**
 * Returns the Mixes content section of the Homepage, directly underneath the {@link Hero} section.
 * @category Site Elements
 * @function HomeMixes
 * @param {Array} headline - Prismic RichText object
 * @param {Array} blurb - Prismic RichText object
 * @param {Object[]} homeMixesData - Array of data from Prismic received from /index; original data set in Prismic Homepage document
 * @returns {jsx}
 */
function HomeMixes({ headline, blurb, homeMixesData }) {
  const [twelveMixes, setTwelveMixes] = useState(null)

  const filteredHomeMixes = mappableDataFilter(homeMixesData)
  const mixQueryCount = 12 - filteredHomeMixes.length

  /**
   * Uses the query {@link FILL_HOME_MIXES} to fetch `mixQueryCount` number of mixes to set twelvesMixes to map.
   */
  const { data, loading, error } = useQuery(FILL_HOME_MIXES, {
    variables: { count: mixQueryCount },
  })

  useEffect(() => {
    const fetchRemainingHomeMixes = () => {
      /**
       * Three scenarios:
       * 1) homeMixesData has more than 12 mix objects
       * 2) homeMixesData has less than 12 mix objects
       * 3) homeMixesData has exactly 12 mix objects
       */
      if (filteredHomeMixes.length > 12) {
        /**
         * Scenario 1
         * Grab only the first 12 mixes
         */
        const mixesToMap = filteredHomeMixes.slice(0, 13)
        setTwelveMixes(mixesToMap)
      } else if (filteredHomeMixes.length < 12) {
        /**
         * Scenario 2
         * Subtract quantity of filteredHomeMixes from 12
         * Query for that many of the most recent mixes
         * Spread that data into the filteredHomeMixes array
         * setTwelveMixes the new 12 mix filteredHomeMixes
         */

        if (data) {
          const fetchedRecentMixes = data.allMixs.edges
          const newTwelveMixes = [...filteredHomeMixes, ...fetchedRecentMixes]
          setTwelveMixes(newTwelveMixes)
        }
      } else {
        /**
         * Scenario 3
         * we have exactly 12 mixes; directly setTwelveMixes off it
         */
        setTwelveMixes(filteredHomeMixes)
      }
    }

    return fetchRemainingHomeMixes()
  }, [homeMixesData, data])

  /**
   * The string passed into {@link SingleMixCard} that defines the column sizing for the mix cards in the Mixes section of the Homepage.
   */
  const homeMixesLayout = 'column is-9-mobile is-two-fifths-tablet is-4-desktop'

  return (
    <section className="section container is-fluid" id="home-mixes">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section content">
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
            {twelveMixes?.map(({ node }, index) => (
              <SingleMixCard
                key={`mixes-page-#${index}`}
                mixData={node}
                columnLayout={homeMixesLayout}
              />
            ))}
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
        {twelveMixes?.map(({ node }, index) => (
          <SingleMixCard
            key={`mixes-page-#${index}`}
            mixData={node}
            columnLayout={homeMixesLayout}
          />
        ))}
      </div>
    </section>
  )
}

export default HomeMixes
