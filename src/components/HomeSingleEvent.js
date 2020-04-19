import React from "react";

function HomeSingleEvent() {
  return (
    <div className="column is-9-mobile is-two-fifths-tablet is-4-desktop">
      <div className="card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img
              src="https://source.unsplash.com/1280x1280/daily?trance"
              alt="single-event"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date subtitle is-size-7-touch is-size-6-desktop">
            04.21.20 | Location
          </p>
          <p className="title is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
            Lorem Ipsum Dolor
          </p>
          <p className="subtitle is-size-7-mobile is-size-6-tablet is-size-5-fullhd">
            One line talking about this awesome event.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleEvent;
