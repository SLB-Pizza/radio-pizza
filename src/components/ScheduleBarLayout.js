import React, { useContext } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { ScheduleDropdown, UpcomingShow } from './index'
import { GlobalDispatchContext } from '../context/GlobalContextProvider'
import { closeSchedule, toggleSchedule, handleLiveTest } from '../dispatch'

export default function ScheduleBarLayout({
  globalState,
  timeNow,
  todaysSchedule,
}) {
  const dispatch = useContext(GlobalDispatchContext)

  const { live, playingRadio, scheduleOpen, ...rest } = globalState

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
        <div
          className="column is-narrow"
          onClick={() => {
            handleLiveTest(dispatch)
            closeSchedule(dispatch)
          }}
        >
          {live ? (
            <button
              className="button is-small is-outlined is-rounded"
              onClick={() => closeSchedule(dispatch)}
            >
              {playingRadio ? (
                <>
                  <span>Listening</span>
                  <span className="icon">
                    <Icon icon="headphones" size="1x" className="live-light" />
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
          <UpcomingShow showData={todaysSchedule} />
        ) : (
          <div className="column next-show" />
        )}

        <div className="column upcoming is-hidden-tablet">
          {/* <PageVisibility onChange={handleVisibilityChange}>
            {pageIsVisible &&
              nextShowTicker("MON 4.21", "An HMBK Moment In Time")}
          </PageVisibility> */}
        </div>
        <div className="column is-narrow">
          <Icon
            icon="calendar-alt"
            size="1x"
            className="icon-color"
            onClick={() => toggleSchedule(dispatch)}
          />
        </div>
        {/* <div className="column is-narrow">
            <Link to="/search">
              <Icon
                onClick={() => closeSchedule()}
                icon="search"
                size="1x"
                className="icon-color"
              />
            </Link>
          </div> */}

        <div className="column is-narrow">
          <a
            href="http://halfmoonradiochat.chatango.com/"
            target="_blank"
            rel="noopener"
          >
            <Icon
              onClick={() => closeSchedule(dispatch)}
              icon="comments"
              size="1x"
              className="icon-color"
            />
          </a>
        </div>
      </div>
      {todaysSchedule && scheduleOpen && (
        <ScheduleDropdown todayShowData={todaysSchedule} timeNow={timeNow} />
      )}
    </div>
  )
}
