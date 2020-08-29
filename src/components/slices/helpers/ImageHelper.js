import React, { useState } from "react";
import { MakeResponsiveImages } from "../../../utils";
/**
 * Creates a JSX segment that CMS Slices call on to format images. Its text counterpart is {@link ContentHelper}.
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
function ImageHelper({
  columnClassName,
  url,
  alt,
  photoCredit,
  responsiveData,
  imgData,
}) {
  const [imgModalOpen, setImgModalOpen] = useState(false);

  const defaultImageClass = "column is-12-mobile";

  /**
   * If a columnClassName prop was passed in, use that prop value.
   * Else, use the defaultImageClass defined above.
   */
  const imageColumnClass = columnClassName
    ? columnClassName
    : defaultImageClass;

  /**
   * Determine whether there's alt text to determine how ImageHelper is laid out.
   */
  const isThereAltText = alt ? true : false;

  return (
    <div className={imageColumnClass}>
      <figure
        className="image has-ratio"
        onClick={() => setImgModalOpen(true)}
        tabIndex="0"
        aria-labelledby={isThereAltText ? alt : photoCredit}
      >
        <MakeResponsiveImages
          largestImg={imgData}
          responsiveURLs={responsiveData}
        />

        {/* <img
          className="inline-image"
          src={url}
          alt={isThereAltText ? alt : photoCredit}
        /> */}
      </figure>

      {imgModalOpen ? (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setImgModalOpen(false)}
          />
          <div
            className="modal-content"
            aria-label={isThereAltText ? alt : photoCredit}
          >
            <div className="columns">
              <div className="column is-9 img-area">
                <figure className="image has-ratio">
                  <img src={url} alt={alt} />
                </figure>
                <pre>{JSON.stringify(responsiveData, null, 2)}</pre>
              </div>

              <div className="column is-3">
                {isThereAltText ? <figcaption>{alt}</figcaption> : null}
                <figcaption className="credit">{photoCredit}</figcaption>
              </div>
              <button
                className="modal-close is-large"
                tabIndex="0"
                aria-label="close"
                onClick={() => setImgModalOpen(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ImageHelper;
