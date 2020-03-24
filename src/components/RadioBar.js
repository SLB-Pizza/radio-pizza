import React, { useContext, useEffect, useState } from "react";
import {
  GlobalDispatchContext,
  GlobalStateContext
} from "../context/GlobalContextProvider";
import axios from "axios";
import { RadioPlayer } from "./index";

import {
  faCommentAlt,
  faVolumeUp,
  faVolumeMute
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RadioBar() {
  const dispatch = useContext(GlobalDispatchContext);

  const handleToggleMuted = async () => {
    await dispatch({ type: "TOGGLE_MUTE" });
  };

  const [radioData, setRadioData] = useState({});
  const [mute, setMute] = useState(false);

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
        <div className="level-item">
          <figure className="image is-64x64">
            <img src="../img/Halfmoon-3.png" alt="Halfmoon Logo" />
          </figure>
        </div>
        <div className="level-item">
          {mute ? (
            <span
              className="icon is-medium has-text-dark"
              onClick={() => {
                setMute(!mute);
                handleToggleMuted();
              }}
            >
              <FontAwesomeIcon icon={faVolumeMute} size="2x" />
            </span>
          ) : (
            <span
              className="icon is-medium has-text-dark"
              onClick={() => {
                setMute(!mute);
                handleToggleMuted();
              }}
            >
              <FontAwesomeIcon icon={faVolumeUp} size="2x" />
            </span>
          )}
        </div>

        <div className="level-item">
          <RadioPlayer status={radioData.status} />
        </div>
      </div>
      <div className="level-right">
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
