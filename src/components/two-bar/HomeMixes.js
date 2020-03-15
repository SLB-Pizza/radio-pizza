import React from "react";
import { HomeSingleMix } from "./index";

function HomeMixes() {
  return (
    <div className="container is-fluid home-mixes">
      {/*
      Desktop Sizes
      */}
      <div className="columns">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="title is-size-2-desktop is-size-3-touch">
              Radio Sets
            </p>
            <p className="title is-size-4-desktop is-size-5-touch">
              Recent mixes from Halfmoon residents.
            </p>
            <button className="sticky-link button is-black">
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
    </div>
  );
}

export default HomeMixes;
