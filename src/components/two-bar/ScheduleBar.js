import React, { useState } from "react";

function ScheduleBar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={"container is-fluid schedule-bar" + (open ? " is-open" : "")}
    >
      {!open ? (
        <div className="columns is-mobile">
          {/* DESKTOP */}

          <div className="column is-narrow" id="up-next">
            <p>in 1hr 1m</p>
          </div>
          <div className="column">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <div
            className="column is-narrow button is-dark"
            id="expand-schedule"
            onClick={() => setOpen(!open)}
          >
            ᐯ
          </div>
        </div>
      ) : (
        <div className="columns">
          {/* DESKTOP */}

          <div className="column is-narrow" id="up-next">
            in 31 mins
          </div>
          <div className="column">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </div>
          <div
            className="column is-narrow button is-dark"
            id="expand-schedule"
            onClick={() => setOpen(!open)}
          >
            ᐱ
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleBar;
