import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function SingleMixCard(props) {
  const dispatch = useContext(GlobalDispatchContext);

  /**
   * @function playAudioButton - function that takes in props from BioMixList and creates active YT audio sources
   * @returns {jsx} A play icon that onClick dispatches the CHANGE_URL action, playing the audio source through RadioPlayer.js
   * @param {Object[]} buttons - the array of button object details to create functional mix play buttons
   * @param {string} buttons.size - the size of the play button represented from 1x - 10x
   * @param {string} buttons.url - the audio url
   * @param {string} buttons.title - title of the audio
   * @param {string} [buttons.viewportClass] - className to attach to the play button
   */

  const playAudioButton = (url, title, playBtnInfo) => {
    return (
      <>
        {playBtnInfo.map((singleBtn) => (
          <FontAwesomeIcon
            key={singleBtn.btnSize}
            icon={faPlayCircle}
            size={singleBtn.btnSize}
            className={
              singleBtn.hasOwnProperty("viewportClass")
                ? singleBtn.viewportClass
                : ""
            }
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
        ))}
      </>
    );
  };

  /**
   * imageAltText for accessibility purposes
   */
  const imageAltText = `image - ${props.name} by ${props.artist}`;

  return (
    <div className={props.columnLayout}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img
              src="https://source.unsplash.com/1080x1080/daily?concert"
              alt={imageAltText}
            />
            <div className="play-btn-diffuser is-overlay">
              <span>
                {props.playBtnInfo &&
                  playAudioButton(props.url, props.name, props.playBtnInfo)}
              </span>
            </div>
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date subtitle is-size-7-touch is-size-6-desktop">
            {props.date} | {props.artist}
          </p>
          <p className="title is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
            {props.name}
          </p>

          <div className="tags are-small">
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

// <FontAwesomeIcon
//           icon={faPlayCircle}
//           size="7x"
//           className="is-hidden-touch"
//           onClick={() =>
//             dispatch({
//               type: "CHANGE_URL",
//               payload: {
//                 url: url,
//                 title: title,
//               },
//             })
//           }
//         />
//         <FontAwesomeIcon
//           icon={faPlayCircle}
//           size="3x"
//           className="is-hidden-desktop"
//           onClick={() =>
//             dispatch({
//               type: "CHANGE_URL",
//               payload: {
//                 url: url,
//                 title: title,
//               },
//             })
//           }
//         />
