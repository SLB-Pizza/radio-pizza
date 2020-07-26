import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import NanoClamp from "nanoclamp";

function SingleMixCard(props) {
  const dispatch = useContext(GlobalDispatchContext);

  /**
   * @function playAudioButton - function that takes in props from BioMixList and creates active YT audio sources
   * @param {string} url - URL of the mix to play
   * @param {string} title - title of the mix to play; shown in TopNav
   * @param {string} resident - resident that made the mix; shown in TopNav
   * @param {string} img - the mix's image; shown in TopNav
   * @returns {jsx} A play icon that onClick dispatches the CHANGE_URL action, playing the audio source through RadioPlayer.js
   */

  const playAudioButton = (mixUrl, mixTitle, mixResident, mixImg) => {
    return (
      <FontAwesomeIcon
        icon={faPlay}
        size="5x"
        className="play-icon"
        onClick={() =>
          dispatch({
            type: "CHANGE_URL",
            payload: {
              url: mixUrl,
              title: mixTitle,
              resident: mixResident,
              img: mixImg,
            },
          })
        }
      />
    );
  };

  /**
   * imageAltText for accessibility purposes
   */
  const imageAltText = `image - ${props.title} by ${props.resident}`;

  return (
    <div className={props.columnLayout}>
      <div className="card">
        <div className="card-image">
          <a
            href="#"
            className="sr-only display-text"
            onClick={() =>
              dispatch({
                type: "CHANGE_URL",
                payload: {
                  url: props.url,
                  title: props.title,
                  resident: props.resident,
                  img: props.img,
                },
              })
            }
          >
            Play This Mix
          </a>
          <figure className="image is-1by1">
            <img src={props.img} alt={imageAltText} />
            <div className="play-btn-diffuser is-overlay">
              {playAudioButton(
                props.url,
                props.title,
                props.resident,
                props.img
              )}
            </div>
          </figure>
        </div>

        <div className="card-content">
          <div className="content-text">
            <p className="content-details sc-truncate subtitle is-size-7">
              {props.date} | {props.resident}
            </p>
            <NanoClamp
              className="title is-size-6"
              is="p"
              lines={2}
              text={props.title}
            />
          </div>
          <div className="buttons are-tags">
            {props.tags.map((tag) => (
              <button
                key={tag}
                className="button is-small is-outlined is-rounded"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMixCard;
