import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'gatsby'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
import { ScheduleDropdown, OutsideClick, UpcomingShow } from './index'
import { formatDateTime } from '../utils'
import { GET_NEXT_SHOW } from '../queries'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

function ScheduleBar({ timeNow }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  const [open, setOpen] = useState(false)
  const [pageIsVisible, setPageIsVisible] = useState(true)
  const [todaysSchedule, setTodaysSchedule] = useState([])
  const [currentTime, setCurrentTime] = useState(dayjs().tz('America/New_York'))

  useEffect(() => {
    const schedTime = setInterval(() => {
      setCurrentTime(currentTime.add(1, 's'))
    }, 1000)

    return () => {
      clearInterval(schedTime)
    }
  }, [])

  /**
   * Format timeNow for use in schedule_date_before and schedule_date_after below. Neither date is inclusive so we need to pass in yesterday as the filter date.
   */
  let yesterday = formatDateTime(currentTime, 'prismic-date-query', -1)

  /**
   * Run the query on load and poll every 120 seconds; 2 minutes.
   */
  const { loading, error, data } = useQuery(GET_NEXT_SHOW, {
    variables: { yesterday },
    pollInterval: 5000,
  })

  /**
   * Query the HMBK Prismic CMS to get the data for the next scheduled show's data.
   * Grab the schedule data object from the query result.
   * Destructure the mix data object and dispatch the mix data to appear in {@link UpcomingShow}
   * @function
   */
  useEffect(() => {
    const getNextShowData = () => {
      if (error) {
        console.log(`Error: ${error.message}`)
      }
      if (data) {
        const todayScheduleData = data.allSchedules.edges
        setTodaysSchedule(todayScheduleData)
      }
    }

    return getNextShowData()
  }, [data, loading, error])

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

  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible)
  }

  const handlePlayLive = async () => {
    await dispatch({
      type: 'CHANGE_URL',
      payload: {
        url: 'https://streamer.radio.co/s6f093248d/listen',
        title: 'Halfmoon Radio',
      },
    })
  }

  const closeSchedule = async () => {
    await dispatch({ type: 'CLOSE_SCHEDULE' })
  }

  const toggleSchedule = async () => {
    await dispatch({ type: 'TOGGLE_SCHEDULE' })
  }

  // TEST ONLY -- just for live toggle
  const handleLiveTest = async () => {
    await dispatch({ type: 'TOGGLE_LIVE_TEST' })
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
   * @see {@link https://github.com/gatsbyjs/gatsby/issues/24264#issuecomment-631995753| Re: ERROR #95313 - To stop the error immediately, add a null check for the object}
   */
  if (!globalState) return null

  /**
   * globalState.scheduleOpen ? OPEN LAYOUT : CLOSED LAYOUT
   *
   * @see {@link BottomNav|Related globalState situation in BottomNav}
   * @see {@link OutsideClick|Related OutsideClick situation in BottomNav}
   */
  return globalState.scheduleOpen ? (
    <OutsideClick id={'schedule-bar'} onClick={() => closeSchedule()}>
      <div
        className={
          globalState.live
            ? 'schedule-bar container is-fluid is-open is-live'
            : 'schedule-bar container is-fluid is-open'
        }
        id="schedule-bar"
      >
        <div className="columns is-vcentered is-mobile is-variable is-2 up-next">
          <div
            className="column is-narrow"
            onClick={() => {
              handleLiveTest()
              closeSchedule()
            }}
          >
            {globalState.live ? (
              <button
                className="button is-small is-outlined is-rounded"
                onClick={() => closeSchedule()}
              >
                {globalState.playingRadio ? (
                  <>
                    <span>Listening</span>
                    <span className="icon">
                      <Icon
                        icon="headphones"
                        size="1x"
                        className="live-light"
                      />
                      Listening
                    </span>
                  </>
                ) : (
                  <>
                    <span>Live</span>
                    <span className="icon">
                      <Icon
                        icon="broadcast-tower"
                        size="1x"
                        className="live-light"
                      />
                    </span>
                  </>
                )}
              </button>
            ) : (
              <p className="display-text is-size-6-desktop is-size-7-touch">
                Next Show
              </p>
            )}
          </div>

          {todaysSchedule ? (
            <div className="column next-show" />
          ) : (
            <UpcomingShow showData={todaysSchedule} />
          )}

          <div className="column upcoming is-hidden-tablet">
            <PageVisibility onChange={handleVisibilityChange}>
              {pageIsVisible &&
                nextShowTicker('MON 4.21', 'An HMBK Moment In Time')}
            </PageVisibility>
          </div>
          <div className="column is-narrow">
            <Icon
              icon="calendar-alt"
              size="1x"
              className="icon-color"
              onClick={() => toggleSchedule()}
            />
          </div>
          <div className="column is-narrow">
            <Link to="/search">
              <Icon
                onClick={() => closeSchedule()}
                icon="search"
                size="1x"
                className="icon-color"
              />
            </Link>
          </div>

          <div className="column is-narrow">
            <a
              href="http://halfmoonradiochat.chatango.com/"
              target="_blank"
              rel="noopener"
            >
              <Icon
                onClick={() => closeSchedule()}
                icon="comments"
                size="1x"
                className="icon-color"
              />
            </a>
          </div>
        </div>
        {todaysSchedule && (
          <ScheduleDropdown
            showData={todaysSchedule}
            timeNow={timeNow}
            open={open}
            setOpen={setOpen}
            toggleSchedule={toggleSchedule}
          />
        )}
      </div>
    </OutsideClick>
  ) : (
    <div
      className={
        globalState.live
          ? 'schedule-bar container is-fluid is-live'
          : 'schedule-bar container is-fluid'
      }
    >
      <div className="columns is-vcentered is-mobile is-variable is-2 up-next">
        <div
          className="column is-narrow"
          onClick={() => {
            handleLiveTest()
            closeSchedule()
          }}
        >
          {globalState.live ? (
            <button
              className="button is-small is-outlined is-rounded"
              onClick={() => closeSchedule()}
            >
              {globalState.playingRadio ? (
                <>
                  <span>Listening</span>
                  <span className="icon">
                    <Icon icon="headphones" size="1x" className="live-light" />
                  </span>
                </>
              ) : (
                <>
                  <span>Live</span>
                  <span className="icon">
                    <Icon
                      icon="broadcast-tower"
                      size="1x"
                      className="live-light"
                    />
                  </span>
                </>
              )}
            </button>
          ) : (
            <p className="display-text is-size-6-desktop is-size-7-touch">
              Next Show
            </p>
          )}
        </div>
        {!todaysSchedule ? (
          <div className="column next-show" />
        ) : (
          <UpcomingShow showData={todaysSchedule} />
        )}
        <div className="column upcoming is-hidden-tablet">
          {/* <PageVisibility onChange={handleVisibilityChange}>
            {pageIsVisible &&
              todaysScheduleTickeTodaysSchedule.21", "An HMBK Moment In Time")}
          </PageVisibility> */}
        </div>
        <div className="column is-narrow">
          <Icon
            onClick={() => toggleSchedule()}
            icon="calendar-alt"
            size="1x"
            className="icon-color"
          />
        </div>
        <div className="column is-narrow">
          <Link to="/search">
            <Icon
              onClick={() => closeSchedule()}
              icon="search"
              size="1x"
              className="icon-color"
            />
          </Link>
        </div>

        <div className="column is-narrow">
          <a
            href="http://halfmoonradiochat.chatango.com/"
            target="_blank"
            rel="noopener"
          >
            <Icon
              onClick={() => closeSchedule()}
              icon="comments"
              size="1x"
              className="icon-color"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ScheduleBar
