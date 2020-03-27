import React from "react";

function ScheduleShowEntry() {
  return (
    <div className="columns is-vcentered is-mobile show-entry">
      <div className="column is-3">
        <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
          12:00P - 12:00A
        </p>
      </div>
      <div className="column is-9">
        <p className="title is-size-5-desktop is-size-6-touch">
          A Show Name Long Enough to Rival Some Post-Rock Album Titles
        </p>
        <p className="subtitle is-size-6-desktop is-size-7 touch">Host Name</p>
      </div>
    </div>
  );
}

export default ScheduleShowEntry;
