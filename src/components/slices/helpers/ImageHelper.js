import React, { useState } from "react";
import { ImageModal, ResponsiveImage } from "../../../utils";
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
 * @param {String} fullSizeImg.url - link from Prismic CMS to the image from the media library
 * @param {String} fullSizeImg.alt - contains image caption data that's used for accessibility purposes too; comes from Prismic CMS. Its default value should be set when the image is **first uploaded** to the CMS Media Library. A different fullSizeImg.alt value, aka image caption, can be set when the image is selected for use in an article
 * @param {String} fullSizeImg.photoCredit - contains image credit data; comes from Prismic CMS. Should be set when the image is **first uploaded** to the CMS Media Library
 * @returns {jsx}
 */
function ImageHelper({ columnClassName, responsiveData, fullSizeImg }) {
  const [imgModalOpen, setImgModalOpen] = useState(false);

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
      <figure
        className="image has-ratio"
        onClick={() => setImgModalOpen(true)}
        tabIndex="0"
        aria-labelledby={
          fullSizeImg.alt ? fullSizeImg.alt : fullSizeImg.photoCredit
        }
      >
        <ResponsiveImage
          largestImg={fullSizeImg}
          responsiveData={responsiveData}
        />
      </figure>

      {imgModalOpen ? (
        <ImageModal
          fullSizeImg={fullSizeImg}
          responsiveData={responsiveData}
          setImgModalOpen={setImgModalOpen}
        />
      ) : null}
    </div>
  );
}

export default ImageHelper;
