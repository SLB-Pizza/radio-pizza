import React, { useState } from "react";
import { ScheduleModal, ScheduleDropdown } from "./index";

function ScheduleBar() {
  const [open, setOpen] = useState(false);

  return !open ? (
    <div className="schedule-bar container is-fluid">
      <div className="columns is-vcentered is-mobile">
        <div className="column is-narrow at-time">
          <p className="is-size-6">6:00PM</p>
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
