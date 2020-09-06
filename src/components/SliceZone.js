import React from "react";
import {
  ArticleHeadline,
  Blockquote,
  HeadlineBlock,
  ImageRow,
  FullWidthImage,
  OneImageAndText,
  TwoImagesAndText,
  TextBlock,
} from "./slices";

/**
 * Receives params as props from a template file. Processes the sliceZone object to match slice types, the keys in sliceComponents, to their corresponding component values.
 *
 * **Why is sliceZoneContent is returned in a fragment and not wrapped in an element?**
 *
 * The template that has the query for the data to pass as props into SliceZone returns a structure as follows:
 *
 * ```html
 * <main className="site-page">
 *    <SliceZone
        sliceZone={featureSliceData}
        featureMetadata={featureMetadata}
      />
 * </main>
 * ```
 *
 * Each CMS Slice returned by SliceZone is wrapped in a `<section>` element, so if we did, there would be unnecessary elements between `<main>` and the
 * `<section>`
 *
 * e.g.
 * ```html
 * <main className="site-page">
 *    <div>
 *      <section>{slice layout here}</section>
 *    </div>
 * </main>
 * ```
 *
 * @function sliceZone
 * @param {Object} props
 * @param {Object} props.sliceZone
 * @param {Object} props.metadata
 * @returns {jsx} Returns components selected by sliceComponents key that have been hydrated with data to create the given page's layout.
 */

function SliceZone({ sliceZone, metadata }) {
  /**
   * Pair the imported CMS Slice Components with their Prismic API "type" value.
   * `{prismic_slice_type: SliceComponent}`
   */
  const sliceComponents = {
    blockquote: Blockquote,
    full_width_image: FullWidthImage,
    headline_block: ArticleHeadline,
    image_row: ImageRow,
    one_image_and_text1: OneImageAndText,
    two_images_and_text: TwoImagesAndText,
    text: TextBlock,
  };

  const sliceZoneContent = sliceZone.map((slice, index) => {
    console.log("slice.type:", slice.type);
    /**
     * Grab the CMS Slice by using slice.type as the key for sliceComponents
     */
    const SliceComponent = sliceComponents[slice.type];

    if (SliceComponent) {
      return (
        <SliceComponent
          slice={slice}
          metadata={metadata}
          key={`slice-${index}`}
        />
      );
    }
    return null;
  });

  return <>{sliceZoneContent}</>;
}

export default SliceZone;
