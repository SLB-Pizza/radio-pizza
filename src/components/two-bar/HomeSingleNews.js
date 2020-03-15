import React from "react";

function HomeSingleNews() {
  return (
    <div className="column is-6-touch is-6-tablet is-3-widescreen">
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9">
            <img
              src="https://source.unsplash.com/1600x900/?nature"
              alt="mix-img"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="is-size-7">03.30.20</p>
          <p className="title is-size-3-desktop is-size-4-touch">
            Lorem Ipsum Dolor
          </p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            Resident Artist
          </p>
          <div className="tags are-small">
            <span class="tag is-dark">Genre</span>
            <span class="tag is-dark">Niche Subgenre</span>
            <span class="tag is-dark">Other Genre</span>
            <span class="tag is-dark">Genrecore</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleNews;
