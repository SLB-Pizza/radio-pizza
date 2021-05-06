import React, { useContext } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { ScheduleDropdown, UpcomingShow } from './index'
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider'
import {
  closeSchedule,
  toggleSchedule,
  handleLiveTest,
  handlePlayLive,
} from '../dispatch'

/**
 * Render the layout of the ScheduleBar using globalState.
 * Called by: {@link ScheduleBar}
 * Calls: {@link UpcomingShow}, {@link ScheduleDropdown}
 * @category Layout Helper
 * @function ScheduleBarLayout
 * @param {Object} timeNow - dayJS object originating from {@link TopNav}
 * @param {Object[]} upcomingShows - array of schedule data nodes, max 2 data objects
 * @returns {jsx}
 */
export default function ScheduleBarLayout({ timeNow, upcomingShows }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  const { live, playingRadio, scheduleOpen, ..._ } = globalState

  return (
    <div
      className={
        live
          ? 'schedule-bar container is-fluid is-open is-live'
          : 'schedule-bar container is-fluid is-open'
      }
      id="schedule-bar"
    >
      <div className="columns is-vcentered is-mobile is-variable is-2 up-next">
        <div className="column is-narrow">
          {live ? (
            <button
              className="button is-small is-outlined is-rounded"
              onClick={() => {
                handlePlayLive(dispatch)
                closeSchedule(dispatch)
              }}
            >
              {playingRadio ? (
                <>
                  <span className="icon">
                    <Icon icon="headphones" size="lg" className="live-light" />
                  </span>
                  <span>Listening</span>
                </>
              ) : (
                <>
                  <span className="icon">
                    <Icon
                      icon="broadcast-tower"
                      size="1x"
                      className="live-light"
                    />
                  </span>
                  <span>Tune In</span>
                </>
              )}
            </button>
          ) : (
            <p className="title is-size-6-tablet is-size-7-mobile">Next Show</p>
          )}
        </div>
        {/* TO FIX LATER */}
        {/* <UpcomingShow showData={upcomingShows} timeNow={timeNow} /> */}
        <div className="column" />
        <div className="column is-narrow">
          <button
            className="unstyled"
            aria-label="Toggle Schedule Dropdown"
            onClick={() => toggleSchedule(dispatch)}
          >
            <Icon icon="calendar-alt" size="lg" className="icon-color" />
          </button>
        </div>

        {/* <div className="column is-narrow">
            <Link to="/search">
              <Icon
                onClick={() => closeSchedule(dispatch)}
                icon="search"
                size="lg"
                className="icon-color"
              />
            </Link>
          </div> */}

        <div className="column is-narrow">
          <a
            href="http://halfmoonradiochat.chatango.com/"
            target="_blank"
            rel="noopener"
            onClick={() => closeSchedule(dispatch)}
          >
            <Icon icon="comments" size="lg" className="icon-color" />
          </a>
        </div>
      </div>
      {upcomingShows && scheduleOpen && (
        <ScheduleDropdown showData={upcomingShows} timeNow={timeNow} />
      )}
    </div>
  )
}
