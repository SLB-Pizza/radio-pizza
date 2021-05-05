import React, { useEffect, useState } from 'react'
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
   * Uses the query {@link FILL_HOME_MIXES} to fetch 12 Mixes for {@link processFetchedHomeMixes} to work with.
   * @category useLazyQuery
   * @name HomeMixesQuery
   */
  const [fetchFillerHomeMixes, { data: fetchedMixes, loading }] = useLazyQuery(
    FILL_HOME_MIXES
  )

  /**
   * IF (`filteredHomeMixes` returns 0 b/c of ({@link mappableDataFilter})
   *    OR  `filteredHomeMixes.length` <= 3)
   *    Fetch 4 Features by calling {@link HomeMixesQuery}.
   *    `fetchedMixes` updates, triggering {@link processFetchedHomeMixes}.
   * ELSE
   *    `filteredHomeMixes` has 12 or more entries
   *    Slice only the first 12 Mixes
   * @category useEffect
   * @name fetchRemainingHomeMixes
   */
  useEffect(() => {
    const fetchRemainingHomeMixes = () => {
      if (filteredHomeMixes === 0 || filteredHomeMixes.length <= 11) {
        fetchFillerHomeMixes()
      } else {
        const mixesToMap = filteredHomeMixes.slice(0, 13)
        setTwelveMixes(mixesToMap)
      }
    }

    fetchRemainingHomeMixes()
  }, [homeMixesData])

  /**
   * Runs when {@link fetchFillerHomeMixes} returns `fetchedMixes` to process.
   * IF `filteredHomeMixes` returns 0 b/c of {@link mappableDataFilter}
   *    No Mix UIDs to filter out, `setHomeMixes` using `fetchedMixes`
   * ELSE
   *    `filteredHomeMixes` has entries; {@link getUIDsFromDataArray} to pass to {@link removeDuplicateFetchData}
   *    Create a new array by first spreading the `filteredHomeMixes` array, followed by the `uidFilteredRecentMixes`
   *    `setHomeMixes` using the new 4 Feature array
   * @category useEffect
   * @name processFetchedHomeMixes
   */
  useEffect(() => {
    const processFetchedHomeMixes = () => {
      if (fetchedMixes) {
        const fetchedRecentMixes = fetchedMixes.allMixs.edges
        if (filteredHomeMixes === 0) {
          setHomeMixes(fetchedRecentMixes)
        } else {
          const mixUIDsToFilter = getUIDsFromDataArray(filteredHomeMixes)

          const uidFilteredRecentMixes = removeDuplicateFetchData(
            fetchedRecentMixes,
            mixUIDsToFilter
          )

          const twelveMixesToMap = [
            ...filteredHomeMixes,
            ...uidFilteredRecentMixes,
          ]
          setHomeMixes(twelveMixesToMap)
        }
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
