import React from "react";

function ScheduleShowEntry() {
  return (
    <div className="column is-12 entry-container">
      <div className="columns is-mobile is-vcentered">
        <div className="column is-3">
          <p className="title is-size-5 is-size-6-widescreen has-text-centered">
            12:00P - 12:00A
          </p>
        </div>
        <div className="column is-9">
          <p className="title is-size-5 is-size-6-widescreen">
            A Show Name Long Enough to Rival Some Post-Rock Album Titles
          </p>
          <p className="subtitle is-size-6 is-size-7-widescreen">Host Name</p>
        </div>
      </div>
    </div>
  );
}

export default ScheduleShowEntry;
