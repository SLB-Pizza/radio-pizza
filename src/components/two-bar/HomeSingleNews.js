import React from "react";

function HomeSingleNews() {
  return (
    <div className="column is-12">
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9">
            <img
              src="https://source.unsplash.com/1600x900/?musician"
              alt="mix-img"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="news-data is-flex">
            <p className="is-size-7">03.30.20</p>
            <span class="tag is-info is-light">Category</span>
          </div>
          <p className="title is-size-3-desktop is-size-4-touch">
            Lorem Ipsum Dolor
          </p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            A tagline enticing the reader to click and find out more.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleNews;
