import React, { useState, useEffect } from "react";
import { DateSelectorButton, ScheduleShowEntry } from "../../components";
import dayjs from "dayjs";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

function ScheduleIndexPage() {
  const [isSelected, setIsSelected] = "";
  const [wholeWeek, setWholeWeek] = [];
  const [wholeWeekIds, setWholeWeekIds] = [];
  const [todayDate, setTodayDate] = useState(
    dayjs(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))
  );

  const addDays = (day) => {
    let daysArr = [];
    let idsArr = [];

    for (let i = 0; i <= 6; i++) {
      daysArr.push(day.add(i, "d").format("ddd, MMM D"));
      idsArr.push(day.add(i, "d").format("ddd"));
    }

    // console.log("days", daysArr);
    // console.log("ids", idsArr);

    // setWholeWeek(daysArr);
    // setWholeWeekIds(idsArr);
  };

  function toggleColumn(e) {
    if (isSelected !== e.currentTarget.id) {
      setIsSelected(e.currentTarget.id);
    }
  }

  useEffect(() => {
    const date = setInterval(() => {
      // Set today's date
      setTodayDate(todayDate.add(5, "s"));

      // Pass today's date into addDays and receive two arrays of day and id strings

      addDays(todayDate);
    }, 5000);

    return () => {
      clearInterval(date);
    };
  });

  return (
    <div className="container is-fluid site-page">
      <div className="columns is-mobile">
        <div className="column is-full">
          <p className="title is-size-2-desktop is-size-3-touch">Schedule</p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            All times are EST.
          </p>
        </div>
      </div>
      {/*  */}
      <DateSelectorButton date={todayDate} />
      <ScheduleShowEntry toggleColumn={toggleColumn} isSelected={isSelected} />
    </div>
  );
}

export default ScheduleIndexPage;
