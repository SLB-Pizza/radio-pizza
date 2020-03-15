import React from "react";

function HomeSingleMix() {
  return (
    <div className="column is-6-tablet is-3-widescreen">
      <div className="card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img
              src="https://source.unsplash.com/1080x1080/daily?snow"
              alt="mix-img"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date is-size-7">03.30.20</p>
          <p className="title is-size-4 is-size-3-fullhd">Lorem Ipsum Dolor</p>
          <p className="subtitle is-size-6 is-size-5-fullhd">Resident Artist</p>
          <div className="tags are-small">
            <span className="tag is-dark">Genre</span>
            <span className="tag is-dark">Genrerock</span>
            <span className="tag is-dark">Alt-Genre</span>
            <span className="tag is-dark">Genrecore</span>
            <span className="tag is-dark">Post-Genre</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleMix;
