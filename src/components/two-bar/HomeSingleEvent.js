import React from "react";

function HomeSingleEvent() {
  return (
    <div className="column is-3-widescreen is-6-desktop">
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
          <p className="title is-size-4-desktop is-size--touch">
            Lorem Ipsum Doloris
          </p>
          <p className="subtitle is-size-6-desktop is-size-7-touch">
            Resident Artist
          </p>
          <p className="is-size-5"></p>
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

export default HomeSingleEvent;
