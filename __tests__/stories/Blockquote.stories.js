import React from "react";
import { Blockquote } from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Blockquote",
  component: Blockquote,
};

// =======================
// Mock Slice Data from CMS
// =======================

const noBGSlice = {
  primary: {
    blockquote_type: "None: no background image; white quote text on black",
    blockquote_text: [
      {
        type: "paragraph",
        text:
          "We are made of star stuff. We are a way for the cosmos to know itself.",
        spans: [],
      },
    ],
    blockquote_attribution: [
      {
        type: "paragraph",
        text: "Carl Sagan, Cosmos",
        spans: [],
      },
    ],
    blockquote_bg_img: {
      url:
        "https://images.prismic.io/hmbk-cms/874d566f-66e0-491f-ab1c-3372019385f1_wallhaven-yjm67g_1920x1200.png?auto=compress,format",
    },
  },
};

const lightBGSlice = {
  primary: {
    blockquote_type: "Light: light background image; black quote text",
    blockquote_text: [
      {
        type: "paragraph",
        text:
          "We are made of star stuff. We are a way for the cosmos to know itself.",
        spans: [],
      },
    ],
    blockquote_attribution: [
      {
        type: "paragraph",
        text: "Carl Sagan, Cosmos",
        spans: [],
      },
    ],
    blockquote_bg_img: {
      url: "https://w.wallhaven.cc/full/0q/wallhaven-0qg7xq.jpg",
    },
  },
};
const darkBGSlice = {
  primary: {
    blockquote_type: "Dark: dark background image; white quote text",
    blockquote_text: [
      {
        type: "paragraph",
        text:
          "We are made of star stuff. We are a way for the cosmos to know itself.",
        spans: [],
      },
    ],
    blockquote_attribution: [
      {
        type: "paragraph",
        text: "Carl Sagan, Cosmos",
        spans: [],
      },
    ],
    blockquote_bg_img: {
      url: "https://w.wallhaven.cc/full/lq/wallhaven-lqwgdy.jpg",
    },
  },
};

// =======================
// Stories
// =======================

export const noBG = () => <Blockquote slice={noBGSlice} />;

export const DarkBG = () => <Blockquote slice={darkBGSlice} />;

export const LightBG = () => <Blockquote slice={lightBGSlice} />;
