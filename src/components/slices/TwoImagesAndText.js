import React from "react";
import getTIATLayout from "./utils/getTIATLayout";

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

  // Derive the styling for TwoImagesAndText
  const tiatComponentArray = getTIATLayout(
    tiat_layout,
    tiat_is_gapless,
    tiat_text,
    tiat_left_img,
    tiat_right_img
  );

  const columnsClassName = tiat_is_gapless
    ? "columns is-mobile is-multiline is-gapless"
    : "columns is-mobile is-multiline";

  return (
    <section className="container">
      <div className={columnsClassName}>
        {/* {tiatComponentArray.map((component, index) => {
          const TIATComponent = component;

          if (TIATComponent) {
            return <TIATComponent key={`tiat-${index}`} />;
          }
          return null;
        })} */}
      </div>
    </section>
  );
}

export default TwoImagesAndText;
