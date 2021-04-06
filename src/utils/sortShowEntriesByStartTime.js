import dayjs from 'dayjs'

/**
 * Sorts the `schedule_entries` array for upcoming show data and for `/schedule` render.
 * @category Utilities
 * @function sortShowEntriesByStartTime
 * @param {Object[]} upcomingShowsArr - the original `edges` data array fetched by {@link getUpcomingShows}; sliced to loop and sort
 * @returns {Object[]} `upcomingShowsArr` with each node's `schedule_entries` sorted by `start_date`, earlier to latest
 * @see {@link https://stackoverflow.com/questions/49278578/reactjs-sorting-typeerror-0-is-read-only ReactJS - sorting - TypeError: 0 is read only}
 */
export default function sortShowEntriesByStartTime(upcomingShowsArr) {
  const fullySortedEntries = []

  for (let i = 0; i < upcomingShowsArr.length; i++) {
    let dateObject = { node: {} }
    let node = upcomingShowsArr[i].node
    console.log(upcomingShowsArr)

    /**
     * Slicing the entries array prevents the `0 is read-only` error.
     */
    let entriesCopy = node.schedule_entries.slice()
    let sortedEntries = entriesCopy.sort((a, b) =>
      dayjs(a.start_time).isAfter(dayjs(b.start_time)) ? 1 : -1
    )

    /**
     * Recreate the original date object, then push to fullySortedEntries
     */
    dateObject.node.schedule_entries = sortedEntries
    dateObject.node.schedule_date = node.schedule_date
    fullySortedEntries.push(dateObject)
  }

  console.log(fullySortedEntries)
  return fullySortedEntries.length ? fullySortedEntries : null
}
