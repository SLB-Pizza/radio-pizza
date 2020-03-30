import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function BioSingleMix(props) {
  return (
    <div className="column is-6-touch is-3-desktop">
      <div className="resident-mix">
        <div className="image is-1by1">
          <div className="play-btn-diffuser">
            <FontAwesomeIcon icon={faPlay} size="6x" color="white" />
          </div>
        </div>
        <div className="mix-content">
          <p className="content-date is-size-7 is-size-6-fullhd">03.30.20</p>
          <p className="title is-size-5-mobile is-size-4-tablet is-size-3-fullhd">
            Lorem Ipsum Dolor
          </p>
          <p className="subtitle is-size-7-mobile is-size-6-tablet is-size-5-fullhd">
            Resident Artist
          </p>
          <div className="tags are-small">
            <span className="tag is-dark">Genre</span>
            <span className="tag is-dark">Genrerock</span>
            <span className="tag is-dark">Alt-Genre</span>
            <span className="tag is-dark">Genrecore</span>
            <span className="tag is-dark">Post-Genre</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BioSingleMix;
