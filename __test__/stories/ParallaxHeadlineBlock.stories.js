import React from "react";
import { ParallaxHeadline } from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Parallax Headline",
  component: ParallaxHeadline,
};

const data = {
  _meta: {
    uid: null,
  },
  _linkType: "Link.document",
  support_cta: [
    {
      type: "heading1",
      text: "HalfmoonBK: Built for listeners, supported by listeners",
      spans: [],
    },
  ],
  support_cta_bg_img: {
    dimensions: {
      width: 2560,
      height: 1440,
    },
    alt: " Photo by Francesco Paggiaro from Pexels",
    copyright: null,
    url:
      "https://images.prismic.io/hmbk-cms/23357a8a-2005-495b-b589-e6ba8f468eba_pexels-francesco-paggiaro-2111016.jpg?auto=compress,format",
  },
  support_cta_hook: [
    {
      type: "heading3",
      text:
        '1-2 lines about how this community-oriented internet radio couldn\'t be produced without the generous help of the listeners. Points about "joining the family", "number of supporters" might be good to touch on here.',
      spans: [],
    },
  ],
};

export const baseLayout = () => (
  <main className="full-height-page">
    <ParallaxHeadline
      cta={data.support_cta}
      hook={data.support_cta_hook}
      imgObj={data.support_cta_bg_img}
    />
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
