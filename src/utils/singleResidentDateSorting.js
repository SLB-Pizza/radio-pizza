import { formatDateTime } from './index'

/**
 * Sorts the incoming Resident's `resident_mixes` group field data array by date using the `mix_date` field, from most recent to least
 * Used by {@link ResidentTemplate}
 * @category Utilities
 * @function mixDateSort
 * @param {Object[]} mixesData
 */
export const mixDateSort = mixesData =>
  mixesData.sort(
    (a, b) =>
      formatDateTime(b.resident_mix.mix_date) -
      formatDateTime(a.resident_mix.mix_date)
  )

/**
 *  Sorts the incoming Resident's `resident_events` group field data array by date using the `event_start` field, from most recent to least
 * Used by {@link ResidentTemplate}
 * @category Utilities
 * @function eventDateSort
 * @param {Object[]} eventsData
 */
export const eventDateSort = eventsData =>
  eventsData.sort(
    (a, b) =>
      formatDateTime(b.resident_event.event_start) -
      formatDateTime(a.resident_event.event_start)
  )

/**
 * Sorts the incoming Resident's `resident_features` group field data array by date using `_meta.firstPublicationDate` field, from most recent to least
 * Used by {@link ResidentTemplate}
 * @category Utilities
 * @function featureDateSort
 * @param {Object[]} featuresData
 */
export const featureDateSort = featuresData =>
  featuresData.sort(
    (a, b) =>
      formatDateTime(b.resident_feature._meta.firstPublicationDate) -
      formatDateTime(a.resident_feature._meta.firstPublicationDate)
  )
