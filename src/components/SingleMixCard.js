import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";
import playAudioButton from "../utils/playAudioButton";

import NanoClamp from "nanoclamp";

function SingleMixCard(props) {
  // console.log("inside SMC", props);
  const dispatch = useContext(GlobalDispatchContext);

  /**
   * @const {String} imageAltText - create image alt text for accessibility purposes
   */
  const imageAltText = `${props.title} by ${props.resident}`;

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
            <p className="content-details text-truncate subtitle is-size-7">
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
