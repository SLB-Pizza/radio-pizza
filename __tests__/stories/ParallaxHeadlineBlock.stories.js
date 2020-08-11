import React from "react";
import { ParallaxHeadlineBlock } from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Parallax Headline",
  component: ParallaxHeadlineBlock,
};

export const baseLayout = () => (
  <main className="site-page">
    <ParallaxHeadlineBlock />
    {/* <section className="container is-fluid" style={{ marginTop: "10rem" }}>
      <div className="columns is-multiline">
        <div className="column is-12">
          <h1 className="title is-size-3-desktop is-size-4-touch">
            Features Data
          </h1>
        </div>
      </div>
    </section> */}
  </main>
);
