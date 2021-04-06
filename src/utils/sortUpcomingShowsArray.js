import dayjs from 'dayjs'
import { sortShowEntriesByStartTime } from './index'

/**
 * Sorts the `schedule_entries` array for upcoming show data and for `/schedule` render.
 * @category Utilities
 * @function sortUpcomingShowsArray
 * @param {Object[]} upcomingShowsArr - the original `edges` data array fetched by {@link getUpcomingShows}; sliced to loop and sort
 * @returns {Object[]} `upcomingShowsArr` with each node's `schedule_entries` sorted by `start_date`, earlier to latest

 */
export default function sortUpcomingShowsArray(upcomingShowsArr) {
  const fullySortedEntries = []

  for (let i = 0; i < upcomingShowsArr.length; i++) {
    let dateObject = { node: {} }
    let node = upcomingShowsArr[i].node

    const sortedEntries = sortShowEntriesByStartTime(node.schedule_entries)

    /**
     * Recreate the original date object, then push to fullySortedEntries
     */
    dateObject.node.schedule_entries = sortedEntries
    dateObject.node.schedule_date = node.schedule_date
    fullySortedEntries.push(dateObject)
  }

  return fullySortedEntries.length ? fullySortedEntries : null
}
