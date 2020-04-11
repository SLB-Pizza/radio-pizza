import React from "react";
import { HomeSingleEvent } from "./index";

function HomeEvents() {
  return (
    <div id="home-events">
      <div className="container is-fluid image-diffuser">
        {/*
      Desktop Sizes
      */}
        <div className="columns is-hidden-touch">
          <div className="column is-3">
            <div className="sticky-section-blurb">
              <p className="title is-size-3">Live Events</p>
              <p className="subtitle is-size-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <button className="sticky-link button">More ></button>
            </div>
          </div>
          <div className="column is-9">
            <div className="columns is-multiline">
              <HomeSingleEvent />
              <HomeSingleEvent />
              <HomeSingleEvent />
            </div>
          </div>
        </div>
        {/*
      Touch Sizes
      */}
        <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
          <div className="column">
            <p className="title is-size-3 mobile-headers">Live Events</p>
          </div>
          <div className="column is-narrow more-link">
            <button className="button is-small">More ></button>
          </div>
          <div className="column is-12">
            <p className="subtitle is-size-5 mobile-headers">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
        <div className="columns is-mobile is-hidden-desktop mobile-single-items">
          <HomeSingleEvent />
          <HomeSingleEvent />
          <HomeSingleEvent />
          <HomeSingleEvent />
          <HomeSingleEvent />
          <HomeSingleEvent />
          <HomeSingleEvent />
          <HomeSingleEvent />
        </div>
      </div>
    </div>
  );
}

export default HomeEvents;
