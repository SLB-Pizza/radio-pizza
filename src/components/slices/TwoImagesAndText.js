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

  const leftFullSizeImg = {
    alt: tiat_left_img.alt,
    photoCredit: tiat_left_img.copyright,
    url: tiat_left_img.url,
    dimensions: tiat_left_img.dimensions,
  };

  const leftResponsiveSizes = {
    widescreen: tiat_left_img.widescreen,
    desktop: tiat_left_img.desktop,
    tablet: tiat_left_img.tablet,
    mobile: tiat_left_img.mobile,
    lo_fi: tiat_left_img.lo_fi_placeholder,
  };

  const rightFullSizeImg = {
    alt: tiat_right_img.alt,
    photoCredit: tiat_right_img.copyright,
    url: tiat_right_img.url,
    dimensions: tiat_right_img.dimensions,
  };

  const rightResponsiveSizes = {
    widescreen: tiat_right_img.widescreen,
    desktop: tiat_right_img.desktop,
    tablet: tiat_right_img.tablet,
    mobile: tiat_right_img.mobile,
    lo_fi: tiat_right_img.lo_fi_placeholder,
  };

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
            <ImageHelper
              fullSizeImg={leftFullSizeImg}
              responsiveData={leftResponsiveSizes}
              url={tiat_left_img.url}
              columnClassName={tiatImageClass}
            />

            <ImageHelper
              fullSizeImg={rightFullSizeImg}
              responsiveData={rightResponsiveSizes}
              url={tiat_right_img.url}
              columnClassName={tiatImageClass}
            />
          </>
        ) : (
          <>
            <ImageHelper
              fullSizeImg={leftFullSizeImg}
              responsiveData={leftResponsiveSizes}
              url={tiat_left_img.url}
              columnClassName={tiatImageClass}
            />
            <ImageHelper
              fullSizeImg={righttFullSizeImg}
              responsiveData={rightResponsiveSizes}
              url={tiat_right_img.url}
              columnClassName={tiatImageClass}
            />
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
