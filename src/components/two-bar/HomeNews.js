import React from "react";
import { HomeSingleNews } from "./index";

function HomeNews() {
  return (
    <div className="container is-fluid home-news">
      {/*
      Desktop Sizes
      */}
      <div className="columns">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="title is-size-2-desktop is-size-3-touch">
              News & Articles
            </p>
            <p className="title is-size-4-desktop is-size-5-touch">
              A closer look at the music, the artists, the scenes and the people
              that make it happen.
            </p>
            <button className="sticky-link button is-black">
              View More Features >
            </button>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            <HomeSingleNews />
            <HomeSingleNews />
            <HomeSingleNews />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeNews;
