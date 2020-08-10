import React from "react";

export default function ImageHelper(props) {
  return (
    <div className="column is-one-quarter">
      <figure className="image is-square">
        <img src={props.url} alt={props.alt} />
      </figure>
    </div>
  );
}
