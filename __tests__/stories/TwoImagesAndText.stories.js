import React from "react";
import { TwoImagesAndText } from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Two Images and Text",
  component: TwoImagesAndText,
};

const threeEvenColumns = {
  primary: {
    tiat_layout: "Left: Text-Image-Image",
    tiat_is_gapless: false,
    tiat_text: [
      {
        type: "paragraph",
        text:
          "Reading has been the fuel of my motivation: it has changed the direction in which I have traveled, and it has enhanced my creative imagination more than any other activity I have ever pursued.",
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

export const ContentRight_ThreeEvenColumns = () => (
  <TwoImagesAndText slice={threeEvenColumns} />
);
