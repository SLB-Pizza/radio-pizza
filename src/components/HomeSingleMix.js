import React from "react";

function HomeSingleMix() {
  return (
    <div className="column is-9-mobile is-two-fifths-tablet is-4-desktop">
      <div className="card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img
              src="https://source.unsplash.com/1080x1080/daily?concert"
              alt="mix-img"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="content-date is-size-7">03.30.20</p>
          <p className="title is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
            Lorem Ipsum Dolor
          </p>
          <p className="subtitle is-size-7-mobile is-size-6-tablet is-size-5-fullhd">
            Resident Artist
          </p>
          <div className="tags are-small">
            <span className="tag is-black">Genre</span>
            <span className="tag is-black">Genrerock</span>
            <span className="tag is-black">Alt-Genre</span>
            <span className="tag is-black">Genrecore</span>
            <span className="tag is-black">Post-Genre</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSingleMix;
