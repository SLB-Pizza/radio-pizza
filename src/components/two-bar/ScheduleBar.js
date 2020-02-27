import React, { useState } from "react";

function ScheduleBar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={"container is-fluid schedule-bar" + (open ? " is-open" : "")}
    >
      {!open ? (
        <div className="columns">
          {/* DESKTOP */}

          <div className="column is-2" id="up-next">
            <p>in 1hr 1m</p>
          </div>
          <div className="column is-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <div
            className="column is-2 button is-dark is-fullwidth"
            id="expand-schedule"
            onClick={() => setOpen(!open)}
          >
            More Details
          </div>
        </div>
      ) : (
        <div className="columns">
          {/* DESKTOP */}

          <div className="column is-2" id="up-next">
            in 31 mins
          </div>
          <div className="column is-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </div>
          <div
            className="column is-2 button is-dark is-fullwidth"
            id="expand-schedule"
            onClick={() => setOpen(!open)}
          >
            Close Details
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleBar;
