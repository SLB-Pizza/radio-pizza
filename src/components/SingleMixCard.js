import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function SingleMixCard(props) {
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

  return (
    <div className="column is-9-mobile is-two-fifths-tablet is-4-desktop">
      <div className="card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img
              src="https://source.unsplash.com/1080x1080/daily?concert"
              alt="mix-img"
            />
            <div className="play-btn-diffuser is-overlay">
              <span>{playAudioSource(props.url, props.name)}</span>
            </div>
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date subtitle is-size-7-touch is-size-6-desktop">
            {/* 04.21.20 | Some Resident */}
            {props.date} | {props.artist}
          </p>
          <p className="title is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
            {/* Lorem Ipsum Dolor */}
            {props.name}
          </p>

          <div className="tags are-small">
            {/* <span className="tag is-black">Genre</span>
            <span className="tag is-black">Genrerock</span>
            <span className="tag is-black">Alt-Genre</span>
            <span className="tag is-black">Genrecore</span>
            <span className="tag is-black">Post-Genre</span> */}
            {props.tags.map((tag) => (
              <span key={tag} className="tag is-black">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMixCard;
