import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { gql, useQuery } from '@apollo/client'

import { SingleMixCard } from './index'
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

  /**
   * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
   * Similar procedure as in {@link ScheduleBar}, {@link HomeEvents} and {@link HomeFeatures}
   * @see {@link https://hmbk-cms.prismic.io/graphql | HMBK's Prismic GraphQL API}
   */
  const FILL_HOME_MIXES = gql`
    query FillHomeMixes($count: Int!) {
      allMixs(sortBy: mix_date_DESC, first: $count) {
        edges {
          node {
            _meta {
              uid
              type
              tags
            }
            mix_image
            mix_title
            mix_link
            mix_date
            featured_residents {
              ... on MixFeatured_residents {
                mix_resident {
                  ... on Resident {
                    _meta {
                      uid
                      type
                    }
                    resident_name
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const filteredHomeMixes = mappableDataFilter(homeMixesData)
  const mixQueryCount = 12 - filteredHomeMixes.length

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
            {twelveMixes &&
              twelveMixes.map(({ node }, index) => {
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
        {twelveMixes &&
          twelveMixes.map(({ node }, index) => {
            return (
              <SingleMixCard
                key={`mixes-page-#${index}`}
                mixData={node}
                columnLayout={homeMixesLayout}
              />
            )
          })}
      </div>
    </section>
  )
}

export default HomeMixes
