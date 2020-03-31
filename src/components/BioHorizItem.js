import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function BioHorizItem(props) {
  return (
    <div className="column is-6-tablet is-4-desktop">
      <div className="columns bio-single-mix">
        <div className="column is-4">
          <div
            className="bio-mix-image image is-1by1"
            style={{ backgroundImage: `url(${props.img})` }}
          >
            <div className="play-btn-diffuser is-overlay">
              <span>
                <FontAwesomeIcon icon={faPlayCircle} size="5x" />
              </span>
            </div>
          </div>
        </div>
        <div className="column is-8 item-content">
          <p className="title is-size-5-mobile is-size-4-tablet">
            {props.name}
          </p>
          <p className="subtitle is-size-7-mobile is-size-6-tablet">
            {props.artist}
          </p>
          <p className="content-date is-size-7">{props.date}</p>
          <p className="is-size-7">{props.url}</p>
          <div className="tags are-small">
            {props.tags.map(tag => (
              <span key={tag} className="tag is-dark">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BioHorizItem;
