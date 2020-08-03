import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "gatsby";

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

        <div className="column is-narrow">
          <Link to="/cms-help">
            <FontAwesomeIcon
              onClick={() => closeSchedule()}
              icon={faQuestionCircle}
              size="1x"
              className="icon-color"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ScheduleBar;
