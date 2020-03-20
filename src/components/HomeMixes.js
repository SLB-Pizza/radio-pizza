import React from "react";
import { HomeSingleMix } from "./two-bar/index";

function HomeMixes() {
  return (
    <div className="container is-fluid home-mixes">
      {/*
      Desktop Sizes
      */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="title is-size-2">Daily Mixes</p>
            <p className="title is-size-4">
              Recent mixes from Halfmoon residents.
            </p>
            <button className="sticky-link button is-dark">More Mixes ></button>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            <HomeSingleMix />
            <HomeSingleMix />
            <HomeSingleMix />
            <HomeSingleMix />
            <HomeSingleMix />
            <HomeSingleMix />
            <HomeSingleMix />
            <HomeSingleMix />
          </div>
        </div>
      </div>
      {/*
      Touch Sizes
      */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          <p className="title is-size-2 mobile-headers">Daily Mixes</p>
        </div>
        <div className="column is-narrow more-link">
          <button className="button is-small is-dark">More Mixes ></button>
        </div>
        <div className="column is-12">
          <p className="title is-size-4 mobile-headers">
            Recent mixes from Halfmoon residents.
          </p>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        <HomeSingleMix />
        <HomeSingleMix />
        <HomeSingleMix />
        <HomeSingleMix />
        <HomeSingleMix />
        <HomeSingleMix />
        <HomeSingleMix />
        <HomeSingleMix />
      </div>
    </div>
  );
}

export default HomeMixes;