import React from "react";
import NanoClamp from "nanoclamp";

function SingleEventCard(props) {
  const imageAltText = `image - ${props.eventName} in ${props.location}`;

  return (
    <div className={props.eventColumnLayout}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9">
            <img src={props.img} alt={imageAltText} />
          </figure>
        </div>
        <div className="card-content">
          <div className="event-text">
            <p className="content-date text-truncate subtitle is-size-7">
              {props.date} | {props.location}
            </p>
            <p className="title is-size-6-touch is-size-6-desktop is-size-5-widescreen">
              {props.eventName}
            </p>
            <NanoClamp
              className="is-size-6"
              is="p"
              lines={2}
              ellipsis={"...read more >"}
              text={props.blurb}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEventCard;
