import React from "react";

function SingleEventCard(props) {
  const imageAltText = `image - ${props.eventName} in ${props.location}`;

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-16by9">
          <img src={props.img} alt={imageAltText} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content-text">
          <p className="content-date subtitle is-size-7-touch is-size-7-desktop is-size-6-widescreen">
            {props.date} | {props.location}
          </p>
          <p className="title is-size-6-touch is-size-6-desktop is-size-5-widescreen">
            {props.eventName}
          </p>
          <p className="is-size-6-touch is-size-6-desktop is-size-5-widescreen">
            {props.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleEventCard;