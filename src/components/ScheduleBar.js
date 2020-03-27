import React, { useState } from "react";
import { ScheduleModal, ScheduleDropdown } from "./index";

function ScheduleBar() {
  const [open, setOpen] = useState(false);

  return !open ? (
    <div className="schedule-bar container is-fluid">
      <div className="columns is-vcentered is-mobile up-next">
        <div className="column is-narrow">
          <p className="is-size-6">in 1hr 1m</p>
        </div>
        <div className="column">
          <p className="title is-size-6 has-text-light">Loremip.</p>
        </div>
        <div className="column is-narrow" id="open-schedule">
          <button
            className="button is-fullwidth is-black"
            onClick={() => setOpen(!open)}
          >
            Schedule ▼
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
