import React, { useState, useContext, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
import { ScheduleBarLayout, OutsideClick } from './index'
import {
  fetchStreamStatus,
  formatDateTime,
  sortUpcomingShowsArray,
} from '../utils'
import { GET_DEFAULT_MIX, GET_UPCOMING_SHOWS } from '../queries'
import { closeSchedule } from '../dispatch'

function ScheduleBar({ timeNow }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  const [yesterdayDate, setYesterdayDate] = useState(null)
  const [upcomingShows, setUpcomingShowData] = useState([])

  /**
   * useLazyQuery called by {@link fetchUpcomingShows}.
   * @category useLazyQueries
   * @name getUpcomingShows
   */
  const [getUpcomingShows, { data: upcomingShowData }] = useLazyQuery(
    GET_UPCOMING_SHOWS
  )

  /**
   * useQuery that fetches the default recorded mix as defined in the CMS.
   * @category useQuery
   * @name getDefaultMix
   */
  const { loading, error, data } = useQuery(GET_DEFAULT_MIX)

  /**
   * Compute current time and yesterday's date in Prismic query date format ("YYYY-MM-DD") every second.
   * Only update `yesterdayDate` if it's `null` (initial page load),
   * or the day has changed (one day to the next).
   * @category useEffect
   * @name setCurrentTimeAndYesterdayDate
   */
  useEffect(() => {
    const setCurrentTimeAndYesterdayDate = setInterval(() => {
      const yesterday = formatDateTime(timeNow, 'get-yesterday-date')

      if (yesterdayDate === null || yesterday !== yesterdayDate) {
        setYesterdayDate(yesterday)
      }
    }, 1000)

    return () => {
      clearInterval(setCurrentTimeAndYesterdayDate)
    }
  }, [])

  /**
   * Once `yesterdayDate` value is set/updates, pass that value to getUpcomingShows
   * @category useEffect
   * @name fetchUpcomingShows
   */
  useEffect(() => {
    const fetchUpcomingShows = () => {
      if (yesterdayDate) {
        getUpcomingShows({
          variables: {
            yesterday: yesterdayDate,
          },
        })
      }
    }

    fetchUpcomingShows()
  }, [yesterdayDate])

  /**
   * Grabs the edges array from the data fetched by {@link getUpcomingShows}.
   * Sorts the `schedule_entries` for each date object in the edges array, then passes that data to `setUpcomingShowData`
   * @category useEffect
   * @name updateTodaysSchedule
   */
  useEffect(() => {
    const updateTodaysSchedule = () => {
      if (upcomingShowData) {
        let nextTwoDatesWithScheduledShows = upcomingShowData.allSchedules.edges

        const sortedEntries = sortUpcomingShowsArray(
          nextTwoDatesWithScheduledShows
        )

        setUpcomingShowData(sortedEntries)
      }
    }
    updateTodaysSchedule()
  }, [upcomingShowData])

  /**
   * Set initial {@link RadioBar} state by checking the "online" status of the radio and the {@link getDefaultMix} `useQuery`.
   * IF radio is live/broadcasting:
   *    If so, set `globalState.live` to true.
   * ELSE IF a default mix has been set in the CMS:
   *    Process the mix data object and dispatch the corresponding status action.
   * ELSE (not live AND no default mix defined):
   *    Dispatch null.
   * @category useEffect
   * @name fetchInitialLivestreamStatus
   */
  useEffect(() => {
    const fetchInitialLivestreamStatus = async () => {
      try {
        const streamStatus = await fetchStreamStatus()
        console.debug(streamStatus)
        /**
         * `globalState.live` starts `false`; no else needed if not live.
         */
        if (streamStatus === 'online') {
          await dispatch({
            type: 'SET_LIVE',
          })
        }
      } catch (error) {
        console.error('Error while fetching HMBK radio.co stream status.')
        console.error(error)
      }
    }
    fetchInitialLivestreamStatus()
  }, [])

  /**
   * Repeats the check above every 60 seconds, but also doesn't dispatch a context update unless needed.
   * Clears itself when unmounting.
   * @category useEffect
   * @name pollLiveStreamStatus
   */

  useEffect(() => {
    const pollLiveStreamStatus = setInterval(async () => {
      try {
        const streamResponse = await fetch(
          `https://public.radio.co/stations/s6f093248d/status`
        )
        const streamData = await streamResponse.json()

        if (streamData.status === 'online' && globalState.live === false) {
          await dispatch({
            type: 'SET_LIVE',
          })
        } else if (
          streamData.status === 'offline' &&
          globalState.live === true
        ) {
          await dispatch({
            type: 'SET_NOT_LIVE',
          })
        } else {
          await dispatch({
            type: 'SET_NOT_LIVE',
          })
        }
      } catch (error) {
        console.error('Error while polling stream status:', error)
      }
    }, 60000)
    return () => clearInterval(pollLiveStreamStatus)
  }, [])

  /**
   * This globalState null return prevents ERROR #95313.
   * @see {@link https://github.com/gatsbyjs/gatsby/issues/24264#issuecomment-631995753 Re: ERROR #95313 - To stop the error immediately, add a null check for the object}
   */
  if (!globalState) return null

  /**
   * `globalState.scheduleOpen` ? OPEN LAYOUT : CLOSED LAYOUT
   * @see {@link BottomNav Related globalState situation in BottomNav}
   * @see {@link OutsideClick Related OutsideClick situation in BottomNav}
   */
  return globalState.scheduleOpen ? (
    <OutsideClick id={'schedule-bar'} onClick={() => closeSchedule(dispatch)}>
      <ScheduleBarLayout timeNow={timeNow} upcomingShows={upcomingShows} />
    </OutsideClick>
  ) : (
    <ScheduleBarLayout timeNow={timeNow} upcomingShows={upcomingShows} />
  )
}

export default ScheduleBar
