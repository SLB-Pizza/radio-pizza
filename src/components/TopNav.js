import React, { useState, useEffect, useContext } from 'react'
import firebase from 'gatsby-plugin-firebase'
import { useObjectVal } from 'react-firebase-hooks/database'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'

import { RadioBar, ScheduleBar } from './index'
import { formatDateTime } from '../utils'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * Renders the top navigation bar that contains {@link RadioBar} and {@link ScheduleBar}.
 * @category Site Elements
 * @function TopNav
 * @returns {jsx}
 */
export default function TopNav() {
  const globalState = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)

  const [nycTime, setNYCTime] = useState(formatDateTime(null, 'current-time'))
  const [laTime, setLATime] = useState(dayjs().tz('America/Los_Angeles'))

  const [value, loading, error] = useObjectVal(
    firebase.database().ref('liveStreamMarquee/marquee')
  )

  /**
   * Opens a subscription to the Firebase DB to read the live marquee data.
   * @category useEffect
   * @name getRemoteMarquee
   */
  useEffect(() => {
    const getRemoteMarquee = async () => {
      if (error) {
        console.error(error)
      }

      if (
        value &&
        (value.liveShowTitle !== globalState.liveMarquee.liveShowTitle ||
          value.liveShowGuests !== globalState.liveMarquee.liveShowGuests)
      ) {
        await dispatch({
          type: 'MARQUEE_UPDATE',
          payload: {
            marquee: value,
          },
        })
      }

      if (!loading) {
        return value
      }
    }
    getRemoteMarquee()
  })

  /**
   * Function that adds one second to the clocks set in each `useState`.
   * @category useEffect
   * @name addOneSecondToClock
   */
  useEffect(() => {
    const addOneSecondToClock = setInterval(() => {
      setNYCTime(nycTime.add(1, 's'))
      setLATime(laTime.add(1, 's'))
    }, 1000)

    return () => {
      clearInterval(addOneSecondToClock)
    }
  })

  /**
   * This `globalState` null return prevents ERROR #95313. Our render return depends on `globalState.live` to exist.
   * @see {@link BottomNav Related globalState situation in BottomNav}
   * @see {@link https://github.com/gatsbyjs/gatsby/issues/24264#issuecomment-631995753 Re: ERROR #95313 - To stop the error immediately, add a null check for the object}
   */
  if (!globalState) return null

  return (
    <div
      className={
        globalState.live
          ? 'radio-and-schedule-bar is-live'
          : 'radio-and-schedule-bar'
      }
    >
      {/* For use with measureTextWidth.js */}
      <canvas id="for-text-measuring" aria-hidden="true" />

      <RadioBar nycTime={nycTime} laTime={laTime} />
      <ScheduleBar timeNow={nycTime} />
    </div>
  )
}
