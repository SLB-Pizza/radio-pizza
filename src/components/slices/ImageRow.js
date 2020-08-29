import React from "react";
import { ImageHelper } from "./index";

/**
 * Creates a Slice Component that display two images and some text. The text section can be either on the left of the right.
 * @category CMS
 * @subcategory Slices
 * @component
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function ImageRow({ slice }) {
  return (
    <section className="container slice">
      <div className="columns is-mobile is-multiline">
        {slice.fields.map((singleImage, index) => {
          const imgData = {
            alt: singleImage.group_img.alt,
            copyright: singleImage.group_img.copyright,
            url: singleImage.group_img.url,
            dimensions: singleImage.group_img.dimensions,
          };

          const responsiveSizes = {
            widescreen: singleImage.group_img.widescreen,
            desktop: singleImage.group_img.desktop,
            tablet: singleImage.group_img.tablet,
            mobile: singleImage.group_img.mobile,
          };

          return (
            <ImageHelper
              key={`img-#${index}-${imgData.alt}`}
              alt={imgData.alt}
              imgData={imgData}
              responsiveData={responsiveSizes}
              photoCredit={imgData.copyright}
              url={imgData.url}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ImageRow;
