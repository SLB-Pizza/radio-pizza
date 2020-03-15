import React from "react";
import { HomeSingleEvent } from "./index";

function HomeEvents() {
  return (
    <div className="container is-fluid home-events">
      {/*
      Desktop Sizes
      */}
      <div className="columns">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="title is-size-2">Live Events</p>
            <p className="title is-size-4">Parties, the Halfmoon way.</p>
            <button className="sticky-link button is-dark">
              View More Events >
            </button>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            <HomeSingleEvent />
            <HomeSingleEvent />
            <HomeSingleEvent />
            <HomeSingleEvent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeEvents;
