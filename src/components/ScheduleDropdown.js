import React from "react";
import { ScheduleDatePicker, ScheduleShowEntry } from "./index";

function ScheduleDropdown(props) {
  return (
    <>
      <div className="columns up-next is-hidden-mobile">
        <div className="column is-narrow">
          <p>in 1hr 1m</p>
        </div>
        <div className="column">Lorem ipsum dolor sit.</div>
      </div>
      <div id="mobile-hide-dropdown">
        <ScheduleDatePicker />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
      </div>
      <div className="columns is-hidden-mobile">
        <div className="column is-12 has-background-dark">
          <button
            className="button is-fullwidth is-dark"
            onClick={() => props.setOpen(!props.open)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default ScheduleDropdown;
