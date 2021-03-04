import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { formatDateTime } from '../utils'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

import { SingleScheduleEntryRow } from '../components'
import dummySchedule from '../../__test__/HMBK-schedule-page-query-test.json'

/**
 * Renders the schedule dropdown bar when `setOpen` is set to `true` in {@link ScheduleBar}.
 * @category Site Elements
 * @function ScheduleDropdown
 * @param {} setOpen,
 * @param {} open
 * @param {} toggleSchedule
 * @param {} showData
 * @param {} timeNow
 * @returns {jsx}
 */
function ScheduleDropdown({
  setOpen,
  open,
  toggleSchedule,
  showData,
  timeNow,
}) {
  const { schedule_date, schedule_entries } = showData

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
              setOpen(!open)
              toggleSchedule()
            }}
          >
            Full Schedule
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
          <p className="subtitle has-text-centered">
            No programming planned for today.
          </p>
        </div>
      )}
    </div>
  )
}

export default ScheduleDropdown
