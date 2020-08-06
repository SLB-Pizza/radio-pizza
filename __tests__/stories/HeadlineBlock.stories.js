import React from "react";
import { HeadlineBlock } from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Headline Block",
  component: HeadlineBlock,
};

const darkImageSlice = {
  primary: {
    feature_headline_img: {
      dimensions: {
        width: 2880,
        height: 1800,
      },
      alt: "oslo escalator",
      copyright: null,
      url:
        "https://images.prismic.io/hmbk-cms/450e3121-5d28-48eb-961c-937cfd5bd364_wallhaven-w8yxlr.jpg?auto=compress,format",
    },
    feature_category: "music",
    feature_subcategory: "playlists",
    feature_headline: [
      {
        type: "heading1",
        text: "Beyond 174: The Search for the Ultimate High Speed Workout",
        spans: [],
      },
    ],
    feature_subtitle: [
      {
        type: "heading4",
        text:
          "These ten must-add songs will bring your next workout to blistering heights.",
        spans: [],
      },
    ],
    feature_byline: "Christian Mejia",
  },
};

export const baseLayout = () => (
  <>
    <main style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <HeadlineBlock slice={darkImageSlice} />
    </main>
  </>
);
