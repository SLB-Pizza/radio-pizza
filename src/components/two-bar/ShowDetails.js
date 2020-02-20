import React from "react";

function ShowDetails() {
  return (
    <div className="show-details">
      <div className="show-time-slot">
        <h4>10:00PM - 12:30AM</h4>
      </div>
      <div className="show-info">
        <div className="show-pic">
          <div id="show-pic-sample" />
        </div>
        <div className="show-text">
          <h5>Some show title</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
