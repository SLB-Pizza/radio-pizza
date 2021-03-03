import { formatDateTime } from '../utils'

/**
 * Examine `firstPubDate` and `lastPubDate` to determine if featured has been updated since publish.
 *
 * If the feature has been updated:
 *    - format pubDate to include the time and calendar date of update, e.g. August 6, 2020 - 17:25
 * If the feature has NOT been updated,
 *    - format pubDate to show just the calendar date, e.g. August 2, 2020
 * @category Utility Function
 * @function processPublicationDates
 * @param {String} firstPubDate - date of initial publish; comes from feature_metadata
 * @param {String} lastPubDate - date of most recent publish(update); comes from feature_metadata
 * @returns {Object} a date string formatted by {@link formatDateTime}
 */

export default function processPublicationDates(firstPubDate, lastPubDate) {
  return firstPubDate !== lastPubDate
    ? formatDateTime(lastPubDate, 'long-form-date-time')
    : formatDateTime(firstPubDate, 'long-form-date')
}
