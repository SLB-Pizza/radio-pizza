import React from "react";

function RadioPlayer() {
  return (
    <div className="radio-player is-flex">
      <div id="radioShowPic">
        <img
          src="https://source.unsplash.com/1920x1080/daily?music"
          alt="ShowPic"
        />
      </div>
      <div id="radioShowDetails">
        <div id="radioShowTime">
          <p>8:00 - 10:00PM</p>
        </div>
        <div id="radioShowName">
          <p>The Show with a Much Longer Title </p>
        </div>
      </div>
    </div>
  );
}

export default RadioPlayer;
