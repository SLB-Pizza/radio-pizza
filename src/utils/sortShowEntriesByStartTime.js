import dayjs from 'dayjs'

/**
 * Sorts a single date's `schedule_entries` array date objects by `start_time`.
 * @category Utilities
 * @function sortShowEntriesByStartTime
 * @param {Object[]} entriesArr
 * @returns {Object[]} a sorted copy of the input array
 *  * @see {@link https://stackoverflow.com/questions/49278578/reactjs-sorting-typeerror-0-is-read-only ReactJS - sorting - TypeError: 0 is read only}
 */
export default function sortShowEntriesByStartTime(entriesArr) {
  /**
   * Slicing the entries array prevents the `0 is read-only` error.
   */
  let entriesCopy = entriesArr.slice()
  return entriesCopy.sort((a, b) =>
    dayjs(a.start_time).isAfter(dayjs(b.start_time)) ? 1 : -1
  )
}
