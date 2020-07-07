import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function SingleMixCard(props) {
  const dispatch = useContext(GlobalDispatchContext);

  /**
   * imageAltText for accessibility purposes
   */
  const imageAltText = `image - ${props.name} by ${props.artist}`;

  return (
    <div className={props.columnLayout}>
      <div className="card">
        <div
          className="card-image"
          onClick={() =>
            dispatch({
              type: "CHANGE_URL",
              payload: {
                url: props.url,
                title: props.title,
                artist: props.artist,
                img: props.img,
              },
            })
          }
        >
          <a
            href="#"
            className="sr-only display-text"
            onClick={() =>
              dispatch({
                type: "CHANGE_URL",
                payload: {
                  url: props.url,
                  title: props.title,
                  artist: props.artist,
                  img: props.img,
                },
              })
            }
          >
            Play This Mix
          </a>
          <figure className="image is-1by1">
            <img src={props.img} alt={imageAltText} />
            <div className="play-btn-diffuser is-overlay" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content-text">
            <p className="content-date subtitle is-size-7-touch is-size-7-desktop is-size-6-widescreen">
              {props.date} | {props.artist}
            </p>
            <p className="title is-size-6-touch is-size-6-desktop is-size-5-widescreen">
              {props.name}
            </p>
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
