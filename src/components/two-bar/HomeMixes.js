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
          <p className="title is-size-2-desktop is-size-4-touch">Radio Sets</p>
          <p className="title is-size-4-desktop is-size-6-touch">
            Recent mixes from Halfmoon residents.
          </p>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            {/* <div className="column">
              <p>Hello</p>
            </div> */}
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
