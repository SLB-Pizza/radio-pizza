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
        <div className="column is-12 today-date">
          <p className="display-text is-size-6">
            {todayDate.format("dddd, MMMM D")}
          </p>

          <Link to="/schedule">
            <button
              className="button is-small is-outlined is-rounded display-text"
              onClick={() => props.setOpen(!props.open)}
            >
              View Full Schedule
            </button>
          </Link>
        </div>
      )}
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
                <p className="display-text is-size-6-tablet is-size-7-mobile has-text-centered">
                  {show.showName}
                </p>
                <p className="display-text is-size-7 has-text-centered">
                  {show.hostInfo.join(", ")}
                </p>
              </div>
            ) : (
              <div className="column is-8">
                <p className="display-text is-size-6-tablet is-size-7-mobile has-text-centered">
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
