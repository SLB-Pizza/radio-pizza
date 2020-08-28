import React from "react";
import PropTypes from "prop-types";

/**
 * @category CMS
 * @subcategory Slices
 * @component
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @param {Object} metadata - data object from Prismic CMS that contains
 * @returns {jsx}
 */ function FullWidthImage({ slice }) {
  const { full_width_image, fwi_titling, fwi_height } = slice.primary;

  let imgStyle = {
    backgroundImage: `url(${full_width_image.url})`,
  };

  let heroClassName = "";
  switch (fwi_height) {
    case "Short":
      heroClassName = "hero slice";
      break;
    case "Medium":
      heroClassName = "hero is-medium slice";
      break;
    case "Tall":
      heroClassName = "hero is-large slice";
      break;
    case "Fullheight":
      heroClassName = "hero homepage-hero slice";
      break;
    default:
      heroClassName = "hero slice";
  }

  return (
    <section className={heroClassName} style={imgStyle}>
      <div className="hero-body container">
        {fwi_titling ? <h1 className="title is-size-3">{data}</h1> : null}
      </div>
    </section>
  );
}

// FullWidthImage.propTypes = {
//   type: PropTypes.oneOf(["short", "medium", "tall"]),
//   data: PropTypes.string.isRequired,
//   full_width_image.url: PropTypes.string.isRequired,
// };

export default FullWidthImage;
