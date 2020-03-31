import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function BioHorizItem(props) {
  return (
    <div className="column is-6-tablet is-4-desktop">
      <div className="columns is-mobile bio-single-mix">
        <div className="column is-4 bio-mix-image">
          <div className="play-btn-diffuser">
            <span>
              <FontAwesomeIcon icon={faPlayCircle} size="1x" />
            </span>
          </div>
        </div>
        <div className="column is-8 item-content">
          <div>
            <p className="content-date is-size-7">03.30.20</p>
          </div>
          <p className="title is-size-5-mobile is-size-4-tablet is-size-3-fullhd">
            BioHorizItem
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

export default BioHorizItem;
