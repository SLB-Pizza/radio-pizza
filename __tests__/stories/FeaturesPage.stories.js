import React from "react";
import { StickyFeature } from "../../src/components";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Sample Layouts",
  component: StickyFeature,
};

const leadFeatureData = {
  __typename: "PRISMIC_FeatureBodyHeadline_block",
  type: "headline_block",
  label: null,
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
  },
};

export const FeaturesPage = () => (
  <>
    <main style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <StickyFeature leadFeatureData={leadFeatureData} />
    </main>
  </>
);
