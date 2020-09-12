import React from "react";
import NanoClamp from "nanoclamp";

function SingleEventCard(props) {
  const imageAltText = `image - ${props.eventName} in ${props.location}`;

  return (
    <div className={props.eventColumnLayout}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img src={props.img} alt={imageAltText} />
          </figure>
        </div>
        <div className="card-content">
          <div className="main-text">
            <div className="details">
              <p className="text-truncate subtitle is-size-7">
                {props.date} | {props.location}
              </p>

              <NanoClamp
                className="title is-size-6-touch is-size-6-desktop is-size-5-widescreen"
                is="p"
                lines={2}
                text={props.eventName}
              />
            </div>
            <NanoClamp
              className="blurb is-size-7 has-text-white"
              is="p"
              lines={3}
              ellipsis={"..."}
              text={props.blurb}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEventCard;
