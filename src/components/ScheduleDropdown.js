import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { GlobalDispatchContext } from '../context/GlobalContextProvider'
import { formatDateTime } from '../utils'
import { closeSchedule } from '../dispatch'

import { SingleScheduleEntryRow } from '../components'

/**
 * Renders the schedule dropdown bar when `setOpen` is set to `true` in {@link ScheduleBar}.
 * @category Site Elements
 * @function ScheduleDropdown
 * @param {} todayShowData
 * @param {} timeNow
 * @returns {jsx}
 */
function ScheduleDropdown({ todayShowData, timeNow }) {
  const dispatch = useContext(GlobalDispatchContext)

  const { schedule_date, schedule_entries } = todayShowData

  /**
   * Format date using {@link formatDateTime}.
   */
  const todaysDate = formatDateTime(timeNow, 'schedule-date-heading')

  return (
    <div className="columns is-multiline is-vcentered is-mobile dropdown">
      <div className="column">
        <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
          {todaysDate}
        </p>
      </div>

      <div className="column is-narrow">
        <Link to="/schedule">
          <button
            className="button is-small is-outlined is-rounded"
            onClick={() => {
              closeSchedule(dispatch)
            }}
          >
            View Full Schedule
          </button>
        </Link>
      </div>

      {/*
      schedule_entries !== undefined : display today's schedule
      schedule_entries === undefined : show  */}
      {schedule_entries !== undefined ? (
        <div className="column is-12">
          {schedule_entries.map((entry, index) => {
            return (
              <SingleScheduleEntryRow
                key={`show-entry-#${index}-${start_time}`}
                entry={entry}
              />
            )
          })}
        </div>
      ) : (
        <div className="column is-12 content">
          <pre>{JSON.stringify(todayShowData, null, 2)}</pre>
          {/* <p className="subtitle has-text-centered">
            No programming planned for today.
          </p> */}
        </div>
      )}
    </div>
  )
}

export default ScheduleDropdown
