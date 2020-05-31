import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "gatsby";
import { faSearch, faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ticker from "react-ticker";

import { RadioPlayer } from "./index";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
import PageVisibility from "react-page-visibility";

function RadioBar() {
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

  const [radioData, setRadioData] = useState({});
  const [pageIsVisible, setPageIsVisible] = useState(true);
  const [localTime, setLocalTime] = useState(dayjs());
  const [nycTime, setNycTime] = useState(
    dayjs(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))
  );
  const [laTime, setLaTime] = useState(
    dayjs(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    )
  );

  useEffect(() => {
    const clock = setInterval(() => {
      setLocalTime(localTime.add(1, "s"));
      setNycTime(nycTime.add(1, "s"));
      setLaTime(laTime.add(1, "s"));
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  });

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible);
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

  const liveText = "Pendulum: Hold Your Colour 15th Anniversary Live Set";
  const renderLiveTicker = (text) => {
    return (
      <div className="columns is-mobile is-vcentered live-bar">
        <div className="column is-narrow live-invert">
          <p className="title is-size-5 has-text-centered">ON AIR</p>
        </div>
        <div className="column live-ticker">
          <Ticker mode="await" offset="run-in" speed={3}>
            {() => <p className="title is-size-5">{text}!</p>}
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
    <div className="container is-fluid radio-bar">
      <a href="#navigation" className="sr-only">
        Jump to navigation bar
      </a>

      {/* {globalState.live ? (
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible && renderLiveTicker(liveText)}
        </PageVisibility>
      ) : null} */}

      <div className="columns is-vcentered is-mobile">
        <div className="column is-narrow">
          <Link to="/">
            <figure className="image is-48x48">
              <img src={`../img/halfmoon-3.png`} alt="Return to home page" />
            </figure>
          </Link>
        </div>

        <RadioPlayer status={radioData.status} />

        <div className="column is-narrow">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} size="lg" className="icon-color" />
          </Link>
        </div>

        <div className="column is-narrow">
          <a
            href="http://halfmoonradiochat.chatango.com/"
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon
              icon={faComments}
              size="lg"
              className="icon-color"
            />
          </a>
        </div>

        <div className="column is-narrow is-hidden-touch">
          <p className="display-text is-size-6">{laTime.format("HH:mm")} LA</p>
          <p className="display-text is-size-6">
            {nycTime.format("HH:mm")} NYC
          </p>
        </div>
      </div>
    </div>
  );
}

export default RadioBar;
