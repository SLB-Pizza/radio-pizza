import React, { useState, useEffect } from "react";

function ScheduleBar() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log(`bar is: ${active}`);
  });

  return (
    <div
      className={"level is-mobile schedule-bar" + (active ? " is-open" : "")}
    >
      <div className="level-left">
        <div className="level-item">in 51 mins</div>
        <div className="level-item"> This is where the show block starts</div>
      </div>
      <div className="level-right">
        <p className="level-item">
          <span className="icon is-medium has-text-dark">
            {/* <FontAwesomeIcon icon={faVolumeUp} size="2x" /> */}
          </span>
        </p>
        <p className="level-item">
          <span className="icon is-medium has-text-dark">
            {/* <FontAwesomeIcon icon={faCommentAlt} size="2x" /> */}
          </span>
        </p>
        <p className="level-item">4:59PM NYC</p>
        <button
          className="level-item button is-rounded is-dark"
          onClick={() => setActive(!active)}
        >
          VVV
        </button>
      </div>
    </div>
  );
}

export default ScheduleBar;
