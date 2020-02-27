import React, { useState, useEffect } from "react";

function ScheduleBar() {
  const [active, setActive] = useState(false);

  return (
    <div
      className={"container is-fluid schedule-bar" + (active ? " is-open" : "")}
    >
      {!active ? (
        <div className="columns">
          {/* DESKTOP */}
          <div className="column is-2">in 31 mins</div>
          <div className="column is-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <div
            className="column is-2 button is-dark is-fullwidth"
            id="expand-schedule"
            onClick={() => setActive(!active)}
          >
            More Details
          </div>
        </div>
      ) : (
        <div className="columns">
          {/* DESKTOP */}
          <div className="column is-2">in 31 mins</div>
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
            onClick={() => setActive(!active)}
          >
            More Details
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleBar;
