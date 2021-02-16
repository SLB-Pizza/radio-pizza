import React, { useState, useEffect, useContext } from 'react'
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider'
import { RadioBar, ScheduleBar } from './index'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * @function TopNav
 */
function TopNav() {
  const globalState = useContext(GlobalStateContext)

  const [nycTime, setNYCTime] = useState(dayjs().tz('America/New_York'))
  const [laTime, setLATime] = useState(dayjs().tz('America/Los_Angeles'))

  useEffect(() => {
    const clock = setInterval(() => {
      setNYCTime(nycTime.add(1, 's'))
      setLATime(laTime.add(1, 's'))
    }, 1000)

    return () => {
      clearInterval(clock)
    }
  })

  /**
   * This globalState null return prevents ERROR #95313.
   * @see {@link BottomNav|Related globalState situation in BottomNav}
   * @see {@link https://github.com/gatsbyjs/gatsby/issues/24264#issuecomment-631995753 | Re: ERROR #95313 - To stop the error immediately, add a null check for the object}
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
      <RadioBar nycTime={nycTime} laTime={laTime} />
      <ScheduleBar timeNow={nycTime} />
    </div>
  )
}

export default TopNav
