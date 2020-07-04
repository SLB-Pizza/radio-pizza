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

  const fakeShowEntryData = [
    {
      startTime: "12:00",
      endTime: "14:00",
      hostInfo: ["Nhato"],
    },
    {
      startTime: "12:00",
      endTime: "14:00",
      hostInfo: ["Getty", "KO3 & Relect"],
    },
    {
      startTime: "12:00",
      endTime: "14:00",
      showName: "PLANET /// SHAPER -- 3 Man Crew",
      hostInfo: ["JAKAZiD", "Tanuki", "Hommarju"],
    },
    {
      startTime: "12:00",
      endTime: "14:00",
      hostInfo: ["DJ Shimamura"],
    },
    {
      startTime: "12:00",
      endTime: "14:00",
      hostInfo: ["Seventhrun", "DJ Noriken"],
    },
    {
      startTime: "12:00",
      endTime: "14:00",
      showName: "The Edge of The Drum & Bass Universe",
      hostInfo: ["Netsky", "Matrix & Futurebound"],
    },
  ];

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
      <div className="columns is-mobile is-multiline">
        <div className="column">
          <p className="title is-size-2-desktop is-size-3-touch">Schedule</p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            All times are NYC.
          </p>
        </div>
      </div>

      <DateSelectorButton date={todayDate} />

      <div className="columns is-multiline is-vcentered is-mobile schedule-page-entries">
        <div className="column is-12 today-date">
          <p className="title is-size-4-desktop is-size-5-mobile has-text-centered">
            {todayDate.format("dddd, MMMM D")}
          </p>
        </div>
        {fakeShowEntryData.map((show) => (
          <div key={show.hostInfo} className="column is-12 single-show-entry">
            <div className="columns is-mobile is-vcentered">
              <div className="column is-4">
                <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
                  {show.startTime} – {show.endTime}
                </p>
              </div>
              {show.hasOwnProperty("showName") ? (
                <div className="column is-8">
                  <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
                    {show.showName}
                  </p>
                  <p className="subtitle is-size-7 has-text-centered">
                    {show.hostInfo.join(", ")}
                  </p>
                </div>
              ) : (
                <div className="column is-8">
                  <p className="subtitle is-size-6-tablet is-size-7-mobile has-text-centered">
                    {show.hostInfo.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleIndexPage;
