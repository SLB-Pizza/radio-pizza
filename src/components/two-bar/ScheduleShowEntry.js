import React from "react";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ScheduleShowEntry() {
  return (
    <div className="columns is-vcentered is-mobile show-entry">
      <div className="column is-3">
        <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
          12:00PM - 12:00AM
        </p>
      </div>
      <div className="column is-9">
        <p className="title is-size-5 is-size-6-touch">
          A Show Name Long Enough to Rival Some Post-Rock Album Titles
        </p>
        <p className="subtitle is-size-6-desktop is-size-7 touch">Host Name</p>
      </div>
    </div>
  );
}

export default ScheduleShowEntry;
