import React, { useState } from "react";
import { ScheduleDatePicker, ScheduleShowEntry } from "./index";

function ScheduleBar() {
  const [open, setOpen] = useState(false);

  return !open ? (
    <div className="schedule-bar container is-fluid is-vcentered">
      <div className="columns is-mobile up-next">
        <div className="column is-narrow">
          <p>in 1hr 1m</p>
        </div>
        <div className="column">Lorem ipsum dolor sit.</div>
        <div
          className="column is-narrow button is-dark"
          id="expand-button"
          onClick={() => setOpen(!open)}
        >
          Full Schedule ᐯ
        </div>
      </div>
    </div>
  ) : (
    <div className="schedule-bar container is-fluid is-vcentered is-open">
      <div className="columns up-next is-mobile">
        <div className="column is-narrow">
          <p>in 1hr 1m</p>
        </div>
        <div className="column">Lorem ipsum dolor sit.</div>
      </div>
      <div
        className="columns is-vcentered is-hidden-desktop"
        id="scroll-instructions"
      >
        <div className="column">
          <p className="is-size-7 has-text-centered">
            ⇦ Scroll to view more dates ⇨
          </p>
        </div>
      </div>
      <ScheduleDatePicker />
      <ScheduleShowEntry />
      <ScheduleShowEntry />
      <ScheduleShowEntry />
      <ScheduleShowEntry />
      <ScheduleShowEntry />
      <ScheduleShowEntry />

      <div className="columns">
        <div
          className="column is-12 button is-dark"
          id="expand-button"
          onClick={() => setOpen(!open)}
        >
          Close
        </div>
      </div>
    </div>
  );
}

export default ScheduleBar;
