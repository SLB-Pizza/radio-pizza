import React from "react";
import {
  Blockquote,
  HeadlineBlock,
  FullWidthImage,
  TwoImagesAndText,
  ContentHelper,
} from "./slices";

/** *
 * @function sliceZone - Receives params as props from a template file. Processes the sliceZone object to match slice types, the keys in sliceComponents, to their corresponding component values.
 * @param {Object} { sliceZone, featureMetadata }
 * @returns {jsx} Returns components selected by sliceComponents key that have been hydrated with data to create the given page's layout.
 *
 * Why is sliceZoneContent is returned in a fragment and not wrapped in an element?
 *
 * The template that has the query for the data to pass as props into SliceZone returns a structure as follows:
 * <main className="site-page">
 *    <SliceZone
        sliceZone={featureSliceData}
        featureMetadata={featureMetadata}
      />
 * </main>
 *
 * Each CMS Slice returned by SliceZone is wrapped in a <section> element, so if we did, there would be unnecessary elements between <main> and the <section>'s -> e.g.
 *
 * <main className="site-page">
 *    <div>
 *      <section>{slice layout here}</section>
 *    </div>
 * </main>
 */

export default function SliceZone({ sliceZone, featureMetadata }) {
  // Structure the imported Slice Components with their api value
  const sliceComponents = {
    full_width_image: FullWidthImage,
    blockquote: Blockquote,
    two_images___text: TwoImagesAndText,
    headline_block: HeadlineBlock,
  };

  const sliceZoneContent = sliceZone.map((slice, index) => {
    console.log("in sliceZone", slice.type);

    const SliceComponent = sliceComponents[slice.type];

    if (SliceComponent) {
      return (
        <SliceComponent
          slice={slice}
          metadata={featureMetadata}
          key={`slice-${index}`}
        />
      );
    }
    return null;
  });

  return <>{sliceZoneContent}</>;
}
