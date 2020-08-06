import React from "react";
import { HeadlineBlock } from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Headline Block",
  component: HeadlineBlock,
};

const metadata = {
  uid: "dev-test-feature-1",
  firstPublicationDate: "2020-08-02T17:45:25+0000",
  lastPublicationDate: "2020-08-06T21:25:19+0000",
  type: "feature",
  tags: [],
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

export const baseLayout = () => (
  <>
    <main style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <HeadlineBlock slice={darkImageSlice} metadata={metadata} />
    </main>
  </>
);
