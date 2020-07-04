import React from "react";
import { ScheduleShowEntry } from "./index";

// See ScheduleShowEntry for details on these props

function ScheduleDropdown(props) {
  return (
    <ScheduleShowEntry
      open={props.open}
      setOpen={props.setOpen}
      toggleSchedule={props.toggleSchedule}
      fromNavbar={true}
    />
  );
}

export default ScheduleDropdown;
