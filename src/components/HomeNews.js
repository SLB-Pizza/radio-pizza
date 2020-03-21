import React from "react";
import { HomeSingleNews } from "./two-bar/index";

function HomeNews() {
  return (
    <div className="container is-fluid home-news">
      {/*
      Desktop Sizes
      */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="title is-size-2">Features</p>
            <p className="title is-size-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              sagittis quam ut quam sagittis vestibulum vel ac lectus.
            </p>
            <button className="sticky-link button is-dark">
              More Features >
            </button>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            <HomeSingleNews />
            <HomeSingleNews />
          </div>
        </div>
      </div>
      {/*
      Touch Sizes
      */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          <p className="title is-size-2 mobile-headers">Features</p>
        </div>
        <div className="column is-narrow more-link">
          <button className="button is-small is-dark">More Features ></button>
        </div>
        <div className="column is-12">
          <p className="title is-size-4 mobile-headers">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            sagittis quam ut quam sagittis vestibulum vel ac lectus.
          </p>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        <HomeSingleNews />
        <HomeSingleNews />
        <HomeSingleNews />
      </div>
    </div>
  );
}

export default HomeNews;
