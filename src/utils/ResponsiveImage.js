import React from 'react'
import lazySizes from 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/blur-up/ls.blur-up'

/**
 * Creates a JSX `<picture>` element with responsive sources that {@link ImageHelper} calls upon.
 * @category CMS
 * @function ResponsiveImage
 * @param {String} mainUrl - the Imgix optimized Prismic image URL for the large image size; bulma "fullhd"
 * @param {Object} responsiveData - an object containing the Imgix optimized Prismic image URLs for the responsive sizes
 * @prop {Object.<String>} responsiveData.widescreen - data object to make the image for bulma "widescreen" breakpoint
 * @prop {Object.<String>} responsiveData.desktop - data object to make the image for bulma "desktop" breakpoint
 * @prop {Object.<String>} responsiveData.tablet - data object to make the image for bulma "tablet" breakpoint
 * @prop {Object.<String>} responsiveData.mobile - data object to make the image for bulma "mobile" breakpoint
 * @prop {Object.<String>} responsiveData.lo_fi - data object to make the low quality image placeholder (LQIP)
 * @returns {jsx}
 * @see {@link https://bulma.io/documentation/overview/responsiveness/#breakpoints Bulma Breakpoints}
 * @see {@link https://afarkas.github.io/lazysizes/index.html lazySizes & LQIP}
 * @see {@link https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/parent-fit lazySizes parent fit extension}
 * @see {@link https://elad.medium.com/a-complete-guide-for-responsive-images-b13db359c6c7 Complete Guide to Responsive Images!}
 */
function ResponsiveImage({ largestImg, responsiveData }) {
  return (
    <picture>
      {Object.keys(responsiveData).map((imgSize, index) => {
        /**
         * Pull breakpoint-specific image url from responsiveData
         * Pull breakpoint-specific image width from responsiveData
         * Pull breakpoint-specific image height from responsiveData
         */
        const url = responsiveData[imgSize].url
        const width = responsiveData[imgSize].dimensions.width
        const height = responsiveData[imgSize].dimensions.height

        /**
         * Used with size to get the Source's media query data
         * FULL HD would get full size images; use widescreen url instead
         */
        const breakpoints = {
          mobile: '(max-width: 767px)',
          tablet: '(min-width: 768px) and (max-width: 1023px)',
          desktop: '(min-width: 1024px) and (max-width: 1215px)',
          widescreen: '(min-width: 1216px) and (max-width: 1407px)',
        }

        return (
          <source
            key={`#${index}-${imgSize}`}
            data-srcset={url}
            width={width}
            height={height}
            media={`${breakpoints[imgSize]}`}
          />
        )
      })}
      <img
        alt={largestImg.alt}
        data-lowsrc={responsiveData['lo_fi'].url}
        width={largestImg.dimensions.width}
        height={largestImg.dimensions.height}
        data-src={largestImg.url}
        className="lazyload"
      />
    </picture>
  )
}

export default ResponsiveImage
