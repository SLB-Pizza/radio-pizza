import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import { GlobalStateContext } from "../context/GlobalContextProvider";
import { RadioBar, ScheduleBar } from "./index";

function TopNav() {
  const globalState = useContext(GlobalStateContext);

  const [nycTime, setNYCTime] = useState(dayjs().tz("America/New_York"));
  const [laTime, setLATime] = useState(dayjs().tz("America/Los_Angeles"));

  useEffect(() => {
    const clock = setInterval(() => {
      setNYCTime(nycTime.add(1, "s"));
      setLATime(laTime.add(1, "s"));
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  });

  return (
    <div
      className={
        globalState.live
          ? "radio-and-schedule-bar is-live"
          : "radio-and-schedule-bar"
      }
    >
      <RadioBar nycTime={nycTime} laTime={laTime} />
      <ScheduleBar timeNow={nycTime} />
    </div>
  );
}

export default TopNav;
