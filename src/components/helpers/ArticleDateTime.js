import React from 'react'
import { formatDateTime, processPublicationDates } from '../../utils'

/**
 * Renders the date-time for a given {@link FeatureTemplate}'s {@link ArticleBylineSubtitle}.
 * @category Slice Helper
 * @function ArticleDateTime
 * @param {Object} dates - dates from the Feature's metadata
 * @prop {String} dates.first - firstPublicationDate from metadata
 * @prop {String} dates.last - lastPublicationDate from metadata
 * @returns {jsx}
 */
export default function ArticleDateTime({ dates }) {
  const { first, last } = dates
  const dateString = processPublicationDates(first, last)

  const firstPubDateTime = formatDateTime(first, 'datetime-value')
  const lastPubDateTime = formatDateTime(last, 'datetime-value')

  return dates.first === dates.last ? (
    <p className="subtitle is-size-6-desktop is-size-7-touch">
      <time dateTime={firstPubDateTime}>{dateString}</time>
    </p>
  ) : (
    <p className="subtitle is-size-6-desktop is-size-7-touch">
      Updated <time dateTime={lastPubDateTime}>{dateString}</time>
    </p>
  )
}
