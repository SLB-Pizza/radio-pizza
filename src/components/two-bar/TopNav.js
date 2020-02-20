import React from "react";
import { RadioPlayer } from "./index";
import { faCommentAlt, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";

/**
 * Currently, the TopNav bar has a semi-transparent white bg to better account for layouts, and therefore colors, overlapping. This will be amended to a solid color for the previews to come.
 */

function TopNav() {
  let currTime = moment()
    .tz("America/New_York")
    .format();
  // const [time, setTime] = useState(new Date());

  // useEffect(() => {
  //   let;
  // });

  return (
    <div className="level is-mobile fixed-radio-player">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">Logo</p>
        </div>

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
        <p className="level-item">{currTime} NYC</p>
      </div>
    </div>
  );
}

export default TopNav;
