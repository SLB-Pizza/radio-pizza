import React from "react";
import { FullWidthImage, Blockquote } from "../../components/slices";

const fwiTestData = [
  {
    type: "short",
    data: "Short Full Width Images",
    bgUrl:
      "https://images.prismic.io/hmbk-cms/3665ac51-0ceb-4701-9e54-1a3699401d13_wallhaven-vm2o9m.jpg?auto=compress,format",
  },
  {
    type: "medium",
    data: "Medium Full Width Image",
    bgUrl:
      "https://images.prismic.io/hmbk-cms/3665ac51-0ceb-4701-9e54-1a3699401d13_wallhaven-vm2o9m.jpg?auto=compress,format",
  },
  {
    type: "tall",
    data: "Tall Full Width Image",
    bgUrl:
      "https://images.prismic.io/hmbk-cms/3665ac51-0ceb-4701-9e54-1a3699401d13_wallhaven-vm2o9m.jpg?auto=compress,format",
  },
  {
    type: "xxxabc",
    data: "Fallback (regular)",
    bgUrl:
      "https://images.prismic.io/hmbk-cms/3665ac51-0ceb-4701-9e54-1a3699401d13_wallhaven-vm2o9m.jpg?auto=compress,format",
  },
];

const blockquoteTest = {
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

export default function SampleFeature() {
  return (
    <main className="site-page">
      <p className="title is-size-2 has-text-centered">
        Full Width Image Sizes
      </p>
      {fwiTestData.map((fwi, index) => (
        <FullWidthImage
          type={fwi.type}
          data={fwi.data}
          bgUrl={fwi.bgUrl}
          key={`index-${index}`}
        />
      ))}
      <p className="title is-size-2 has-text-centered">
        Blockquotes with and without images
      </p>
      <Blockquote slice={blockquoteTest} />
    </main>
  );
}
