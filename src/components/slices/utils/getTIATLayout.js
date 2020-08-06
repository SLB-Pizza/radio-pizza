import React from "react";
import ContentHelper from "../helpers/ContentHelper";
import ImageHelper from "../helpers/ImageHelper";

/**
 * @function getTIATLayout - TIAT aka Two Images and Text
 * @param {*} layout
 * @param {*} text
 * @param {*} leftImg
 * @param {*} rightImg
 * @returns
 */
const getTIATLayout = (layout, gapless, text, leftImg, rightImg) => {
  // pull layout type
  const layoutType = layout.split(".")[0];
  /**
   * Layout Types
   *
   * Left: Text section on left > Text-Image-Image
   * Right: Text section on right > Image-Image-Text
   */

  let componentArray = [];

  switch (layoutType) {
    case "Left": // 1. Text-Image-Image: all columns same width
      componentArray = [
        <ContentHelper text={text} />,
        <ImageHelper url={leftImg.url} alt={leftImg.alt} />,
        <ImageHelper url={rightImg.url} alt={rightImg.alt} />,
      ];
      break;
    case "Right": // Image-Image-Text: all columns same width
      componentArray = [
        <ContentHelper text={"abc"} />,
        <ImageHelper url={leftImg.url} alt={leftImg.alt} />,
        <ImageHelper url={rightImg.url} alt={rightImg.alt} />,
      ];
      break;

    default:
      // default to Text-Text-Image
      componentArray = [
        <ContentHelper text={"abc"} />,
        <ImageHelper url={leftImg.url} alt={leftImg.alt} />,
        <ImageHelper url={rightImg.url} alt={rightImg.alt} />,
      ];
      break;
  }

  return componentArray;
};

export default getTIATLayout;
