import React, { useState, useEffect } from "react";
import { ScheduleShowEntry } from "../../components";
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
          <p className="title is-size-3-desktop is-size-4-touch">Schedule</p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            All times are EST.
          </p>
        </div>
      </div>

      <div className="columns is-vcentered is-mobile">
        <div className="column">
          <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted display-text">
            {todayDate.format("MM.DD")}
          </button>
        </div>
        <div className="column">
          <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
            {todayDate.add(1, "d").format("MM.DD")}
          </button>
        </div>
        <div className="column">
          <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
            {todayDate.add(2, "d").format("MM.DD")}
          </button>
        </div>
        <div className="column">
          <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
            {todayDate.add(3, "d").format("MM.DD")}
          </button>
        </div>
        <div className="column">
          <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
            {todayDate.add(4, "d").format("MM.DD")}
          </button>
        </div>
        <div className="column">
          <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
            {todayDate.add(5, "d").format("MM.DD")}
          </button>
        </div>
        <div className="column">
          <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
            {todayDate.add(6, "d").format("MM.DD")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleIndexPage;
