import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { formatDateTime } from "../utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { SingleScheduleEntryRow } from "../components";
import dummySchedule from "../../__test__/HMBK-schedule-page-query-test.json";

// See ScheduleShowEntry for details on these
function ScheduleDropdown({
  setOpen,
  open,
  toggleSchedule,
  showData,
  timeNow,
}) {
  // const [todayDate, setTodayDate] = useState(dayjs());

  // useEffect(() => {
  //   const date = setInterval(() => {
  //     setTodayDate(todayDate.add(1, "s"));
  //   }, 5000);

  //   return () => {
  //     clearInterval(date);
  //   };
  // });

  const { schedule_date, schedule_entries } = showData;

  const todaysDate = formatDateTime(timeNow, "schedule-date-heading");

  return (
    <div className="columns is-multiline is-vcentered is-mobile dropdown">
      <div className="column">
        <p className="display-text is-size-5-desktop is-size-6-touch has-text-centered">
          {todaysDate}
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

      <div className="column is-12">
        {schedule_entries.map((entry, index) => {
          const { start_time, end_time, scheduled_show } = entry;
          const formattedStart = formatDateTime(start_time, "hour-minute");
          const formattedEnd = formatDateTime(end_time, "hour-minute");

          return (
            <SingleScheduleEntryRow
              key={`show-entry-#${index}-${start_time}`}
              start={formattedStart}
              end={formattedEnd}
              show={scheduled_show}
            />
          );
        })}
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
