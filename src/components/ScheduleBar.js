import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import { makeVar, gql, useQuery } from "@apollo/client";
import {
  faSearch,
  faComments,
  faCalendarAlt,
  faBroadcastTower,
  faHeadphones,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
import { ScheduleDropdown, OutsideClick } from "./index";

function ScheduleBar() {
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

  const [open, setOpen] = useState(false);
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const TODAYS_SCHEDULE = gql`
    query AllSchedulesData {
      allSchedules(sortBy: schedule_date_ASC) {
        edges {
          node {
            schedule_date
            schedule_entries {
              start_time
              end_time
              scheduled_show {
                _linkType
              }
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(TODAYS_SCHEDULE);

  if (loading) {
    return "Querying data...";
  }
  if (error) {
    return `Error ${error.message}`;
  }

  // useEffect(() => {
  //   client
  //     .query({
  //       query: TODAYS_SCHEDULE,
  //     })
  //     .then((result) => console.log("edges", result.data.allSchedules.edges))
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const toggleSchedule = async () => {
    await dispatch({ type: "TOGGLE_SCHEDULE" });
  };

  const closeSchedule = async () => {
    await dispatch({ type: "CLOSE_SCHEDULE" });
  };

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible);
  };

  // TEST ONLY -- just for live toggle
  const handleLiveTest = async () => {
    await dispatch({ type: "TOGGLE_LIVE_TEST" });
  };

  const showLiveStatus = () => (globalState.live ? "true" : "false");
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
    );
  };

  /**
   * Schedule Bar LAYOUT
   * OPEN : CLOSED
   */
  return globalState.scheduleOpen ? (
    <OutsideClick id={"schedule-bar"} onClick={() => closeSchedule()}>
      <div
        className={
          globalState.live
            ? "schedule-bar container is-fluid is-open is-live"
            : "schedule-bar container is-fluid is-open"
        }
        id="schedule-bar"
      >
        <div className="columns is-vcentered is-mobile is-variable is-2 up-next">
          <div
            className="column is-narrow"
            onClick={() => {
              handleLiveTest();
              closeSchedule();
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
                      <FontAwesomeIcon
                        icon={faHeadphones}
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
                      <FontAwesomeIcon
                        icon={faBroadcastTower}
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
          <div className="column upcoming is-hidden-mobile">
            <p className="display-text is-size-6-desktop is-size-7-touch">
              globalState.live: {showLiveStatus()}{" "}
            </p>
          </div>
          <div className="column upcoming is-hidden-tablet">
            <PageVisibility onChange={handleVisibilityChange}>
              {pageIsVisible &&
                nextShowTicker("MON 4.21", "An HMBK Moment In Time")}
            </PageVisibility>
          </div>
          <div className="column is-narrow">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size="1x"
              className="icon-color"
              onClick={() => toggleSchedule()}
            />
          </div>
          <div className="column is-narrow">
            <Link to="/search">
              <FontAwesomeIcon
                onClick={() => closeSchedule()}
                icon={faSearch}
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
              <FontAwesomeIcon
                onClick={() => closeSchedule()}
                icon={faComments}
                size="1x"
                className="icon-color"
              />
            </a>
          </div>
        </div>
        <ScheduleDropdown
          open={open}
          setOpen={setOpen}
          toggleSchedule={toggleSchedule}
        />
      </div>
    </OutsideClick>
  ) : (
    <div
      className={
        globalState.live
          ? "schedule-bar container is-fluid is-live"
          : "schedule-bar container is-fluid"
      }
    >
      <div className="columns is-vcentered is-mobile is-variable is-2 up-next">
        <div
          className="column is-narrow"
          onClick={() => {
            handleLiveTest();
            closeSchedule();
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
                    <FontAwesomeIcon
                      icon={faHeadphones}
                      size="1x"
                      className="live-light"
                    />
                  </span>
                </>
              ) : (
                <>
                  <span>Live</span>
                  <span className="icon">
                    <FontAwesomeIcon
                      icon={faBroadcastTower}
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
        <div className="column upcoming is-hidden-mobile">
          <p className="display-text is-size-6-desktop is-size-7-touch">
            globalState.live: {showLiveStatus()}
          </p>
        </div>
        <div className="column upcoming is-hidden-tablet">
          <PageVisibility onChange={handleVisibilityChange}>
            {pageIsVisible &&
              nextShowTicker("MON 4.21", "An HMBK Moment In Time")}
          </PageVisibility>
        </div>
        <div className="column is-narrow">
          <FontAwesomeIcon
            onClick={() => toggleSchedule()}
            icon={faCalendarAlt}
            size="1x"
            className="icon-color"
          />
        </div>
        <div className="column is-narrow">
          <Link to="/search">
            <FontAwesomeIcon
              onClick={() => closeSchedule()}
              icon={faSearch}
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
            <FontAwesomeIcon
              onClick={() => closeSchedule()}
              icon={faComments}
              size="1x"
              className="icon-color"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ScheduleBar;
