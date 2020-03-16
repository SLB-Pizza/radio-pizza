import React from "react";

function HomeSingleNews() {
  return (
    <div className="column is-10-touch is-12-desktop">
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9">
            <img
              src="https://source.unsplash.com/1280x720/daily?interview"
              alt="news-img"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date is-size-7">CATEGORY | 03.30.20</p>
          <p className="title is-size-4 is-size-3-fullhd">Lorem Ipsum Dolor</p>
          <p className="subtitle is-size-6 is-size-5-fullhd">
            A tagline enticing the reader to click and find out more.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleNews;
