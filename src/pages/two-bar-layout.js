import React from "react";
import "../components/styles/hero-test.scss";

const TwoBarLayout = () => (
  <div className="container">
    <div className="columns">
      <div className="column head-color">
        <h2 className="title is-2">Level 2 heading</h2>
        <p className="content">Cool content. Using Bulma!</p>
      </div>
      <div className="column is-four-fifths foot-color">
        <h2 className="title is-2">Level 2 heading</h2>
        <p className="content">This column is cool too!</p>
      </div>
    </div>
  </div>
);

export default TwoBarLayout;
