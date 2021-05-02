import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { useLazyQuery } from '@apollo/client'
import { SingleFeatureCard } from './index'
import { FILL_HOME_FEATURES } from '../queries'
import {
  getUIDsFromDataArray,
  mappableDataFilter,
  removeDuplicateFetchData,
} from '../utils'

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
  const [homeFeatures, setHomeFeatures] = useState(null)

  const filteredHomeFeatures = mappableDataFilter(homeFeaturesData)
  /**
   * The string passed into {@link SingleFeatureCard} that defines the column sizing for the mix cards in the Editorial section of the Homepage.
   */
  const featuresPageLayout =
    'column is-6-desktop is-two-fifths-tablet is-four-fifths-mobile'

  /**
   * Uses the query {@link FILL_HOME_FEATURES}
   * @category useLazyQuery
   * @name HomeFeaturesQuery
   */
  const [
    fetchFillerHomeFeatures,
    { data: fetchedFeatures, loading },
  ] = useLazyQuery(FILL_HOME_FEATURES)

  /**
   * Scenario 1 - `filteredHomeFeatures` has 4 or more entries
   * Grab only the first 4 features
   *
   * Scenario 2 - `filteredHomeFeatures` has less than 4 entries
   * Fetch 4 Features by calling {@link HomeFeaturesQuery}.
   * `fetchedFeatures` updates, triggering {@link processFetchedHomeFeatures}.
   * @category useEffect
   * @name fetchRemainingHomeFeatures
   */
  useEffect(() => {
    const fetchRemainingHomeFeatures = () => {
      if (filteredHomeFeatures.length >= 4) {
        /**
         * #1
         */
        const featuresToMap = filteredHomeFeatures.slice(0, 4)
        setHomeFeatures(featuresToMap)
      } else {
        const featureQueryCount = 4
        fetchFillerHomeFeatures({ variables: { count: featureQueryCount } })
      }
    }
    fetchRemainingHomeFeatures()
  }, [homeFeaturesData])

  /**
   * Runs when {@link fetchFillerHomeFeatures} returns fetchedFeatures to process.
   * Scenario 1
   * We have exactly 4 features
   *
   * Scenario 2
   * Query 4 more recently published Features.
   * Spread that fetchedFeatures into the filteredHomeFeatures array
   * setTwelveMixes the new 12 mix filteredHomeFeatures
   * @category useEffect
   * @name processFetchedHomeFeatures
   */
  useEffect(() => {
    const processFetchedHomeFeatures = () => {
      if (!fetchedFeatures) {
        /**
         * Scenario 1
         */
        setHomeFeatures(filteredHomeFeatures)
      } else {
        /**
         * Scenario 2
         */
        const featureUIDsToFilter = getUIDsFromDataArray(filteredHomeFeatures)
        const fetchedRecentFeatures = fetchedFeatures.allFeatures.edges

        const uidFilteredRecentFeatures = removeDuplicateFetchData(
          fetchedRecentFeatures,
          featureUIDsToFilter
        )

        const newTwelveFeatures = [
          ...filteredHomeFeatures,
          ...uidFilteredRecentFeatures,
        ]
        setHomeFeatures(newTwelveFeatures)
      }
    }
    processFetchedHomeFeatures()
  }, [fetchedFeatures])

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
            {homeFeatures?.map(({ node }, index) => (
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
        {homeFeatures?.map(({ node }, index) => (
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
