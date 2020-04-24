import React from "react";

function Hero(props) {
  return (
    <div className="homepage-hero">
      <div className="container is-fluid">
        <div className="columns">
          <div className="column">
            <p className="title is-size-3-mobile is-size-1-tablet has-text-centered">
              Test Sources
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column">{props.soundcloudBtn}</div>
          <div className="column">{props.mixcloudBtn}</div>
          <div className="column">{props.radioCoBtn}</div>
          <div className="column">{props.youtubeBtn}</div>
          <div className="column">{props.vimeoBtn}</div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
