import React from "react";
import { Blockquote, FullWidthImage } from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Sample Feature",
};

const fwiBgUrl = "https://w.wallhaven.cc/full/lq/wallhaven-lqwgdy.jpg";
const bgType = "none";

export const SampleFeature = () => (
  <>
    <FullWidthImage
      type={"medium"}
      data={"Medium Full Width Image"}
      bgUrl={fwiBgUrl}
    />
    <Blockquote bgType={bgType} />
  </>
);
