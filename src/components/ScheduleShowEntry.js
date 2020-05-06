import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import dayjs from "dayjs";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

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

function ScheduleShowEntry(props) {
  const [todayDate, setTodayDate] = useState(dayjs());

  useEffect(() => {
    const date = setInterval(() => {
      setTodayDate(todayDate.add(1, "s"));
    }, 1000);

    return () => {
      clearInterval(date);
    };
  });

  return (
    <div className="columns is-multiline is-vcentered is-mobile show-entries">
      {/*
      ScheduleDropdown sets and passes this as a prop down
      - Since this is reused on the site, toggle placement of link
      - Doesn't show on /schedule
      */}
      {props.fromNavbar && (
        <>
          <div className="column is-4 today-date">
            <p className="title is-size-3-widescreen is-size-4-desktop is-size-5-touch has-text-centered">
              {todayDate.format("dddd, MMMM D")}
            </p>
          </div>
          <div className="column is-8 today-date">
            <Link to="/schedule">
              <p
                className="is-size-4-widescreen is-size-5-desktop is-size-6-tablet has-text-right"
                id="view-full-schedule"
                onClick={() => props.setOpen(!props.open)}
              >
                View Full Schedule
              </p>
            </Link>
          </div>
        </>
      )}
      {fakeShowEntryData.map((show) => (
        <div key={show.showName} className="column is-12 single-show-entry">
          <div className="columns is-mobile is-vcentered">
            <div className="column is-4">
              <p className="title is-size-5 has-text-centered">
                {show.startTime} – {show.endTime}
              </p>
            </div>
            {show.hasOwnProperty("showName") ? (
              <div className="column is-8">
                <p className="is-size-4-widescreen is-size-5-desktop is-size-6-touch">
                  {show.showName}
                </p>
                <p className="is-size-5-widescreen is-size-6-desktop is-size-7-touch">
                  {show.hostInfo.join(", ")}
                </p>
              </div>
            ) : (
              <div className="column is-8">
                <p className="is-size-4-widescreen is-size-5-desktop is-size-6-touch">
                  {show.hostInfo.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScheduleShowEntry;
