import React from "react";
import { ScheduleDatePicker, ScheduleShowEntry } from "./index";

function ScheduleDropdown(props) {
  return (
    <>
      <ScheduleDatePicker />
      <div className="columns is-multiline is-mobile show-entries">
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
      </div>
    </>
  );
}

export default ScheduleDropdown;
