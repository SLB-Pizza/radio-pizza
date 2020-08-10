import React from "react";
import { ContentHelper, ImageHelper } from "./index";

/**
 * @function TwoImagesAndText
 * @param {object} { slice }
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

  const layoutType = tiat_layout.split(".")[0];

  const columnsClassName = tiat_is_gapless
    ? "columns is-mobile is-multiline is-gapless"
    : "columns is-mobile is-multiline";

  const tiatContentClass = "column is-half";
  const tiatImageClass = "column is-one-quarter";

  return (
    <section className="container">
      <div className={columnsClassName}>
        {layoutType === "Left" ? (
          <>
            <ContentHelper text={tiat_text} sliceClassName={tiatContentClass} />
            <ImageHelper url={tiat_left_img.url} alt={tiat_left_img.alt} />
            <ImageHelper url={tiat_right_img.url} alt={tiat_right_img.alt} />
          </>
        ) : (
          <>
            <ImageHelper url={tiat_left_img.url} alt={tiat_left_img.alt} />
            <ImageHelper url={tiat_right_img.url} alt={tiat_right_img.alt} />
            <ContentHelper text={tiat_text} sliceClassName={tiatContentClass} />
          </>
        )}
      </div>
    </section>
  );
}

export default TwoImagesAndText;
