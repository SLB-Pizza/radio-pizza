import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { SingleScheduleEntryRow } from "../components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import dummySchedule from "../../__tests__/HMBK-schedule-page-query-test.json";

// See ScheduleShowEntry for details on these
function ScheduleDropdown({ setOpen, open, toggleSchedule }) {
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
    <div className="columns is-multiline is-vcentered is-mobile dropdown">
      {/*
      ScheduleDropdown sets and passes this as a prop down
      - Since this is reused on the site, toggle placement of linkeE
      - Doesn't show on /schedule
      */}
      <div className="column">
        <p className="display-text is-size-6 has-text-centered">
          {todayDate.format("dddd, MMMM D")}
        </p>
      </div>

      <div className="column is-narrow">
        <Link to="/schedule">
          <button
            className="button is-small is-outlined is-rounded display-text"
            onClick={() => {
              setOpen(!open);
              toggleSchedule();
            }}
          >
            Full Schedule
          </button>
        </Link>
      </div>
      {/* {fakeShowEntryData.map((show) => (
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
      ))} */}
    </div>
  );
}

export default ScheduleDropdown;
