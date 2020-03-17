import React, { useState } from "react";
import { ScheduleDatePicker, ScheduleShowEntry } from "./index";

function ScheduleBar() {
  const [open, setOpen] = useState(false);

  return !open ? (
    <div className="schedule-bar container is-fluid is-vcentered">
      <div className="columns up-next">
        <div className="column is-narrow up-next">
          <p>in 1hr 1m</p>
        </div>
        <div className="column">Lorem ipsum dolor sit.</div>
        <div
          className="column is-narrow button is-dark"
          onClick={() => setOpen(!open)}
        >
          Full Schedule ᐯ
        </div>
      </div>
    </div>
  ) : (
    <div className="schedule-bar container is-fluid is-vcentered is-open">
      <div className="columns up-next">
        <div className="column is-narrow">
          <p>in 1hr 1m</p>
        </div>
        <div className="column">Lorem ipsum dolor sit.</div>
      </div>
      <ScheduleDatePicker />
      <ScheduleShowEntry />
      <div className="columns">
        <div
          className="column is-12 button is-dark"
          onClick={() => setOpen(!open)}
        >
          Close ᐱ
        </div>
      </div>
    </div>
  );
}

export default ScheduleBar;
