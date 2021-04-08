import React, { useContext, useEffect, useState } from 'react'
import { GlobalStateContext } from '../context/GlobalContextProvider'
import { getUpcomingShowDetails } from '../utils'
import {
  UpcomingShowFallbackMessage,
  UpcomingShowLiveBroadcast,
  UpcomingShowWithResidents,
} from '../components'

/**
 * Processes `showData` using `timeNow` to render the details about the upcoming show.
 * @category Layout Helper
 * @function UpcomingShow
 * @param {Object[]} showData - data array of the next two, if available, dates with scheduled shows
 * @param {Object} timeNow - dayJS object
 * @returns {jsx}
 */
function UpcomingShow({ showData, timeNow }) {
  const globalState = useContext(GlobalStateContext)
  const [upcomingShow, setUpcomingShow] = useState(null)

  /**
   * Examine the incoming `showData` to see if a schedule object has a matching date with entries. Runs every second as `timeNow` updates every second.
   * Scenarios:
   * 1. `showData` contains schedule data for today; `timeNow` is before start of a show/between shows.
   * - Display countdown until (next) show start.
   * 2. `showData` contains schedule data for today; `timeNow` is during a show.
   * - Display start and end time with show name details.
   * 3 `showData` contains schedule data for today, but **does not** have entries added.
   * - Continue to next schedule data object, if present.
   * 4. `showData` contains schedule data for today; `timeNow` is after end of last show.
   * - Continue to next schedule data object, if present.
   * - If next show is scheduled: Display `Date at Start Time: Show Details`
   * - If there are no further shows: Display fallback.
   * @category useEffect
   * @name processUpcomingShow
   */
  useEffect(() => {
    const processUpcomingShow = () => {
      if (showData) {
        for (let i = 0; i < showData.length; i++) {
          const currScheduleObj = showData[i].node
          const { schedule_date, schedule_entries } = currScheduleObj

          /**
           * Check length and presence of both `start_time` and `end_time`.
           * If `currScheduleObj` has no entries/null; null continue to second (last) showData array element to analyze.
           */
          if (schedule_entries?.length) {
            const nextShowDetails = getUpcomingShowDetails(
              timeNow,
              schedule_date,
              schedule_entries
            )

            /**
             * If `nextShowDetails` object is set, break out of loop and set value.
             */
            if (nextShowDetails) {
              setUpcomingShow(nextShowDetails)
              break
            }
          }
        }
      } else {
        setUpcomingShow(null)
      }
    }

    return processUpcomingShow()
  }, [timeNow])

  if (upcomingShow) {
    const { date, isToday, nextShow, start } = upcomingShow
    const startTimeStr = isToday ? `${start} -` : `${date} @ ${start}:`

    const { scheduled_show, live_show_title, live_show_guests } = nextShow
    if (scheduled_show) {
      return (
        <UpcomingShowWithResidents
          startTimeStr={startTimeStr}
          upcomingShow={scheduled_show}
          isLoading={globalState.isLoading}
        />
      )
    } else {
      return (
        <UpcomingShowLiveBroadcast
          startTimeStr={startTimeStr}
          showTitle={live_show_title}
          showGuests={live_show_guests}
          isLoading={globalState.isLoading}
        />
      )
    }
  } else {
    return <UpcomingShowFallbackMessage isLoading={globalState.isLoading} />
  }
}

export default UpcomingShow
