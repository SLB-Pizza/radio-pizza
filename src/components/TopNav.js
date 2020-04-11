import React from "react";
import { RadioBar, ScheduleBar } from "./index";

function TopNav() {
  return (
    <div className="radio-and-schedule-bar">
      <RadioBar />

      <ScheduleBar />
    </div>
  );
}

export default TopNav;
