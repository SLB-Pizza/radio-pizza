import React, { useContext, useEffect, useState } from 'react';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import axios from 'axios';
import { RadioPlayer } from './index';

import {
  faCommentAlt,
  faVolumeUp,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RadioBar() {
  const dispatch = useContext(GlobalDispatchContext);

  const handleToggleMuted = async () => {
    await dispatch({ type: 'TOGGLE_MUTE' });
  };

  const [radioData, setRadioData] = useState({});
  const [mute, setMute] = useState(false);

  useEffect(() => {
    async function axiosGet() {
      const result = await axios(
        'https://public.radio.co/stations/sa3c47c55b/status'
      );
      setRadioData(result.data);
    }
    axiosGet();
  }, []);

  return (
    <div className="container is-fluid radio-bar">
      {/*
      DESKTOP
      */}
      <div className="columns is-vcentered is-hidden-mobile">
        <div className="column is-narrow">
          <figure className="image is-64x64">
            <img src="../img/Halfmoon-3.png" alt="Halfmoon Logo" />
          </figure>
        </div>
        <div className="column is-narrow">
          {mute ? (
            <span
              className="icon has-text-light"
              onClick={() => {
                setMute(!mute);
                handleToggleMuted();
              }}>
              <FontAwesomeIcon icon={faVolumeMute} size="lg" />
            </span>
          ) : (
            <span
              className="icon has-text-light"
              onClick={() => {
                setMute(!mute);
                handleToggleMuted();
              }}>
              <FontAwesomeIcon icon={faVolumeUp} size="lg" />
            </span>
          )}
        </div>
        <div className="column">
          <RadioPlayer status={radioData.status} />
        </div>
        <div className="column is-narrow">
          <span className="icon has-text-light">
            <FontAwesomeIcon icon={faCommentAlt} size="lg" />
          </span>
        </div>
        <div className="column is-narrow">
          <p className="has-text-light">4:59PM NYC</p>
        </div>
      </div>
      {/*
      MOBILE
      */}
      {/* <div className="columns is-vcentered is-mobile is-hidden-desktop">
        <div className="column is-narrow">
          <figure className="image is-64x64">
            <img src="../img/Halfmoon-3.png" alt="Halfmoon Logo" />
          </figure>
        </div>

        <div className="column">
          <RadioPlayer status={radioData.status} />
        </div>

        <div className="column is-narrow">
          <span className="icon has-text-light">
            <FontAwesomeIcon icon={faCommentAlt} size="lg" />
          </span>
        </div>
      </div> */}
    </div>
  );
}

export default RadioBar;
