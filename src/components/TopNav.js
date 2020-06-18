import React, { useState, useContext } from "react";
import { RadioBar, ScheduleBar } from "./index";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

function TopNav() {
  // const dispatch = useContext(GlobalDispatchContext);
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
