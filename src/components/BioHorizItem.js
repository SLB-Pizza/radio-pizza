import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function BioHorizItem(props) {
  const dispatch = useContext(GlobalDispatchContext);

  /**
   * @function playYTSource - function that takes in props from BioMixList and creates active YT audio sources
   * @param {string} url - the YT audio url
   * @param {string} title - title of the YT audio
   */
  const playYTSource = (url, title, size) => {
    return (
      <FontAwesomeIcon
        icon={faPlayCircle}
        size={size}
        onClick={() =>
          dispatch({
            type: "CHANGE_URL",
            payload: {
              url: url,
              title: title
            }
          })
        }
      />
    );
  };

  return (
    <div className="column is-12-touch is-4-desktop">
      <div className="columns is-mobile is-multiline bio-single-mix">
        <div className="column is-4-desktop is-two-fifths-tablet is-12-mobile">
          <figure className="image is-1by1">
            <img src={props.img} alt="name" />
            <div className="play-btn-diffuser is-overlay">
              <span>{playYTSource(props.url, props.name, "5x")}</span>
            </div>
          </figure>
        </div>
        <div className="column is-8-desktop is-three-fifths-tablet is-12-mobile item-content">
          <p className="subtitle is-size-7-mobile is-size-6-tablet">
            {props.date} | {props.artist}
          </p>
          <p className="title is-size-5-mobile is-size-4-tablet">
            {props.name}
          </p>
          <p className="is-size-7 has-text-white">{props.tags.join(" - ")}</p>
          <p className="is-size-7-mobile is-size-6-tablet is-12-mobile">
            Source: <a href={props.url}>Youtube</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BioHorizItem;
