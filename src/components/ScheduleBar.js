import React, { useState, useContext, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
import { ScheduleBarLayout, OutsideClick } from './index'
import { formatDateTime } from '../utils'
import { GET_TODAYS_SCHEDULE } from '../queries'
import { closeSchedule } from '../dispatch'

function ScheduleBar({ timeNow }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  // const [pageIsVisible, setPageIsVisible] = useState(true);
  const [yesterdayDate, setYesterdayDate] = useState(null)
  const [todaysSchedule, setTodaysSchedule] = useState([])

  /**
   * useLazyQuery called by {@link fetchTodaysSchedule}.
   * @category useLazyQueries
   * @name getTodaysSchedule
   */
  const [
    getTodaysSchedule,
    { loading: isFetching, data: todayScheduleData },
  ] = useLazyQuery(GET_TODAYS_SCHEDULE)

  /**
   * Compute current time and yesterday's date is Prismic query date format ("YYYY-MM-DD") every second.
   * @category useEffect
   * @name setCurrentTimeAndYesterdayDate
   */
  useEffect(() => {
    const setCurrentTimeAndYesterdayDate = setInterval(() => {
      const yesterday = formatDateTime(timeNow, 'get-yesterday-date')

      /**
       * Only update `yesterdayDate` if it's `null` (initial page load),
       * or the day has changed (one day to the next).
       */
      if (yesterdayDate === null || yesterday !== yesterdayDate) {
        setYesterdayDate(yesterday)
      }
    }, 1000)

    return () => {
      clearInterval(setCurrentTimeAndYesterdayDate)
    }
  }, [])

  /**
   * Once `yesterdayDate` value is set/updates, pass that value
   * @category useEffect
   * @name fetchTodaysSchedule
   */
  useEffect(() => {
    const fetchTodaysSchedule = () => {
      if (yesterdayDate) {
        getTodaysSchedule({
          variables: {
            yesterday: yesterdayDate,
          },
        })
      }
    }

    return fetchTodaysSchedule()
  }, [yesterdayDate])

  /**
   * Update `todayScheduleData` with the fetched data from {@link getTodaysSchedule}.
   * @category useEffect
   * @name updateTodaysSchedule
   */
  useEffect(() => {
    const updateTodaysSchedule = () => {
      if (todayScheduleData) {
        const todayScheduleDataNode =
          todayScheduleData.allSchedules.edges[0].node

        setTodaysSchedule(todayScheduleDataNode)
      }
    }
    return updateTodaysSchedule()
  }, [todayScheduleData])

  // check if the Radio.co stream is live once upon bar mounting.
  // if so, set the globalState.live boolean to true.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const streamResponse = await fetch(
          `https://public.radio.co/stations/s6f093248d/status`
        )
        const streamData = await streamResponse.json()
        // console.log('streamData', streamData);
        // console.log('globalState.live:', globalState.live)
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
        console.log('Error while fetching stream status, error:', error)
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

  // const handleVisibilityChange = (isVisible) => {
  //   setPageIsVisible(isVisible);
  // };

  const handlePlayLive = async () => {
    await dispatch({
      type: 'CHANGE_URL',
      payload: {
        url: 'https://streamer.radio.co/s6f093248d/listen',
        title: 'Halfmoon Radio',
      },
    })
  }

  // const showLiveStatus = () => (globalState.live ? "true" : "false");
  // END TEST CODE

  const nextShowTicker = (date, showName) => {
    return (
      <Ticker mode="await" offset="run-in" speed={3}>
        {() => (
          <p className="display-text  is-size-7">
            {/* {date} – {showName} */}
            Aldrich Title - Oxygen Body
          </p>
        )}
      </Ticker>
    )
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
      <ScheduleBarLayout
        globalState={globalState}
        timeNow={timeNow}
        todaysSchedule={todaysSchedule}
      />
    </OutsideClick>
  ) : (
    <ScheduleBarLayout
      globalState={globalState}
      timeNow={timeNow}
      todaysSchedule={todaysSchedule}
    />
  )
}

export default ScheduleBar
