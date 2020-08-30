import React from "react";
import lazySizes from "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

/**
 * Creates a JSX `picture` element with responsive sources that {@link ImageHelper} calls upon.
 * @category CMS
 * @subcategory Layout Helper
 * @component
 * @param {String} mainUrl - the Imgix optimized Prismic image URL for the large image size; bulma "fullhd"
 * @param {Object} responsiveData - an object containing the Imgix optimized Prismic image URLs for the responsive sizes
 * @property {String} responsiveData.widescreen - URL for the bulma "widescreen" breakpoint
 * @property {String} responsiveData.desktop - URL for the bulma "desktop" breakpoint
 * @property {String} responsiveData.tablet - URL for the bulma "tablet" breakpoint
 * @property {String} responsiveData.mobile - URL for the bulma "mobile" breakpoint
 * @see https://bulma.io/documentation/overview/responsiveness/#breakpoints
 * @returns {jsx}
 */
function ResponsiveImage({ largestImg, responsiveData }) {
  return (
    <picture>
      {Object.keys(responsiveData).map((imgSize, index) => {
        /**
         * Pull breakpoint-specific image url from responsiveData
         */
        const url = responsiveData[imgSize].url;

        /**
         * Pull breakpoint-specific image width from responsiveData
         */
        const width = responsiveData[imgSize].dimensions.width;

        /**
         * Pull breakpoint-specific image height from responsiveData
         */
        const height = responsiveData[imgSize].dimensions.height;

        /**
         * Used with imgSize to get the Source's media query data
         */
        const breakpoints = {
          mobile: "(max-width: 767px)",
          tablet: "(max-width: 1023px)",
          desktop: "(max-width: 1215px)",
          widescreen: "(max-width: 1407px)",
        };

        return (
          <source
            key={`#${index}-${imgSize}`}
            data-srcset={url}
            width={width}
            height={height}
            media={`${breakpoints[imgSize]}`}
          />
        );
      })}

      <img
        className="lazyload inline-image"
        data-src={largestImg.url}
        width={largestImg.dimensions.width}
        height={largestImg.dimensions.height}
        alt={largestImg.alt}
      />
    </picture>
  );
}

export default ResponsiveImage;
