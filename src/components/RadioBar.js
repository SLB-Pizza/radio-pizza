import React, { useContext, useEffect, useState } from "react";
import {
  GlobalDispatchContext,
  GlobalStateContext
} from "../context/GlobalContextProvider";
import axios from "axios";
import { RadioPlayer } from "./index";
import { Link } from "gatsby";

import {
  faComments,
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

  /**
   *
   *
   */

  return (
    <div className="container is-fluid radio-bar">
      <div className="columns is-vcentered is-mobile">
        <div className="column is-narrow">
          <Link to="/">
            <figure className="image is-64x64">
              <img src="../img/Halfmoon-3.png" alt="Halfmoon Logo" />
            </figure>
          </Link>
        </div>
        <div className="column is-narrow is-hidden-touch">
          {mute ? (
            <FontAwesomeIcon
              icon={faVolumeMute}
              size="lg"
              onClick={() => {
                setMute(!mute);
                handleToggleMuted();
              }}
              color="white"
            />
          ) : (
            <FontAwesomeIcon
              icon={faVolumeUp}
              size="lg"
              onClick={() => {
                setMute(!mute);
                handleToggleMuted();
              }}
              color="white"
            />
          )}
        </div>
        <div className="column">
          <RadioPlayer status={radioData.status} />
        </div>
        <div className="column is-narrow">
          <FontAwesomeIcon icon={faComments} size="2x" color="white" />
        </div>
        <div className="column is-narrow is-hidden-touch">
          <p className="has-text-light">4:59PM NYC</p>
        </div>
      </div>
    </div>
  );
}

export default RadioBar;
