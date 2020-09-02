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
          const fullSizeImg = {
            alt: singleImage.row_image.alt,
            photoCredit: singleImage.row_image.copyright,
            url: singleImage.row_image.url,
            dimensions: singleImage.row_image.dimensions,
          };

          const responsiveSizes = {
            widescreen: singleImage.row_image.widescreen,
            desktop: singleImage.row_image.desktop,
            tablet: singleImage.row_image.tablet,
            mobile: singleImage.row_image.mobile,
            lo_fi: singleImage.row_image.lo_fi_placeholder,
          };

          return (
            <ImageHelper
              key={`img-#${index}-${fullSizeImg.alt}`}
              fullSizeImg={fullSizeImg}
              responsiveData={responsiveSizes}
              url={fullSizeImg.url}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ImageRow;
