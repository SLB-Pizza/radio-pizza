import React from "react";
import { Blockquote } from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Blockquote",
  component: Blockquote,
};

// =======================
// Background Image URLs
// =======================
const bgTypes = {
  none: "none",
  light: "light",
  dark: "dark",
};

const bgURLs = {
  light: "https://w.wallhaven.cc/full/0q/wallhaven-0qg7xq.jpg",
  dark: "https://w.wallhaven.cc/full/lq/wallhaven-lqwgdy.jpg",
};
// =======================
// Stories
// =======================

export const noBG = () => <Blockquote bgType={bgTypes.none} />;

export const DarkBG = () => (
  <Blockquote bgURL={bgURLs.dark} bgType={bgTypes.dark} />
);

export const LightBG = () => (
  <Blockquote bgURL={bgURLs.light} bgType={bgTypes.light} />
);
