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
          const { alt, copyright, url } = singleImage.row_image;

          return (
            <ImageHelper
              alt={alt}
              photoCredit={copyright}
              url={url}
              key={`img-#${index}`}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ImageRow;
