import React from "react";
import lazySizes from "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
// import "lazysizes/plugins/blur-up/ls.blur-up";

/**
 * Creates a JSX `picture` element with responsive sources that {@link ImageHelper} calls upon.
 * @category CMS
 * @subcategory Layout Helper
 * @component
 * @param {String} mainUrl - the Imgix optimized Prismic image URL for the large image size; bulma "fullhd"
 * @param {Object} responsiveData - an object containing the Imgix optimized Prismic image URLs for the responsive sizes
 * @property {String} responsiveData.widescreen - data object to make the image for bulma "widescreen" breakpoint
 * @property {String} responsiveData.desktop - data object to make the image for bulma "desktop" breakpoint
 * @property {String} responsiveData.tablet - data object to make the image for bulma "tablet" breakpoint
 * @property {String} responsiveData.mobile - data object to make the image for bulma "mobile" breakpoint
 * @property {String} responsiveData.lo_fi - data object to make the low quality image placeholder (LQIP)
 * @see {@link https://bulma.io/documentation/overview/responsiveness/#breakpoints|Bulma Breakpoints}
 * @see {@link https://afarkas.github.io/lazysizes/index.html|lazySizes & LQIP }
 * @see {@link https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/parent-fit|lazySizes parent fit extension }
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
        alt={largestImg.alt}
        data-lowsrc={responsiveData["lo_fi"].url}
        width={largestImg.dimensions.width}
        height={largestImg.dimensions.height}
        data-src={largestImg.url}
        className="lazyload inline-image"
      />
    </picture>
  );
}

export default ResponsiveImage;
