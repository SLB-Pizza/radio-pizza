import React from 'react'
import { HMBKDivider } from '../components'
import { DividerAndTopButton } from '../components/helpers'
import { scrollToTop } from '../utils'

/**
 * Renders the final section of the page for of each of:
 * - {@link EditorialIndexPage}
 * - {@link EventsIndexPage}
 * - {@link RadioIndexPage}
 *
 * @category Layout Helper
 * @function LandingPageFetchAndLoading
 * @param {Boolean} hasMore - bool from the latest fetch (initial or otherwise) of the that Prismic page query
 * @param {Boolean} currentlyFetching - bool dictating whether or not a fetch is in progress
 * @param {Function} fetchMoreFunc - the `onClick` function used to update the page count, triggering a Prismic page query fetch
 * @param {String} fetchMoreBtnTxt - text to display in the button used to trigger `fetchMoreFunc`
 * @returns {jsx}
 */
export default function LandingPageFetchAndLoading({
  hasMore,
  currentlyFetching,
  fetchMoreFunc,
  fetchMoreBtnTxt,
}) {
  return (
    <>
      {hasMore ? (
        <div className="columns is-mobile is-vcentered">
          {!currentlyFetching ? (
            <div className="column">
              <button
                className="button is-fullwidth is-outlined is-rounded"
                onClick={() => fetchMoreFunc()}
              >
                {fetchMoreBtnTxt}
              </button>
            </div>
          ) : (
            <HMBKDivider forLoading={true} />
          )}
          <div className="column is-narrow">
            <button
              className="button is-fullwidth is-outlined is-rounded"
              onClick={() => scrollToTop()}
            >
              Top
            </button>
          </div>
        </div>
      ) : (
        <DividerAndTopButton />
      )}
    </>
  )
}
