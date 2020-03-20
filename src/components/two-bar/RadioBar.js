import React, { useContext, useEffect, useState } from "react";
import { RadioPlayer } from "./index";
import { faCommentAlt, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GlobalDispatchContext,
  GlobalStateContext
} from "../../context/GlobalContextProvider";
import axios from "axios";

function RadioBar() {
  const dispatch = useContext(GlobalDispatchContext);

  const handleToggleMuted = async () => {
    await dispatch({ type: "TOGGLE_MUTE" });
  };

  const [radioData, setRadioData] = useState({});

  useEffect(() => {
    async function axiosGet() {
      const result = await axios(
        "https://public.radio.co/stations/sa3c47c55b/status"
      );
      setRadioData(result.data);
    }
    axiosGet();
  }, []);

  return (
    <div className="level is-mobile radio-bar">
      <div className="level-left">
        <div className="level-item has-text-light" id="play-button">
          Logo
        </div>
        <div className="level-item">
          <span
            className="icon is-medium has-text-dark"
            onClick={handleToggleMuted}
          >
            <FontAwesomeIcon icon={faVolumeUp} size="2x" />
          </span>
          {/* {console.log('\nRadio.Co Stream Status: \n', radioData.status)} */}
          <p className="level-item">
            {/* "Radio.Co Stream Status:" */}
            <p className="level-item">{radioData.status}</p>
          </p>
        </div>
        <div className="level-item">
          <RadioPlayer />
        </div>
      </div>
      <div className="level-right">
        <p className="level-item"></p>
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
