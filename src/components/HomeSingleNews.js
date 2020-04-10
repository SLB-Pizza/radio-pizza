import React from "react";

function HomeSingleNews() {
  return (
    <div className="column is-9-mobile is-6-tablet">
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9">
            <img
              src="https://source.unsplash.com/1280x720/daily?portrait"
              alt="news-img"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date subtitle is-size-7-touch is-size-6-desktop">
            Category | 03.30.20
          </p>
          <p className="title is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
            Lorem Ipsum Dolor
          </p>
          <p className="subtitle is-size-7-mobile is-size-6-tablet is-size-5-fullhd">
            A tagline enticing the reader to click and find out more.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleNews;
