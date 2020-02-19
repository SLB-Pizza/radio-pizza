import React from "react";

function RadioPlayer() {
  return (
    <div className="fixed-radio-player">
      <div className="container is-fluid" id="top-bar">
        <div className="columns is-mobile">
          <div className="column is-1">
            <p>Logo</p>
          </div>
          <div className="column is-5">
            <p>Radio Player</p>
          </div>
          <div className="column is-4">
            <p>Audio Spectrum</p>
          </div>
          <div className="column is-2">
            <p>Icons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadioPlayer;
