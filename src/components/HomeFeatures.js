import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { SingleFeatureCard, StickyItemsLayout } from './index'
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
export default function HomeFeatures({ headline, blurb, homeFeaturesData }) {
  const [homeFeatures, setHomeFeatures] = useState(null)

  const filteredHomeFeatures = mappableDataFilter(homeFeaturesData)
  /**
   * The string passed into {@link SingleFeatureCard} that defines the column sizing for the mix cards in the Editorial section of the Homepage.
   */
  const featuresPageLayout =
    'column is-6-desktop is-two-fifths-tablet is-four-fifths-mobile'

  /**
   * Uses the query {@link FILL_HOME_FEATURES} to fetch 4 Features for {@link processFetchedHomeFeatures} to work with.
   * @category useLazyQuery
   * @name HomeFeaturesQuery
   */
  const [
    fetchFillerHomeFeatures,
    { data: fetchedFeatures, loading },
  ] = useLazyQuery(FILL_HOME_FEATURES)

  /**
   * IF (`filteredHomeFeatures` returns 0 b/c of ({@link mappableDataFilter})
   *    OR  `filteredHomeFeatures.length` <= 3)
   *    Fetch 4 Features by calling {@link HomeFeaturesQuery}.
   *    `fetchedFeatures` updates, triggering {@link processFetchedHomeFeatures}.
   * ELSE
   *    filteredHomeFeatures` has 4 or more entries
   *    Slice only the first 4 features
   * @category useEffect
   * @name fetchRemainingHomeFeatures
   */
  useEffect(() => {
    const fetchRemainingHomeFeatures = () => {
      if (filteredHomeFeatures === 0 || filteredHomeFeatures.length <= 3) {
        fetchFillerHomeFeatures()
      } else {
        const featuresToMap = filteredHomeFeatures.slice(0, 4)
        setHomeFeatures(featuresToMap)
      }
    }
    fetchRemainingHomeFeatures()
  }, [homeFeaturesData])

  /**
   * Runs when {@link fetchFillerHomeFeatures} returns `fetchedFeatures` to process.
   * IF `filteredHomeFeatures` returns 0 b/c of {@link mappableDataFilter}
   *    No Editorial UIDs to filter out, `setHomeFeatures` using `fetchedFeatures`
   * ELSE
   *    `filteredHomeFeatures` has entries; {@link getUIDsFromDataArray} to pass to {@link removeDuplicateFetchData}
   *    Create a new array by first spreading the `filteredHomeFeatures` array, followed by the `uidFilteredRecentFeatures`
   *    `setHomeFeatures` using the new 4 Feature array
   * @category useEffect
   * @name processFetchedHomeFeatures
   */
  useEffect(() => {
    const processFetchedHomeFeatures = () => {
      if (fetchedFeatures) {
        const fetchedRecentFeatures = fetchedFeatures.allFeatures.edges

        if (filteredHomeFeatures === 0) {
          setHomeFeatures(fetchedRecentFeatures)
        } else {
          const featureUIDsToFilter = getUIDsFromDataArray(filteredHomeFeatures)

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
    }
    processFetchedHomeFeatures()
  }, [fetchedFeatures])

  return (
    homeFeatures && (
      <StickyItemsLayout
        headline={headline}
        blurb={blurb}
        linkURL={'/editorial'}
        linkBtnText={'All Editorials'}
        itemsToMap={homeFeatures}
        ItemComponent={SingleFeatureCard}
        layout={featuresPageLayout}
      />
    )
  )
}
