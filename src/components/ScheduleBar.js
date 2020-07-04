import React, { useState, useContext } from "react";
import { Link } from "gatsby";

import {
  faSearch,
  faComments,
  faCalendarAlt,
  faBroadcastTower,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
import { ScheduleDropdown } from "./index";

function ScheduleBar() {
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

  const toggleSchedule = async () => {
    await dispatch({ type: "TOGGLE_SCHEDULE" });
    console.log("globalState.scheduleOpen:", globalState.scheduleOpen);
  };

  const [open, setOpen] = useState(false);
  const [pageIsVisible, setPageIsVisible] = useState(true);

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
          <p className="display-text is-size-7">
            {/* {date} – {showName} */}
            Aldrich Title - Oxygen Body
          </p>
        )}
      </Ticker>
    );
  };

  /**
   * Schedule Bar LAYOUT
   * CLOSED : OPEN
   */
  return globalState.scheduleOpen ? (
    <div
      className={
        globalState.live
          ? "schedule-bar container is-fluid is-open is-live"
          : "schedule-bar container is-fluid is-open"
      }
    >
      <div className="columns is-vcentered is-mobile is-variable is-2 up-next">
        <div
          className="column is-narrow"
          onClick={() => {
            handleLiveTest();
          }}
        >
          {globalState.live ? (
            <button className="button is-small is-outlined is-rounded">
              {globalState.playingRadio ? (
                <>
                  <span className="is-hidden-mobile">Now Listening</span>
                  <span className="is-hidden-tablet">Live</span>
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
                  <span className="is-hidden-mobile">Listen Live</span>
                  <span className="is-hidden-tablet">Live</span>
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
            <FontAwesomeIcon icon={faSearch} size="1x" className="icon-color" />
          </Link>
        </div>

        <div className="column is-narrow">
          <a
            href="http://halfmoonradiochat.chatango.com/"
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon
              icon={faComments}
              size="1x"
              className="icon-color"
            />
          </a>
        </div>
      </div>
      <ScheduleDropdown open={open} setOpen={setOpen} />
    </div>
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
          }}
        >
          {globalState.live ? (
            <button className="button is-small is-outlined is-rounded">
              {globalState.playingRadio ? (
                <>
                  <span>Now Listening</span>
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
                  <span>Listen Live</span>
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
            icon={faCalendarAlt}
            size="1x"
            className="icon-color"
            onClick={() => toggleSchedule()}
          />
        </div>
        <div className="column is-narrow">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} size="1x" className="icon-color" />
          </Link>
        </div>

        <div className="column is-narrow">
          <a
            href="http://halfmoonradiochat.chatango.com/"
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon
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
