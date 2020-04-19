import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function BioHorizItem(props) {
  const dispatch = useContext(GlobalDispatchContext);

  /**
   * @function playAudioSource - function that takes in props from BioMixList and creates active YT audio sources
   * @returns {jsx} A play icon that onClick dispatches the CHANGE_URL action, playing the audio source through RadioPlayer.js
   * @param {string} url - the audio url
   * @param {string} title - title of the audio
   */

  const playAudioSource = (url, title) => {
    return (
      <>
        <FontAwesomeIcon
          icon={faPlayCircle}
          size="7x"
          className="is-hidden-touch"
          onClick={() =>
            dispatch({
              type: "CHANGE_URL",
              payload: {
                url: url,
                title: title,
              },
            })
          }
        />
        <FontAwesomeIcon
          icon={faPlayCircle}
          size="3x"
          className="is-hidden-desktop"
          onClick={() =>
            dispatch({
              type: "CHANGE_URL",
              payload: {
                url: url,
                title: title,
              },
            })
          }
        />
      </>
    );
  };

  /**
   * imageAltText for accessibility purposes
   */
  const imageAltText = `image - ${props.name} by ${props.artist}`;

  return (
    <div className="column is-12-mobile is-6-tablet is-4-fullhd bio-single-mix">
      <div className="columns is-vcentered is-multiline is-mobile bio-mix-container">
        <div className="column is-two-fifths-tablet is-one-third-mobile item-image">
          <figure className="image is-1by1">
            <img src={props.img} alt={imageAltText} />
            <div className="play-btn-diffuser is-overlay">
              <span>{playAudioSource(props.url, props.name)}</span>
            </div>
          </figure>
        </div>
        <div className="column is-three-fifths-tablet is-two-thirds-mobile item-content">
          <p className="subtitle is-size-7-touch is-size-6-desktop">
            {props.date} | {props.artist}
          </p>
          <p className="title is-size-6-touch is-size-5-desktop">
            {props.name}
          </p>
          <div className="tags is-hidden-touch">
            {props.tags.map((tag) => (
              <span key={tag} className="tag is-black">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="column is-12 is-hidden-desktop tags">
          {props.tags.map((tag) => (
            <span key={tag} className="tag is-black">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BioHorizItem;
