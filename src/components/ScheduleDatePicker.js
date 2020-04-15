import React, { useState } from "react";
import { ScheduleShowEntry } from "./";
// import dayjs from "dayjs";

const fakeDateData = [
  {
    weekday: "TUE",
    date: "Apr 14"
  },
  {
    weekday: "WED",
    date: "Apr 15"
  },
  {
    weekday: "THU",
    date: "Apr 16"
  },
  {
    weekday: "FRI",
    date: "Apr 17"
  },
  {
    weekday: "SAT",
    date: "Apr 18"
  },
  {
    weekday: "SUN",
    date: "Apr 19"
  },
  {
    weekday: "MON",
    date: "Apr 20"
  }
];

function ScheduleDatePicker() {
  const [isChosen, setIsChosen] = useState("TUE");

  function toggleColumn(e) {
    if (isChosen !== e.currentTarget.id) {
      setIsChosen(e.currentTarget.id);
    }
    return;
  }

  return (
    <>
      <div className="columns is-mobile date-picker">
        {fakeDateData.map(day => (
          <div
            key={day.date}
            id={day.weekday}
            className={
              isChosen === day.weekday
                ? "column is-5-mobile has-text-centered day-of-week is-active"
                : "column is-5-mobile has-text-centered day-of-week"
            }
            onClick={toggleColumn}
          >
            <p className="title is-size-5-desktop is-size-6-touch">
              {day.weekday}
            </p>
            <p className="subtitle is-size-6-desktop is-size-7-touch">
              {day.date}
            </p>
          </div>
        ))}
      </div>
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

export default ScheduleDatePicker;
