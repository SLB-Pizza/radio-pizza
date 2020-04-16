import React, { useState } from "react";
import { Link } from "gatsby";
import dayjs from "dayjs";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const fakeShowEntryData = [
  {
    startTime: "12:00",
    endTime: "14:00",
    showName: "Short Show",
    hostInfo: ["Nhato"]
  },
  {
    startTime: "12:00",
    endTime: "14:00",
    showName: "Hardcore Till I Die Special",
    hostInfo: ["Getty", "KO3 & Relect"]
  },
  {
    startTime: "12:00",
    endTime: "14:00",
    showName: "PLANET /// SHAPER -- 3 Man Crew",
    hostInfo: ["JAKAZiD", "Tanuki", "Hommarju"]
  },
  {
    startTime: "12:00",
    endTime: "14:00",
    showName: "Trancelucid",
    hostInfo: ["DJ Shimamura"]
  },
  {
    startTime: "12:00",
    endTime: "14:00",
    showName: "DJ Noriken Live Set ft. Seventhrun",
    hostInfo: ["Seventhrun", "DJ Noriken"]
  },
  {
    startTime: "12:00",
    endTime: "14:00",
    showName: "The Edge of The Drum & Bass Universe",
    hostInfo: ["Netsky", "Matrix & Futurebound"]
  }
];

function ScheduleShowEntry(props) {
  const [todayDate, setTodayDate] = useState();

  return (
    <div className="columns is-multiline is-mobile show-entries">
      {fakeShowEntryData.map(show => (
        <div key={show.showName} className="column is-12 single-show-entry">
          <div className="columns is-mobile is-vcentered">
            <div className="column is-3">
              <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
                {show.startTime} – {show.endTime}
              </p>
            </div>
            <div className="column is-9">
              <p className="is-size-4-desktop is-size-6-touch">
                {show.showName}
              </p>
              <p className="is-size-6-desktop is-size-7-touch">
                {show.hostInfo.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/*
      ScheduleDropdown sets and passes this as a prop down
      - Since this is reused on the site, toggle placement of link
      - Doesn't show on /schedule
       */}
      {props.showSchedLink && (
        <div className="column is-12">
          <Link to="/schedule">View Full Schedule</Link>
        </div>
      )}
    </div>
  );
}

export default ScheduleShowEntry;
