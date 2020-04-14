import React from "react";
import { ScheduleDatePicker, ScheduleShowEntry } from "./index";

function ScheduleDropdown(props) {
  return (
    <>
      <div className="columns is-vcentered is-mobile is-hidden-mobile up-next">
        <div className="column is-narrow">
          <p className="is-size-6">in 1hr 1m</p>
        </div>
        <div className="column">
          <p className="title is-size-6 has-text-light">Loremip.</p>
        </div>
        <div className="column is-narrow" id="open-schedule">
          <button className="button" onClick={() => props.setOpen(!props.open)}>
            <p className="title is-size-7-touch is-size-6-desktop">Close ▲</p>
          </button>
        </div>
      </div>
      <ScheduleDatePicker />
      {/* <div className="columns is-multiline is-mobile show-entries">
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
      </div> */}
    </>
  );
}

export default ScheduleDropdown;
