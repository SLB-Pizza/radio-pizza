import React, { useState } from "react";
import { ScheduleDatePicker } from "./index";

function ScheduleBar() {
  const [open, setOpen] = useState(false);

  return !open ? (
    <div className="container is-fluid schedule-bar">
      <div className="columns is-multiline">
        <div className="column is-narrow" id="up-next">
          <p>in 1hr 1m</p>
        </div>
        <div className="column">Lorem ipsum dolor sit.</div>
        <div
          className="column is-narrow button is-dark"
          id="expand-schedule"
          onClick={() => setOpen(!open)}
        >
          ᐯ
        </div>
      </div>
    </div>
  ) : (
    <div className="container is-fluid schedule-bar is-open">
      <div className="columns">
        {/* DESKTOP */}

        <div className="column is-narrow" id="up-next">
          in 31 mins
        </div>
        <div className="column">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div
          className="column is-narrow button is-dark"
          id="expand-schedule"
          onClick={() => setOpen(!open)}
        >
          ᐱ
        </div>
      </div>
      <ScheduleDatePicker />
    </div>
  );
}

export default ScheduleBar;
