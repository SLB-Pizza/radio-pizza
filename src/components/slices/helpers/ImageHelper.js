import React from "react";

/**
 * Creates a JSX segment that CMS Slices call on to format images.
 * @category CMS
 * @subcategory Layout Helper
 * @component
 * @param {?String} columnClassName - optional string prop dictating specific column layouts.
 *
 * **CMS Slices passing this prop**
 * - {@link OneImageAndText}
 * - {@link TwoImagesAndText}
 *
 * **CMS Slices NOT passing this prop**
 * - {@link ImageRow}
 *
 * @param {String} url - link from Prismic CMS to the image from the media library
 * @param {String} alt - contains image caption data that's used for accessibility purposes too; comes from Prismic CMS. Its default value should be set when the image is **first uploaded** to the CMS Media Library. A different alt value, aka image caption, can be set when the image is selected for use in an article
 * @param {String} photoCredit - contains image credit data; comes from Prismic CMS. Should be set when the image is **first uploaded** to the CMS Media Library
 * @returns {jsx}
 */
function ImageHelper({ columnClassName, url, alt, photoCredit }) {
  const defaultImageClass = "column is-12-mobile";

  /**
   * If a columnClassName prop was passed in, use that prop value.
   * Else, use the defaultImageClass defined above.
   */
  const imageColumnClass = columnClassName
    ? columnClassName
    : defaultImageClass;

  return (
    <div className={imageColumnClass}>
      <figure className="image has-ratio">
        {/*
         * alt === null:
         *   use photoCredit as img alt text, only show photoCredit caption
         * alt !== null:
         *   use alt as img alt text; show both alt and photo captions
         */}
        {alt === null ? (
          <>
            <img src={url} alt={photoCredit} />
            <figcaption className="is-size-7">Photo: {photoCredit}</figcaption>
          </>
        ) : (
          <>
            <img src={url} alt={photoCredit} />
            <figcaption className="is-size-7">Image: {alt}</figcaption>
            <figcaption className="is-size-7">Photo: {photoCredit}</figcaption>
          </>
        )}
      </figure>
    </div>
  );
}

export default ImageHelper;
