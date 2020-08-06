import React from "react";
import ContentHelper from "../helpers/ContentHelper";

/**
 *
 *
 * @param {*} layout
 * @param {*} text
 * @param {*} leftImg
 * @param {*} rightImg
 * @returns
 */
const getTIATLayout = (layout, text, leftImg, rightImg) => {
  // pull layout type

  // layout types
  // 1. Text-Image-Image: all columns ⅓ width
  // 2. Image-Image-Text: all columns ⅓ width
  // 3. Text-Image-Image: Text ½ width, each Image ¼ width
  // 4. Image-Image-Text: Text ½ width, each Image ¼ width

  switch (layoutType) {
    case "1":
      break;
    default:
      break;
  }

  // declare layout types
  const defaultStyles = {
    "column-order": [],
    gapless: false,
    "section-1": "column is-one-third",
    "section-2": "column is-one-third",
    "section-3": "column is-one-third",
  };

  const halfLeftObj = {
    "section-1": "column is-half",
    "section-2": "column is-one-quarter",
    "section-3": "column is-one-quarter",
  };
  const halfRightObj = {
    "section-1": "column is-one-quarter",
    "section-2": "column is-one-quarter",
    "section-3": "column is-half",
  };

  const tiatSliceComponents = {
    content: ContentHelper,
    image,
  };

  return;
};
