import React, { useContext, useEffect, useState } from "react";
import {
  GlobalDispatchContext,
  GlobalStateContext
} from "../context/GlobalContextProvider";
import axios from "axios";
import { RadioPlayer } from "./index";
import { Link } from "gatsby";

import dayjs from 'dayjs'

// var weekday = require('dayjs/plugin/weekday')
// dayjs.extend(weekday)

// var customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)

var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

import {
  faComments,
  faVolumeUp,
  faVolumeMute
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";

function RadioBar() {
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);
  const [radioData, setRadioData] = useState({});
  const [mute, setMute] = useState(false);
  const [pageIsVisible, setPageIsVisible] = useState(true);
  const [localTime, setLocalTime] = useState(dayjs());
  const [nycTime, setNycTime] = useState(dayjs(new Date().toLocaleString("en-US", {timeZone: "America/New_York"})));
  const [laTime, setLaTime] = useState(dayjs(new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})));

  useEffect(() => {
    const clock = setInterval(() => {
      setLocalTime(localTime.add(1, 's'));
      setNycTime(nycTime.add(1, 's'));
      setLaTime(laTime.add(1, 's'));
    }, 1000);


    return () => {
      clearInterval(clock)
    }
  });


  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible);
  };

  const handleToggleMuted = async () => {
    await dispatch({ type: "TOGGLE_MUTE" });
  };

  const handlePlayLive = async () => {
    await dispatch({
      type: "CHANGE_URL",
      payload: {
        url: "https://streamer.radio.co/sa3c47c55b/listen",
        title: "Halfmoon Radio"
      }
    });
  };

  const liveText = "Pendulum: Hold Your Colour 15th Anniversary Live Set";
  const renderLiveTicker = text => {
    return (
      <div className="columns is-vcentered live-bar">
        <div className="column">
          <Ticker mode="await" offset="run-in" speed={3}>
            {() => (
              <p className="title is-size-6" id="test-ticker">
                LIVE – {text}!
              </p>
            )}
          </Ticker>
        </div>
      </div>
    );
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
    <div
      className={
        globalState.live
          ? "container is-fluid radio-bar is-live"
          : "container is-fluid radio-bar"
      }
    >
      {globalState.live ? (
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible && renderLiveTicker(liveText)}
        </PageVisibility>
      ) : null}

      <div className="columns is-vcentered is-mobile header-bar">
        <div className="column is-narrow">
          <Link to="/">
            {globalState.live ? (
              <figure className="image is-48x48">
                <img src="../img/Halfmoon-3.png" alt="Halfmoon Logo" />
              </figure>
            ) : (
              <figure className="image is-64x64">
                <img src="../img/Halfmoon-3.png" alt="Halfmoon Logo" />
              </figure>
            )}
          </Link>
        </div>

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
        <div className="column is-narrow">
          <a
            className="chat-btn"
            href="http://halfmoonradiochat.chatango.com/"
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon icon={faComments} size="2x" />
          </a>
        </div>
        <div className="column is-narrow is-hidden-touch">
          <p className="has-text-light">{localTime.format('hh:mm:ss a')} Local</p>
          {/* <p className="has-text-light">{nycTime.format('hh:mm:ss a')} NYC</p> */}
          <p className="has-text-light">{laTime.format('ddd HH:mm:ss a')} L.A.</p>
        </div>
      </div>
    </div>
  );
}

export default RadioBar;
