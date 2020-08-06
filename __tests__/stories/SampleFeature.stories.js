import React from "react";
import {
  Blockquote,
  FullWidthImage,
  HeadlineBlock,
  TwoImagesAndText,
} from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Sample Layouts",
};

const metadata = {
  uid: "dev-test-feature-1",
  firstPublicationDate: "2020-08-02T17:45:25+0000",
  lastPublicationDate: "2020-08-06T21:25:19+0000",
  type: "feature",
  tags: [],
};

const headlineSlice = {
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
    feature_author_pic: {
      dimensions: {
        width: 750,
        height: 750,
      },
      alt: "Gabo",
      copyright: null,
      url:
        "https://images.prismic.io/hmbk-cms/33e0177d-19d2-45f3-b30e-c666552c512e_gabriel-garcia-marquez-2.jpg?auto=compress,format&rect=76,0,750,750&w=750&h=750",
    },
    feature_author: {
      __typename: "PRISMIC_Staff",
      hmbk_staff_name: "Gabriel Garcia Marquez",
      hmbk_staff_position: "Nobel Laureate",
    },
  },
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
    <HeadlineBlock slice={headlineSlice} metadata={metadata} />
    <Blockquote slice={blockquoteSlice} />
    <FullWidthImage
      type={"medium"}
      data={"Medium Full Width Image"}
      bgUrl={fwiBgUrl}
    />
    <TwoImagesAndText slice={twoImageAndTextSlice} />
  </>
);
