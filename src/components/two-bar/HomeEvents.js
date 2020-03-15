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
            <p className="title is-size-2-desktop is-size-3-touch">
              Live Events
            </p>
            <p className="title is-size-4-desktop is-size-5-touch">
              Parties, the Halfmoon way.
            </p>
            <button className="sticky-link button is-black">
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
