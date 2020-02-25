import React from "react";
import { RadioBar, ScheduleBar } from "./index";

import moment from "moment-timezone";

/**
 * Currently, the TopNav bar has a semi-transparent white bg to better account for layouts, and therefore colors, overlapping. This will be amended to a solid color for the previews to come.
 */

function TopNav() {
  let currTime = moment()
    .tz("America/New_York")
    .format();

  return (
    <div className="radio-and-schedule-bar">
      <RadioBar />
      <ScheduleBar />
    </div>
  );
}

export default TopNav;
