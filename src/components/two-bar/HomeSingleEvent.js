import React from "react";

function HomeSingleEvent() {
  return (
    <div className="column is-12-tablet is-6-desktop">
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9">
            <img
              src="https://source.unsplash.com/1280x720/?trance"
              alt="single-event"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date is-size-7">03.30.20</p>
          <p className="title is-size-3-desktop is-size-4-touch">
            Lorem Ipsum Dolor
          </p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            Resident Artist
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleEvent;
