import React, { useState, useContext } from "react";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
import { ScheduleModal, ScheduleDropdown } from "./index";

function ScheduleBar() {
  const [open, setOpen] = useState(false);

  // TEST ONLY -- just to
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

  const handleLiveTest = async () => {
    await dispatch({ type: "TOGGLE_LIVE_TEST" });
  };

  return !open ? (
    <div className="schedule-bar container is-fluid">
      <div className="columns is-vcentered is-mobile">
        <div
          className="column is-narrow at-time"
          onClick={() => {
            handleLiveTest();
          }}
        >
          <p className="is-size-6">{globalState.live ? "LIVE" : "not live"}</p>
        </div>
        <div className="column upcoming">
          <p className="title is-size-6 has-text-light">Next Show</p>
        </div>
        <div className="column is-narrow" id="open-schedule">
          <button className="button" onClick={() => setOpen(!open)}>
            <p className="title is-size-6">Schedule ▼</p>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="schedule-bar container is-fluid is-open">
      {/*
      FOR TOUCH
      SCHEDULE MODAL
    */}
      <ScheduleModal open={open} setOpen={setOpen} />
      {/*
      FOR DESKTOP
      BUILT INTO THE BAR
    */}
      <ScheduleDropdown open={open} setOpen={setOpen} />
    </div>
  );
}

export default ScheduleBar;
