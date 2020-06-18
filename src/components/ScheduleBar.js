import React, { useState, useContext } from "react";
import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
import { ScheduleModal, ScheduleDropdown } from "./index";

function ScheduleBar() {
  const [open, setOpen] = useState(false);
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible);
  };

  // TEST ONLY -- just for live toggle
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

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
  return !open ? (
    <div
      className={
        globalState.live
          ? "schedule-bar container is-fluid is-live"
          : "schedule-bar container is-fluid"
      }
    >
      <div className="columns is-vcentered is-mobile up-next">
        <div
          className="column is-narrow"
          onClick={() => {
            handleLiveTest();
          }}
        >
          {globalState.live ? (
            <button
              className="button is-small is-outlined is-rounded"
              id="listen-live"
            >
              <span>Listen Live</span>
              <span className="icon" id="live-light" />
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
          <button
            className="button is-small is-outlined is-rounded"
            onClick={() => setOpen(!open)}
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={
        globalState.live
          ? "schedule-bar container is-fluid is-open is-live"
          : "schedule-bar container is-fluid is-open"
      }
    >
      <div className="columns is-vcentered is-mobile is-hidden-mobile up-next">
        <div
          className="column is-narrow"
          onClick={() => {
            handleLiveTest();
          }}
        >
          {globalState.live ? (
            <button className="button is-small is-outlined is-rounded">
              <span>Listen Live</span>
              <span className="icon" id="live-light" />
            </button>
          ) : (
            <p className="display-text is-size-6-desktop is-size-7-touch">
              Next Show
            </p>
          )}
        </div>
        <div className="column upcoming is-hidden-mobile">
          <p className="display-text is-size-6-desktop is-size-7-touch">
            Aldrich Title - Oxygen Body
          </p>
        </div>
        <div className="column upcoming is-hidden-tablet">
          <PageVisibility onChange={handleVisibilityChange}>
            {pageIsVisible &&
              nextShowTicker("MON 4.21", "An HMBK Moment In Time")}
          </PageVisibility>
        </div>
        <div className="column is-narrow">
          <button
            className="button is-small is-outlined is-rounded"
            onClick={() => setOpen(!open)}
          >
            Close
          </button>
        </div>
      </div>
      <span className="is-hidden-mobile">
        <ScheduleDropdown open={open} setOpen={setOpen} />
      </span>
      {/*
      FOR TOUCH
      SCHEDULE MODAL
    */}
      <ScheduleModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default ScheduleBar;
