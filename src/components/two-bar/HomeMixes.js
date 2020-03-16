import React from "react";
import { HomeSingleMix } from "./index";

function HomeMixes() {
  return (
    <div className="container is-fluid home-mixes">
      {/*
      Desktop Sizes
      */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="title is-size-2">Radio Sets</p>
            <p className="title is-size-4">
              Recent mixes from Halfmoon residents.
            </p>
            <button className="sticky-link button is-dark">
              View More Mixes >
            </button>
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
      <div className="columns is-mobile is-hidden-desktop">
        <div className="columns is-mobile is-hidden-desktop">
          <div className="column is-12">
            <p className="title is-size-2">Radio Sets</p>
            <p className="title is-size-4">
              Recent mixes from Halfmoon residents.
            </p>
            <button className="button is-small is-dark">
              View More Mixes >
            </button>
          </div>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-mixes">
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
