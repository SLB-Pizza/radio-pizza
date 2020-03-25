import React from "react";

function ResidentsAlpha(props) {
  return (
    <div className="columns letter">
      <div className="column">
        <p className="title is-size-4 has-text-centered">{props.letter}</p>
      </div>
    </div>
  );
}

export default ResidentsAlpha;
