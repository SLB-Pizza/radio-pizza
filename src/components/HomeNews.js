import React from "react";
import { Link } from "gatsby";
import { HomeSingleNews } from "./index";

function HomeNews() {
  return (
    <div className="container is-fluid" id="home-news">
      {/*
      Desktop Sizes
      */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="title is-size-3">Features</p>
            <p className="subtitle is-size-5">
              En su cumpleaños, la decisión que tomó Nacional con sus empleados.
            </p>

            <Link to="/">
              <button className="button is-outlined is-rounded is-dark is-inverted">
                All Mixes
              </button>
            </Link>
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
          <p className="title is-size-3 mobile-headers">Features</p>
        </div>
        <div className="column is-narrow more-link">
          <Link to="/">
            <button className="button is-outlined is-rounded is-dark is-inverted">
              All Mixes
            </button>
          </Link>
        </div>
        <div className="column is-12">
          <p className="subtitle is-size-5 mobile-headers">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        <HomeSingleNews />
        <HomeSingleNews />
      </div>
    </div>
  );
}

export default HomeNews;
