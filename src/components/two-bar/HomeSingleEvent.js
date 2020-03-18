import React from "react";

function HomeSingleEvent() {
  return (
    <div className="column is-7-touch is-6-desktop">
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9">
            <img
              src="https://source.unsplash.com/1280x720/daily?trance"
              alt="single-event"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date is-size-7">LOCATION | 03.30.20</p>
          <p className="title is-size-4 is-size-3-fullhd">Lorem Ipsum Dolor</p>
          <p className="subtitle is-size-6 is-size-5-fullhd">
            One line talking about this awesome event
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleEvent;
