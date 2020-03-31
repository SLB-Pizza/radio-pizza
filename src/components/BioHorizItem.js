import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function BioHorizItem(props) {
  const dispatch = useContext(GlobalDispatchContext);

  /**
   * @function playYTSource - test function that takes in props from BioMixList and creates active YT audio sources
   * @param {string} url - the YT audio url
   * @param {string} title - title of the YT audio
   */
  const playYTSource = (url, title) => {
    return (
      <FontAwesomeIcon
        icon={faPlayCircle}
        size="5x"
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
    <div className="column is-6-tablet is-4-desktop">
      <div className="columns is-mobile is-multiline bio-single-mix">
        <div className="column is-4-desktop is-one-fifth-touch">
          <figure className="image is-1by1">
            <img src={props.img} alt="name" />
            <div className="play-btn-diffuser is-overlay">
              <span className="">{playYTSource(props.url, props.name)}</span>
            </div>
          </figure>
        </div>
        <div className="column is-8-desktop is-four-fifths-touch item-content">
          <p className="title is-size-5-mobile is-size-4-tablet">
            {props.name}
          </p>
          <p className="subtitle is-size-7-mobile is-size-6-tablet">
            {props.date} | {props.artist}
          </p>
          {/* <div className="tags">
            {props.tags.map(tag => (
              <span key={tag} className="tag is-dark">
                {tag}
              </span>
            ))}
          </div> */}
          {/* <p className="content-date is-size-7">{props.date}</p> */}
          {/* <p className="is-size-7">{props.url}</p> */}
        </div>
        <div className="column is-12-touch tags are-small">
          {props.tags.map(tag => (
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
