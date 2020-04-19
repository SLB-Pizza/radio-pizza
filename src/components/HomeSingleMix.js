import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function HomeSingleMix() {
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
              {/* <span>{playAudioSource(props.url, props.name)}</span> */}
            </div>
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date subtitle is-size-7-touch is-size-6-desktop">
            04.21.20 | Some Resident
          </p>
          <p className="title is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
            Lorem Ipsum Dolor
          </p>

          <div className="tags are-small">
            <span className="tag is-black">Genre</span>
            <span className="tag is-black">Genrerock</span>
            <span className="tag is-black">Alt-Genre</span>
            <span className="tag is-black">Genrecore</span>
            <span className="tag is-black">Post-Genre</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleMix;
