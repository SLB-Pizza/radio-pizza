import React, { useContext } from "react";
import { RadioBar, ScheduleBar } from "./index";
import { GlobalStateContext } from "../context/GlobalContextProvider";

function TopNav() {
  const globalState = useContext(GlobalStateContext);

  return (
    <div
      className={
        globalState.live
          ? "radio-and-schedule-bar is-live"
          : "radio-and-schedule-bar"
      }
    >
      <RadioBar />
      <ScheduleBar />
    </div>
  );
}

export default TopNav;
