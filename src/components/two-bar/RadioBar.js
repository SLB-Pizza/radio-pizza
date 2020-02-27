import React from "react";
import { RadioPlayer } from "./index";
import { faCommentAlt, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RadioBar() {
  return (
    <div className="level is-mobile radio-bar">
      <div className="level-left">
        <div className="level-item" id="play-button" />
        <div className="level-item">
          <RadioPlayer />
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
        <p className="level-item">4:59PM NYC</p>
      </div>
    </div>
  );
}

export default RadioBar;