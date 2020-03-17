import React from "react";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ScheduleShowEntry() {
  return (
    <div className="columns is-vcentered">
      <div className="column is-3">
        <p className="is-size-4 has-text-centered">4:00PM - 5:45PM</p>
      </div>
      <div className="column show-info">
        <p className="show-name is-size-4">Short Show</p>
        <div className="host-info">
          <p className="is-size-6">Host Name</p>
          <span className="icon is-medium">
            <FontAwesomeIcon icon={faTwitter} size="1x" />
          </span>
          <span className="icon is-medium">
            <FontAwesomeIcon icon={faInstagram} size="1x" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScheduleShowEntry;
