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

  const nextShowTicker = (date, showName) => {
    return (
      <Ticker mode="await" offset="run-in" speed={3}>
        {() => (
          <p className="subtitle is-size-7-mobile">
            {/* {date} – {showName} */}
            TEST - Next Show Title
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
    <div className="schedule-bar container is-fluid">
      <div className="columns is-vcentered is-mobile">
        <div
          className="column is-narrow at-time"
          onClick={() => {
            handleLiveTest();
          }}
        >
          <p className="title is-size-6-tablet is-size-7-mobile">
            {globalState.live ? "Listen Live" : "Next Show"}
          </p>
        </div>
        <div className="column upcoming is-hidden-mobile">
          <p className="is-size-6-tablet">TEST - Next Show Title</p>
        </div>
        <div className="column upcoming is-hidden-tablet">
          <PageVisibility onChange={handleVisibilityChange}>
            {pageIsVisible &&
              nextShowTicker("MON 4.21", "An HMBK Moment In Time")}
          </PageVisibility>
        </div>
        <div className="column is-narrow" id="open-schedule">
          <button className="button" onClick={() => setOpen(!open)}>
            <p className="title is-size-6-tablet is-size-7-mobile">
              Schedule ▼
            </p>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="schedule-bar container is-fluid is-open">
      {/*
      FOR DESKTOP
      BUILT INTO THE BAR
    */}
      <div className="columns is-vcentered is-mobile is-hidden-mobile up-next">
        <div
          className="column is-narrow at-time"
          onClick={() => {
            handleLiveTest();
          }}
        >
          <p className="title is-size-6-tablet is-size-7-mobile">
            {globalState.live ? "Listen Live" : "Next Show"}
          </p>
        </div>
        <div className="column upcoming is-hidden-mobile">
          <p className="is-size-6-tablet is-size-7-mobile">
            TEST - Next Show Title
          </p>
        </div>
        <div className="column upcoming is-hidden-tablet">
          <PageVisibility onChange={handleVisibilityChange}>
            {pageIsVisible &&
              nextShowTicker("MON 4.21", "An HMBK Moment In Time")}
          </PageVisibility>
        </div>
        <div className="column is-narrow" id="open-schedule">
          <button className="button" onClick={() => setOpen(!open)}>
            <p className="title is-size-6-tablet is-size-7 mobile">Close ▲</p>
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
