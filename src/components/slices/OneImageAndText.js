import React from "react";
import { ContentHelper, ImageHelper } from "./index";

/**
 * Creates a Slice Component that display two images and some text. The text section can be either on the left of the right.
 * @category CMS
 * @subcategory Slices
 * @component
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function OneImageAndText({ slice }) {
  console.table("One Image", slice.primary);

  const { oiat_layout, oiat_text, oiat_img } = slice.primary;

  /**
   * Derive layout type by processing tiat_layout. Same process followed as {@link getBlockquoteStyling}
   */
  const layoutType = oiat_layout.split(".")[0];

  const tiatContentClass = "column is-two-thirds";
  const tiatImageClass = "column is-one-third";

  return (
    <section className="container">
      <div className="columns is-mobile is-multiline">
        {layoutType === "Left" ? (
          <>
            <ContentHelper
              text={oiat_text}
              columnClassInfo={tiatContentClass}
            />
            <ImageHelper url={oiat_img.url} alt={oiat_img.alt} />
          </>
        ) : (
          <>
            <ImageHelper url={oiat_img.url} alt={oiat_img.alt} />
            <ContentHelper
              text={oiat_text}
              columnClassInfo={tiatContentClass}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default OneImageAndText;
