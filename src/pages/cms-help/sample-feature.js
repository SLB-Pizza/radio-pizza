import React from "react";
import { FullWidthImage } from "../../components/slices";

const fwiTestData = [
  {
    type: "short",
    data: "Short Full Width Images",
  },
  {
    type: "medium",
    data: "Medium Full Width Image",
  },
  {
    type: "large",
    data: "Tall Full Width Image",
  },
  {
    type: "xxxabc",
    data: "Fallback (regular)",
  },
];

export default function SampleFeature() {
  return (
    <main className="site-page">
      <p className="title is-size-2">Full Width Image Sizes</p>
      {fwiTestData.map((fwi, index) => (
        <FullWidthImage details={fwi} key={`index-${index}`} />
      ))}
    </main>
  );
}
