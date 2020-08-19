import React from "react";

export default function ImageHelper({ columnClass, url, alt }) {
  return (
    <div className="column is-one-quarter">
      <figure className="image has-ratio">
        <img src={url} alt={alt} />
        <figcaption>Credit: </figcaption>
      </figure>
    </div>
  );
}
