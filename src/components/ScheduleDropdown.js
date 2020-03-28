import React from "react";
import { ScheduleDatePicker, ScheduleShowEntry } from "./index";

function ScheduleDropdown(props) {
  return (
    <div className="is-hidden-mobile">
      <div className="columns is-vcentered is-mobile up-next">
        <div className="column is-narrow">
          <p className="is-size-6">in 1hr 1m</p>
        </div>
        <div className="column">
          <p className="title is-size-6 has-text-light">Loremip.</p>
        </div>
      </div>
      <ScheduleDatePicker />
      <div className="columns is-multiline is-mobile show-entries">
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
      </div>
      <div className="columns">
        <div className="column is-12 has-background-dark">
          <button
            className="button is-fullwidth is-dark"
            onClick={() => props.setOpen(!props.open)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleDropdown;
