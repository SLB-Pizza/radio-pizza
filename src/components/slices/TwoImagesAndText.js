import React from "react";
import { ContentHelper, ImageHelper } from "./index";

/**
 * Creates a Slice Component that display two images and some text. The text section can be either on the left of the right.
 * @category CMS
 * @subcategory Slices
 * @function
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function TwoImagesAndText({ slice }) {
  const {
    tiat_layout,
    tiat_is_gapless,
    tiat_text,
    tiat_left_img,
    tiat_right_img,
  } = slice.primary;

  /**
   * Derive layout type by processing tiat_layout. Same process followed as {@link getBlockquoteStyling}
   */
  const layoutType = tiat_layout.split(":")[0];

  const columnsClassName = tiat_is_gapless
    ? "columns is-mobile is-multiline is-gapless"
    : "columns is-mobile is-multiline";

  const tiatContentClass = "column is-half";
  const tiatImageClass = "column is-one-quarter";

  return (
    <section className="container slice">
      <div className={columnsClassName}>
        {layoutType === "Left" ? (
          <>
            <ContentHelper
              text={tiat_text}
              columnClassName={tiatContentClass}
            />
            <ImageHelper url={tiat_left_img.url} alt={tiat_left_img.alt} />
            <ImageHelper url={tiat_right_img.url} alt={tiat_right_img.alt} />
          </>
        ) : (
          <>
            <ImageHelper url={tiat_left_img.url} alt={tiat_left_img.alt} />
            <ImageHelper url={tiat_right_img.url} alt={tiat_right_img.alt} />
            <ContentHelper
              text={tiat_text}
              columnClassName={tiatContentClass}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default TwoImagesAndText;
