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
 * @param {Object[]} showData - data array of the next two, if available, dates with scheduled shows
 * @param {Object} timeNow - dayJS object
 * @returns {jsx}
 */
function ScheduleDropdown({ showData, timeNow }) {
  const dispatch = useContext(GlobalDispatchContext)
  const [scheduleData, setScheduleData] = useState(null)

  /**
   * Three scenarios:
   * 1. `showData` exists and has scheduled shows for today: in this case, today's shows are always be `showData[0].node.schedule_date`.
   * If it does, means `showData` is for today; set `scheduleData` to `schedule_entries`.
   * 2. `showData[0]` contains schedule objects for dates OTHER THAN today.
   * 3. `showData` is an empty array: there are currently no shows scheduled after yesterday's date.
   * For both 2 and 3, null `scheduleData` to render "No shows scheduled!" fallback.
   * @category useEffect
   * @name updateScheduleOnDateChange
   */
  useEffect(() => {
    const updateScheduleOnDateChange = () => {
      if (showData.length) {
        const { schedule_date, schedule_entries } = showData[0].node

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
        <div className="section column is-12 content">
          <p className="title is-size-4-tablet is-size-5-mobile has-text-centered">
            No shows scheduled!
          </p>
          <p className="subtitle is-size-5-tablet is-size-7-mobile has-text-centered text-block">
            Follow us on our{' '}
            <a
              href="https://twitter.com/halfmoonbk"
              rel="noopener"
              target="_blank"
            >
              Twitter
            </a>
            {', '}
            <a
              href="https://www.instagram.com/halfmoonbk/"
              rel="noopener"
              target="_blank"
            >
              Instagram
            </a>
            {', and '}
            <a
              href="https://www.facebook.com/halfmoonbk/"
              rel="noopener"
              target="_blank"
            >
              Facebook
            </a>
            {' for all the latest HMBK news.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ScheduleDropdown
