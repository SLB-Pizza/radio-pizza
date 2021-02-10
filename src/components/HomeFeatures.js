import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { gql, useQuery } from '@apollo/client'

import { SingleFeatureCard } from './index'
import { mappableDataFilter } from '../utils'

/**
 * Returns the HomeFeatures section
 * @category Site Elements
 * @function HomeFeatures
 * @param {Array} headline - Prismic RichText object
 * @param {Array} blurb - Prismic RichText object
 * @param {Array[Object]} homeFeaturesData - Array of data from Prismic received from /index; original data set in Prismic Homepage document
 * @returns {jsx}
 */
function HomeFeatures({ headline, blurb, homeFeaturesData }) {
  const [twelveFeatures, setTwelveFeatures] = useState(null)

  /**
   * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
   * Similar procedure as in {@link ScheduleBar}, {@link HomeMixes} and {@link HomeEvents}
   * @see {@link https://hmbk-cms.prismic.io/graphql|HMBK's Prismic GraphQL API}
   */

  const FILL_HOME_FEATURES = gql`
    query FillHomeFeatures($count: Int!) {
      allFeatures(sortBy: meta_firstPublicationDate_DESC, first: $count) {
        edges {
          node {
            _meta {
              uid
              type
              firstPublicationDate
              lastPublicationDate
            }
            headline_block {
              ... on FeatureHeadline_blockHeadline_block {
                primary {
                  article_headline_img
                  article_category
                  article_subcategory
                  article_headline
                  article_subtitle
                }
              }
            }
          }
        }
      }
    }
  `

  const filteredHomeFeatures = mappableDataFilter(homeFeaturesData)
  const featureQueryCount = 4 - filteredHomeFeatures.length

  const { data, loading, error } = useQuery(FILL_HOME_FEATURES, {
    variables: { count: featureQueryCount },
  })

  useEffect(() => {
    const fetchRemainingHomeFeatures = () => {
      /**
       * Three scenarios:
       * 1) homeFeaturesData has more than 4 Feature objects
       * 2) homeFeaturesData has less than 4 Feature objects
       * 3) homeFeaturesData has exactly 4 Feature objects
       */
      if (filteredHomeFeatures.length > 4) {
        /**
         * Scenario 1
         * Grab only the first 4 features
         */
        const featuresToMap = filteredHomeFeatures.slice(0, 4)
        setTwelveFeatures(featuresToMap)
      } else if (filteredHomeFeatures.length < 4) {
        /**
         * Scenario 2
         * Subtract quantity of filteredHomeFeatures from 4
         * Query for that many of the most recent mixes
         * Spread that data into the filteredHomeFeatures array
         * setTwelveMixes the new 12 mix filteredHomeFeatures
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
           * Scenario 3
           * We have exactly 4 features
           */
          setTwelveFeatures(filteredHomeFeatures)
        }
      }
    }
    return fetchRemainingHomeFeatures()
  }, [homeFeaturesData, data])
  /**
   * The string passed into {@link SingleFeatureCard} that defines the column sizing for the mix cards in the Editorial section of the Homepage.
   */
  const featuresPageLayout = 'column is-12-mobile is-6-tablet'

  return (
    <section className="container is-fluid" id="home-news">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb content">
            {headline && <p className="title">{RichText.asText(headline)}</p>}
            {blurb && <p className="subtitle">{RichText.render(blurb)}</p>}

            <Link to="/features">
              <button className="button is-outlined is-rounded">
                All Features
              </button>
            </Link>
          </div>
        </div>

        <div className="column is-9">
          <div className="columns is-multiline">
            {twelveFeatures &&
              twelveFeatures.map(({ node }, index) => {
                return (
                  <SingleFeatureCard
                    key={`${index}-home-feature-d`}
                    featureData={node}
                    featureColumnLayout={featuresPageLayout}
                    metadata={node._meta}
                  />
                )
              })}
          </div>
        </div>
      </div>
      {/*
      Touch Sizes
      */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          {headline && (
            <p className="title is-4">{RichText.asText(headline)}</p>
          )}
          {blurb && <p className="subtitle is-6">{RichText.asText(blurb)}</p>}
        </div>
        <div className="column is-narrow">
          <Link to="/features">
            <button className="button is-small is-outlined is-rounded">
              All Features
            </button>
          </Link>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {twelveFeatures &&
          twelveFeatures.map(({ node }, index) => {
            return (
              <SingleFeatureCard
                key={`${index}-home-feature-m`}
                featureData={node}
                featureColumnLayout={featuresPageLayout}
                metadata={node._meta}
              />
            )
          })}
      </div>
    </section>
  )
}

export default HomeFeatures
