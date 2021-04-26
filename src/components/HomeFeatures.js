import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { useQuery } from '@apollo/client'

import { SingleFeatureCard } from './index'
import { FILL_HOME_FEATURES } from '../queries'
import { mappableDataFilter } from '../utils'

/**
 * Returns the Editorial content section of the Homepage.
 * @category Layout Helper
 * @function HomeFeatures
 * @param {String} headline - the label for this section
 * @param {String} blurb - short description to give the user context
 * @param {Object[]} homeFeaturesData - Array of data from Prismic received from /index; original data set in Prismic Homepage document
 * @returns {jsx}
 */
function HomeFeatures({ headline, blurb, homeFeaturesData }) {
  const [twelveFeatures, setTwelveFeatures] = useState(null)

  const filteredHomeFeatures = mappableDataFilter(homeFeaturesData)
  const featureQueryCount = 4 - filteredHomeFeatures.length
  /**
   * The string passed into {@link SingleFeatureCard} that defines the column sizing for the mix cards in the Editorial section of the Homepage.
   */
  const featuresPageLayout = 'column is-6-tablet is-four-fifths-mobile'

  /**
   * Uses the query {@link FILL_HOME_FEATURES}
   * @category useQuery
   * @name HomeFeaturesQuery
   */
  const { data, loading, error } = useQuery(FILL_HOME_FEATURES, {
    variables: {
      count: featureQueryCount,
    },
  })

  /**
   * Fetches (4 - data.length) Features to fill {@link HomeFeatures} layout.
   * Three scenarios:
   * 1) homeFeaturesData has more than 4 Feature objects
   * 2) homeFeaturesData has less than 4 Feature objects
   * 3) homeFeaturesData has exactly 4 Feature objects
   *
   * Scenario 1
   * Grab only the first 4 features
   *
   * Scenario 2
   * Subtract quantity of filteredHomeFeatures from 4
   * Query for that many of the most recent mixes
   * Spread that data into the filteredHomeFeatures array
   * setTwelveMixes the new 12 mix filteredHomeFeatures
   *
   * Scenario 3
   * We have exactly 4 features
   * @category useEffect
   * @name fetchRemainingHomeFeatures
   */
  useEffect(() => {
    const fetchRemainingHomeFeatures = () => {
      if (filteredHomeFeatures.length > 4) {
        /**
         * #1
         */
        const featuresToMap = filteredHomeFeatures.slice(0, 4)
        setTwelveFeatures(featuresToMap)
      } else if (filteredHomeFeatures.length < 4) {
        /**
         * #2
         */
        if (data) {
          const fetchedRecentFeatures = data.allFeatures.edges
          const newTwelveFeatures = [
            ...filteredHomeFeatures,
            ...fetchedRecentFeatures,
          ]
          setTwelveFeatures(newTwelveFeatures)
        } else {
          /**
           * #3
           */
          setTwelveFeatures(filteredHomeFeatures)
        }
      }
    }
    return fetchRemainingHomeFeatures()
  }, [homeFeaturesData, data])

  return (
    <section className="container is-fluid" id="home-news">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section content">
            {headline && <h3 className="title">{headline}</h3>}
            {blurb && <p className="subtitle">{blurb}</p>}

            <Link to="/editorial">
              <button className="button is-outlined is-rounded">
                All Editorial
              </button>
            </Link>
          </div>
        </div>

        <div className="column is-9">
          <div className="columns is-multiline">
            {twelveFeatures?.map(({ node }, index) => (
              <SingleFeatureCard
                key={`${index}-home-feature`}
                data={node}
                columnLayout={featuresPageLayout}
              />
            ))}
          </div>
        </div>
      </div>
      {/*
      Touch Sizes
      */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column content">
          {headline && <h3 className="title is-4">{headline}</h3>}
          {blurb && <p className="subtitle is-6">{blurb}</p>}
        </div>
        <div className="column is-narrow">
          <Link to="/editorial">
            <button className="button is-small is-outlined is-rounded">
              All Editorial
            </button>
          </Link>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {twelveFeatures?.map(({ node }, index) => (
          <SingleFeatureCard
            key={`${index}-home-feature`}
            data={node}
            columnLayout={featuresPageLayout}
          />
        ))}
      </div>
    </section>
  )
}

export default HomeFeatures
