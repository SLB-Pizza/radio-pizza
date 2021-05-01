import React, { useState, useContext, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import PageVisibility from 'react-page-visibility'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
import { ScheduleBarLayout, OutsideClick } from './index'
import { formatDateTime, sortUpcomingShowsArray } from '../utils'
import { GET_UPCOMING_SHOWS } from '../queries'
import { closeSchedule } from '../dispatch'

function ScheduleBar({ timeNow }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  // const [pageIsVisible, setPageIsVisible] = useState(true);
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

    return fetchUpcomingShows()
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
    return updateTodaysSchedule()
  }, [upcomingShowData])

  // check if the Radio.co stream is live once upon bar mounting.
  // if so, set the globalState.live boolean to true.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const streamResponse = await fetch(
          `https://public.radio.co/stations/s6f093248d/status`
        )
        const streamData = await streamResponse.json()

        if (streamData.status === 'online') {
          await dispatch({
            type: 'SET_LIVE',
          })
        } else {
          await dispatch({
            type: 'SET_NOT_LIVE',
          })
        }
      } catch (error) {
        console.error('Error while fetching stream status, error:', error)
      }
    }
    fetchData()
  }, [])

  // Repeats the check above every 60 seconds, but also doesn't dispatch a context update unless needed.
  // clears itself when unmounting.
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const streamResponse = await fetch(
          `https://public.radio.co/stations/s6f093248d/status`
        )
        const streamData = await streamResponse.json()

        console.log('setInterval streamData:', streamData)
        console.log('setInterval globalState.live:', globalState.live)
        // I think a live status is "online" as a not live status is "offline"
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
        console.log(
          'Error while interval fetching stream status, error:',
          error
        )
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const handlePlayLive = async () => {
    await dispatch({
      type: 'CHANGE_URL',
      payload: {
        url: 'https://streamer.radio.co/s6f093248d/listen',
        title: 'Halfmoon Radio',
      },
    })
  }

  /**
   * This globalState null return prevents ERROR #95313.
   * @see {@link https://github.com/gatsbyjs/gatsby/issues/24264#issuecomment-631995753 Re: ERROR #95313 - To stop the error immediately, add a null check for the object}
   */
  if (!globalState) return null

  /**
   * globalState.scheduleOpen ? OPEN LAYOUT : CLOSED LAYOUT
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
