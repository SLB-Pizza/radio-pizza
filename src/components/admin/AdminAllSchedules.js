import React from 'react'
import { AdminScheduleGenerator } from './index'

/**
 * Renders the entirety of `scheduledShows` from {@link FullSchedule}.
 * @category Admin Helper
 * @function AdminAllSchedules
 * @param {Object[]} showsArr - `scheduledShows` from {@link FullSchedule}
 * @param {Object} currentTime - dayjs object representing the current time
 * @returns {jsx}
 */
export default function AdminAllSchedules({ showsArr, currentTime }) {
  return showsArr.map(({ date, entries }, index) => (
    <article
      key={`schedule-for-${index}`}
      className="columns is-multiline is-vcentered is-mobile schedule-page-entries"
    >
      <div className="column is-12 schedule-date-header__sched-page">
        <p className="title is-size-4-desktop is-size-5-touch has-text-centered">
          {date}
        </p>
      </div>

      {entries !== null ? (
        <AdminScheduleGenerator entries={entries} currentTime={currentTime} />
      ) : (
        <div className="section is-medium column is-12 content">
          <p className="title is-size-5-desktop is-size-6-touch has-text-centered has-background-warning">
            No shows scheduled!
          </p>
        </div>
      )}
    </article>
  ))
}
