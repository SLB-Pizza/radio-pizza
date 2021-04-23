import React from 'react'

/**
 * Renders details about the number of total shows scheduled for today onwards, and the number of those shows that have problems.
 * @category Admin Helper
 * @function AdminTotalShowsReport
 * @param {Number} totalShows - `totalCount` value from {@link GET_ALL_SCHEDULED_SHOWS} query
 * @param {Object[]} problemShows - `problemShows` from {@link FullSchedule}
 */
export default function AdminTotalShowsReport({ totalShows, problemShows }) {
  return (
    <div className="column content">
      {totalShows !== 0 ? (
        <>
          <h3 className="title is-size-4-desktop is-size-5-touch">{`${totalShows} future dates with scheduled shows`}</h3>
          {problemShows && (
            <p className="subtitle is-size-6-desktop is-size-7-touch">{`${problemShows.length} dates that have problems with one or more show entries.`}</p>
          )}
        </>
      ) : (
        <h3 className="title is-size-4-desktop is-size-5-touch">
          No future dates have scheduled shows.
        </h3>
      )}
    </div>
  )
}
