import React, { Fragment } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/**
 * Renders a sticky column that renders details about current mix tag query search along with buttons labeled by one of the `selectedTags` that onClick mark {@link sameTagInQuery} as `false` and grab the current tag and {@link removeTagFromSearchArray}.
 *
 * Called by {@link DisplayFetchedTaggedMixes}. Only renders from tablet-up; mobile by {@link}.
 * @category Layout Helper
 * @function FetchedTagStickySection
 * @param {String[]} selectedTags
 * @param {Number} totalCount - details how many total mixes match the current mix tag search criteria
 * @param {Function} removeTagFromSearchArray - dispatch function, {@link removeTagFromSearchArray}
 * @param {Function} sameTagInQuery - dispatch function, {@link sameTagInQuery}
 * @returns {jsx}
 */
export default function FetchedTagStickySection({
  selectedTags,
  totalCount,
  removeTagFromSearchArray,
  sameTagsInQuery,
}) {
  return (
    <div className="column is-3 is-hidden-mobile">
      <div className="sticky-section">
        <div className="content">
          <h1 className="title is-4-touch">{`${totalCount} mixes found`}</h1>
          <p className="subtitle is-6-touch">Touch a tag to remove it. </p>
          {selectedTags?.map((tag, index) => (
            <Fragment key={`remove-tag-#${index}`}>
              <button
                className="button is-hidden-tablet-only is-fullwidth is-rounded is-inverted is-outlined is-primary"
                onClick={() => {
                  sameTagsInQuery(false)
                  removeTagFromSearchArray(tag)
                }}
              >
                <span>{tag}</span>
                <span className="icon is-large cross">
                  <Icon icon="times" size="1x" />
                </span>
              </button>
              <button
                className="button is-hidden-desktop is-small is-fullwidth is-rounded is-inverted is-outlined is-primary"
                onClick={() => {
                  sameTagsInQuery(false)
                  removeTagFromSearchArray(tag)
                }}
              >
                <span>{tag}</span>
                <span className="icon is-large cross">
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
