import React from "react";
import {
  Blockquote,
  FullWidthImage,
  TwoImagesAndText,
} from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Sample Layouts",
};

const fwiBgUrl = "https://w.wallhaven.cc/full/lq/wallhaven-lqwgdy.jpg";
const blockquoteSlice = {
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
const twoImageAndTextSlice = {
  primary: {
    tiat_layout: "Right: Image-Image-Text",
    tiat_is_gapless: false,
    tiat_text: [
      {
        type: "paragraph",
        text:
          "Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.",
        spans: [],
      },
    ],
    tiat_left_img: {
      url: "https://w.wallhaven.cc/full/4o/wallhaven-4ozkll.jpg",
      alt: "A tree-lined valley",
    },
    tiat_right_img: {
      url: "https://w.wallhaven.cc/full/43/wallhaven-43dx59.jpg",
      alt: "A tree covered road in late autumn",
    },
  },
};

export const SampleFeature = () => (
  <>
    <FullWidthImage
      type={"medium"}
      data={"Medium Full Width Image"}
      bgUrl={fwiBgUrl}
    />
    <Blockquote slice={blockquoteSlice} />
    <TwoImagesAndText slice={twoImageAndTextSlice} />
  </>
);
