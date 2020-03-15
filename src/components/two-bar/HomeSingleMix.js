import React from "react";

function HomeSingleMix() {
  return (
    <div className="column is-4">
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9">
            <img
              src="https://source.unsplash.com/1600x900/?nature"
              alt="mix-img"
            />
          </figure>
        </div>
      </div>
      <div className="card-content">
        <p className="title is-size-4-desktop is-size-6-touch">
          Lorem Ipsum Doloris
        </p>
        <p className="mix-category is-size-7">CATEGORY</p>
      </div>
    </div>
  );
}

export default HomeSingleMix;
