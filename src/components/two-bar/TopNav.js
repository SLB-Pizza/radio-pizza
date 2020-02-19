import React from "react";
import { faCommentAlt, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RadioPlayer() {
  return (
    <div className="level fixed-radio-player">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">Logo</p>
        </div>
        <div className="level-item">
          <p>Audio Player/Spectrum</p>
        </div>
      </div>
      <div className="level-right">
        <p className="level-item">
          <span className="icon is-medium has-text-dark">
            <FontAwesomeIcon icon={faVolumeUp} size="2x" />
          </span>
        </p>
        <p className="level-item">
          <span className="icon is-medium has-text-dark">
            <FontAwesomeIcon icon={faCommentAlt} size="2x" />
          </span>
        </p>
        <p className="level-item">10:59:45PM NYC</p>
      </div>
    </div>
  );
}

export default RadioPlayer;
