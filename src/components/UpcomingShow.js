import React, { useContext, useEffect, useState } from 'react'
import { GlobalStateContext } from '../context/GlobalContextProvider'
import {
  formatDateTime,
  getResidentLinks,
  getUpcomingShowDetails,
} from '../utils'
import { UpcomingShowWithResidents } from '../components'

/**
 *
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
        setUpcomingShow(null)
      }
    }

    return processUpcomingShow()
  }, [timeNow])

  if (upcomingShow) {
    // console.log("in render", upcomingShow);
    const { date, isToday, nextShow, start } = upcomingShow
    const startTimeStr = isToday ? `${start} -` : `${date} @ ${start}:`

    const { scheduled_show, live_show_title, live_show_guests } = nextShow
    if (scheduled_show) {
      return (
        <UpcomingShowWithResidents
          startTimeStr={startTimeStr}
          upcomingShow={scheduled_show}
        />
      )
    } else {
      let liveShowStr = ''
      if (live_show_title) {
        liveShowStr += `${live_show_title} `
        if (live_show_guests) {
          liveShowStr += ` - ${live_show_guests}`
        }
      } else if (live_show_guests) {
        liveShowStr += `${live_show_guests}`
      } else {
        liveShowStr = 'HMBK Live Show'
      }

      return (
        <div className="column next-show is-loaded is-hidden-mobile">
          <p className="subtitle is-size-6-desktop is-size-7-touch">
            {`${liveShowStr}`}
          </p>
        </div>
      )
    }
  } else {
    return (
      <div
        className={
          globalState.isLoading
            ? 'column next-show is-hidden-mobile text-block'
            : 'column next-show is-hidden-mobile text-block is-loaded'
        }
      >
        <p className="subtitle is-size-6-desktop is-size-7-touch">
          No upcoming shows planned. Follow us on our{' '}
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
    )
  }
}

export default UpcomingShow
