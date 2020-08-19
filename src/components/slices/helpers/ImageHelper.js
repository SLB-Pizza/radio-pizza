import React from "react";

/**
 * Creates a Slice Component that display two images and some text. The text section can be either on the left of the right.
 * @category CMS
 * @subcategory Layout Helper
 * @component
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function ImageHelper({ columnClassName, url, alt, photoCredit }) {
  const defaultImageClass = "column is-12-mobile";

  const imageColumnClass = columnClassName
    ? columnClassName
    : defaultImageClass;

  // const hasPhotoCredit =

  return (
    <div className={imageColumnClass}>
      <figure className="image has-ratio">
        <img src={url} alt={alt} />
        <figcaption>Image: {alt}</figcaption>
        <span className="is-size-7">Photo: {alt}</span>
      </figure>
    </div>
  );
}

export default ImageHelper;
