import React from "react";

function ResidentsAlpha(props) {
  return (
    <div className="columns">
      <div className="column">
        <p className="title is-size-3">{props.letter}</p>
      </div>
    </div>
  );
}

export default ResidentsAlpha;
