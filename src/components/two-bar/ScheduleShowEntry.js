import React from "react";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ScheduleShowEntry() {
  return (
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
  );
}

export default ScheduleShowEntry;
