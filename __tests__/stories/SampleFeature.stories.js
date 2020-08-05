import React from "react";
import { Blockquote, FullWidthImage } from "../../src/components/slices";
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

export const SampleFeature = () => (
  <>
    <FullWidthImage
      type={"medium"}
      data={"Medium Full Width Image"}
      bgUrl={fwiBgUrl}
    />
    <Blockquote slice={blockquoteSlice} />
  </>
);
