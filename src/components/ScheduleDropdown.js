import React from "react";
import { ScheduleDatePicker, ScheduleShowEntry } from "./index";

function ScheduleDropdown() {
  return (
    <>
      <div className="columns up-next is-hidden-tablet">
        <div className="column is-narrow">
          <p>in 1hr 1m</p>
        </div>
        <div className="column">Lorem ipsum dolor sit.</div>
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
          className="column is-12 has-background-dark"
          id="expand-button"
          onClick={() => setOpen(!open)}
        >
          <p className="title is-size-4 has-text-centered has-text-light">
            Close
          </p>
        </div>
      </div>
    </>
  );
}

export default ScheduleDropdown;
