import React, { Fragment } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { scrollToTop } from '../utils'

/**
 * Renders a sticky column that renders details about current mix tag query search along with buttons labeled by one of the `selectedTags` that onClick mark {@link markSameTagInQuery} as `false` and grab the current tag and {@link removeTagFromSearchArray}.
 *
 * Called by {@link DisplayFetchedTaggedMixes}. Only renders from tablet-up; mobile by {@link}.
 * @category Layout Helper
 * @function FetchedTagStickySection
 * @param {String[]} selectedTags
 * @param {Number} totalCount - details how many total mixes match the current mix tag search criteria
 * @param {Function} removeTagFromSearchArray - dispatch function, {@link removeTagFromSearchArray}
 * @param {Function} markSameTagInQuery - dispatch function, {@link markSameTagInQuery}. In this component, will always pass `false` as clicking a tag button will always start a new query that will fetch new tagged mixes data.
 * @returns {jsx}
 */
export default function FetchedTagStickySection({
  selectedTags,
  totalCount,
  removeTagFromSearchArray,
  markSameTagsInQuery,
}) {
  /**
   * Fires off {@link markSameTagsInQuery} with a `false` value, and the `fetchFunc` {@link removeTagFromSearchArray} dispatch function, and {@link scrollToTop} to reset page scroll, presenting newest data to user on fetch.
   * @category Utility Function
   * @function resetQueryFetchNewData
   */
  const resetQueryFetchNewData = tag => {
    markSameTagsInQuery(false)
    removeTagFromSearchArray(tag)
  }

  return (
    <div className="column is-hidden-mobile is-4-tablet is-3-desktop">
      <div className="sticky-section">
        <div className="content">
          <h1 className="title is-4-touch">{`${totalCount} mixes found`}</h1>
          <p className="subtitle is-6-touch">Touch a tag to remove it.</p>
        </div>
        <div className="buttons">
          {selectedTags?.map((tag, index) => (
            <Fragment key={`remove-tag-#${index}`}>
              <button
                className="button is-hidden-touch is-fullwidth is-rounded is-inverted is-outlined"
                onClick={() => resetQueryFetchNewData(tag)}
              >
                <span>{tag}</span>
                <span className="icon cross">
                  <Icon icon="times" size="1x" />
                </span>
              </button>
              <button
                className="button is-hidden-desktop is-small is-fullwidth is-rounded is-inverted is-outlined"
                onClick={() => resetQueryFetchNewData(tag)}
              >
                <span>{tag}</span>
                <span className="icon cross">
                  <Icon icon="times" size="1x" />
                </span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
