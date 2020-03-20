import React from "react";

function Hero(props) {
  return (
    <div className="homepage-hero">
      <div className="container is-fluid">
        <div className="columns">
          <div className="column">
            <code>{props.heading}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
