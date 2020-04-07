import React, { useContext, useEffect, useState } from "react";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
import axios from "axios";
import { RadioPlayer } from "./index";
import { Link } from "gatsby";

import {
  faComments,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AudioSpectrum from "react-audio-spectrum";

function RadioBar() {
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);
  const [radioData, setRadioData] = useState({});
  const [mute, setMute] = useState(false);

  const handleToggleMuted = async () => {
    await dispatch({ type: "TOGGLE_MUTE" });
  };

  const handlePlayLive = async () => {
    await dispatch({
      type: "CHANGE_URL",
      payload: {
        url: "https://streamer.radio.co/sa3c47c55b/listen",
        title: "Halfmoon Radio",
      },
    });
  };

  useEffect(() => {
    async function getRadioData() {
      const result = await axios(
        "https://public.radio.co/stations/sa3c47c55b/status"
      );
      setRadioData(result.data);
    }
    getRadioData();
  }, []);

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
        {globalState.live ? (
          <div className="column is-narrow">
            <div
              id="live-now"
              onClick={() => {
                console.log("radioData", radioData);
                handlePlayLive();
              }}
            >
              <p className="is-size-6">LIVE</p>
              <p className="is-size-7">listen now</p>
            </div>
          </div>
        ) : null}
        <div className="column is-narrow is-hidden-touch mute-btn">
          {mute ? (
            <FontAwesomeIcon
              icon={faVolumeMute}
              size="2x"
              onClick={() => {
                setMute(!mute);
                handleToggleMuted();
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faVolumeUp}
              size="2x"
              onClick={() => {
                setMute(!mute);
                handleToggleMuted();
              }}
            />
          )}
        </div>
        <div className="column">
          <RadioPlayer
            status={radioData.status}
            // currentTrack={radioData.current_track.title}
          />
        </div>

        <div className="column is-narrow chat-btn">
          <FontAwesomeIcon icon={faComments} size="2x" />
        </div>
        <div className="column is-narrow is-hidden-touch">
          <p className="has-text-light">4:59PM NYC</p>
        </div>
      </div>
    </div>
  );
}

export default RadioBar;
