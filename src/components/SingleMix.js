import React from "react";

function SingleMix() {
  return (
    <div className="column is-6">
      <div className="single-mix">
        <div className="black-overlay is-flex">
          <div className="mix-info">
            <p className="mix-category title is-size-7">03.29.20</p>
            <p className="title is-size-3-desktop is-size-5-touch">
              Lorem Ipsum Doloris
            </p>
          </div>
        </div>
      </div>
      <div className="tags are-small">
        <span className="tag is-primary">Genre</span>
        <span className="tag is-primary">Genrerock</span>
        <span className="tag is-primary">Alt-Genre</span>
        <span className="tag is-primary">Genrecore</span>
        <span className="tag is-primary">Post-Genre</span>
      </div>
    </div>
  );
}

export default SingleMix;
