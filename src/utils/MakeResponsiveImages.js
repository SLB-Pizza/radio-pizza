import React from "react";
import Imgix, { Picture, Source } from "react-imgix";
import lazySizes from "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

/**
 * Creates a JSX `picture` element with responsive sources that {@link ImageHelper} calls upon.
 * @category CMS
 * @subcategory Layout Helper
 * @component
 * @param {String} mainUrl - the Imgix optimized Prismic image URL for the large image size; bulma "fullhd"
 * @param {Object} responsiveURLs - an object containing the Imgix optimized Prismic image URLs for the responsive sizes
 * @property {String} responsiveURLs.widescreen - URL for the bulma "widescreen" breakpoint
 * @property {String} responsiveURLs.desktop - URL for the bulma "desktop" breakpoint
 * @property {String} responsiveURLs.tablet - URL for the bulma "tablet" breakpoint
 * @property {String} responsiveURLs.mobile - URL for the bulma "mobile" breakpoint
 * @see https://bulma.io/documentation/overview/responsiveness/#breakpoints
 * @returns {jsx}
 */
function MakeResponsiveImages({ largestImg, responsiveURLs }) {
  return (
    <Picture>
      {Object.keys(responsiveURLs).map((imgSize, index) => {
        /**
         * Pull breakpoint-specific image url from responsiveURLs
         */
        const url = responsiveURLs[imgSize].url;

        /**
         * Pull breakpoint-specific image width from responsiveURLs
         */
        const width = responsiveURLs[imgSize].dimensions.width;

        /**
         * Pull breakpoint-specific image height from responsiveURLs
         */
        const height = responsiveURLs[imgSize].dimensions.height;

        /**
         * Used with imgSize to get the Source's media query data
         */
        const breakpoints = {
          mobile: "(max-width: 767px)",
          tablet: "(max-width: 1023px)",
          desktop: "(max-width: 1215px)",
          widescreen: "(max-width: 1407px)",
        };

        // console.log(imgSize);
        // console.log(breakpoints[imgSize]);
        return (
          <Source
            key={`#${index}-${imgSize}`}
            src={url}
            width={width}
            height={height}
            htmlAttributes={{ media: `${breakpoints[imgSize]}` }}
          />
        );
      })}

      <Imgix
        className="lazyload inline-image"
        src={largestImg.url}
        width={largestImg.dimensions.width}
        height={largestImg.dimensions.height}
        htmlAttributes={{ alt: largestImg.alt }}
        attributeConfig={{
          src: "data-src",
          srcSet: "data-srcset",
          sizes: "data-sizes",
        }}
      />
    </Picture>
  );
}

export default MakeResponsiveImages;
// return <pre>{JSON.stringify(responsiveURLs, null, 2)}</pre>;
// <Picture>
//   <Source></Source>
//   <Imgix
//     className="lazyload"
//     src="..."
//     sizes="..."
//     attributeConfig={{
//       src: "data-src",
//       srcSet: "data-srcset",
//       sizes: "data-sizes",
//     }}
//   />
// </Picture>
