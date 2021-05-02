import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { useLazyQuery } from '@apollo/client'
import { SingleMixCard, StickyItemsLayout } from './index'
import { FILL_HOME_MIXES } from '../queries'
import {
  getUIDsFromDataArray,
  mappableDataFilter,
  removeDuplicateFetchData,
} from '../utils'

/**
 * Returns the Mixes content section of the Homepage, directly underneath the {@link Hero} section.
 * @category Layout Helper
 * @function HomeMixes
 * @param {String} headline - the label for this section
 * @param {String} blurb - short description to give the user context
 * @param {Object[]} homeMixesData - Array of data from Prismic received from /index; original data set in Prismic Homepage document
 * @returns {jsx}
 */
export default function HomeMixes({ headline, blurb, homeMixesData }) {
  const [twelveMixes, setHomeMixes] = useState(null)

  const filteredHomeMixes = mappableDataFilter(homeMixesData)

  /**
   * Uses the query {@link FILL_HOME_FEATURES} to fetch 4 Features for {@link processFetchedHomeMixes} to work with.
   * @category useLazyQuery
   * @name HomeMixesQuery
   */
  const [fetchFillerHomeMixes, { data: fetchedMixes, loading }] = useLazyQuery(
    FILL_HOME_MIXES
  )

  /**
   * IF `filteredHomeMixes` has 4 or more entries
   *    Grab only the first 4 features
   * ELSE
   *    `filteredHomeMixes` has less than 4 entries
   *    Fetch 4 Features by calling {@link HomeMixesQuery}.
   *    `fetchedMixes` updates, triggering {@link processFetchedHomeMixes}.
   * @category useEffect
   * @name fetchRemainingHomeMixes
   */
  useEffect(() => {
    const fetchRemainingHomeMixes = () => {
      if (filteredHomeMixes.length >= 12) {
        /**
         * Scenario 1
         */
        const mixesToMap = filteredHomeMixes.slice(0, 13)
        setTwelveMixes(mixesToMap)
      } else {
        fetchFillerHomeMixes()
      }
    }

    return fetchRemainingHomeMixes()
  }, [homeMixesData])

  /**
   * Runs when {@link fetchFillerHomeFeatures} returns fetchedFeatures to process.
   * Scenario 1
   * We have exactly 4 features
   *
   * Scenario 2
   * Query 4 more recently published Features.
   * Spread that fetchedFeatures into the filteredHomeMixes array
   * setTwelveMixes the new 12 mix filteredHomeMixes
   * @category useEffect
   * @name processFetchedHomeMixes
   */
  useEffect(() => {
    const processFetchedHomeMixes = () => {
      if (!fetchedMixes) {
        /**
         * Scenario 1
         */
        setHomeMixes(filteredHomeMixes)
      } else {
        /**
         * Scenario 2
         */
        const mixUIDsToFilter = getUIDsFromDataArray(filteredHomeMixes)
        const fetchedRecentMixes = fetchedMixes.allMixs.edges

        const uidFilteredRecentFeatures = removeDuplicateFetchData(
          fetchedRecentMixes,
          mixUIDsToFilter
        )

        const twelveMixesToMap = [
          ...filteredHomeMixes,
          ...uidFilteredRecentFeatures,
        ]
        setHomeMixes(twelveMixesToMap)
      }
    }
    processFetchedHomeMixes()
  }, [fetchedMixes])

  /**
   * The string passed into {@link SingleMixCard} that defines the column sizing for the mix cards in the Mixes section of the Homepage.
   * @const homeMixesLayout
   */
  const homeMixesLayout = 'column is-9-mobile is-two-fifths-tablet is-4-desktop'

  return (
    twelveMixes && (
      <StickyItemsLayout
        headline={headline}
        blurb={blurb}
        linkURL={'/radio'}
        linkBtnText={'All Radio'}
        itemsToMap={twelveMixes}
        ItemComponent={SingleMixCard}
        layout={homeMixesLayout}
      />
    )
  )
}
