import React, { useState, useEffect } from "react";

function ScheduleBar() {
  const [active, setActive] = useState(false);

  return (
    <div
      className={"container is-fluid schedule-bar" + (active ? " is-open" : "")}
    >
      <div className="columns is-vcentered">
        <div className="column is-1">in 31 mins</div>
        <div className="column is-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="column is-1"></div>
        <div className="column is-4">SHOW</div>
        <div
          className="column is-2 button is-dark is-fullwidth"
          id="expand-schedule"
          onClick={() => setActive(!active)}
        >
          More Details
        </div>
      </div>
      {/* <div className="level-left">
        <div className="level-item">in 51 mins</div>
        <div className="level-item"> This is where the show block starts</div>
      </div>
      <div className="level-right">
        <p className="level-item">
          <span className="icon is-medium has-text-dark">

          </span>
        </p>
        <p className="level-item">
          <span className="icon is-medium has-text-dark">

          </span>
        </p>
        <p className="level-item">4:59PM NYC</p>
        <button
          className="level-item button is-rounded is-dark"
          onClick={() => setActive(!active)}
        >
          VVV
        </button>
      </div> */}
    </div>
  );
}

export default ScheduleBar;
