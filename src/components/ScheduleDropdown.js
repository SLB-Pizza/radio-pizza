import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { GlobalDispatchContext } from '../context/GlobalContextProvider'
import { SingleDateScheduleEntries } from '../components'
import { formatDateTime } from '../utils'
import { closeSchedule } from '../dispatch'

/**
 * Renders the schedule dropdown bar when `setOpen` is set to `true` in {@link ScheduleBar}.
 * @category Site Elements
 * @function ScheduleDropdown
 * @param {Object} showData - single data node from
 * @param {Object} timeNow - dayJS object
 * @returns {jsx}
 */
function ScheduleDropdown({ showData, timeNow }) {
  const dispatch = useContext(GlobalDispatchContext)
  const [scheduleData, setScheduleData] = useState(null)

  /**
   * Check to see if today's date matches the date of `showData.schedule_data`.
   * If it does, means `showData` is for today; set `scheduleData` to `schedule_entries`.
   * If it doesn't, `showData` is for a different day; null `scheduleData` to render fallback.
   * @category useEffect
   * @name updateScheduleOnDateChange
   */
  useEffect(() => {
    const updateScheduleOnDateChange = () => {
      const { schedule_date, schedule_entries } = showData

      const isScheduleDataForToday = formatDateTime(
        timeNow,
        'is-schedule-date-today',
        null,
        schedule_date
      )

      if (isScheduleDataForToday) {
        setScheduleData(schedule_entries)
      } else {
        setScheduleData(null)
      }
    }
    return updateScheduleOnDateChange()
  }, [showData])

  /**
   * Format date using {@link formatDateTime}.
   */
  const todaysDate = formatDateTime(timeNow, 'schedule-date-heading')

  return (
    <div className="columns is-multiline is-vcentered is-mobile dropdown">
      <div className="column is-12 schedule-date-header">
        <div className="columns is-mobile is-vcentered">
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
        </div>
      </div>

      {/*
      scheduleData !== undefined : display today's schedule
      scheduleData === undefined : show  */}
      {scheduleData ? (
        <SingleDateScheduleEntries
          entries={scheduleData}
          currentTime={timeNow}
        />
      ) : (
        <div className="section column is-11 content">
          <p className="subtitle is-size-5-desktop is-size-6-touch has-text-centered">
            No shows scheduled!
          </p>
        </div>
      )}
    </div>
  )
}

export default ScheduleDropdown
