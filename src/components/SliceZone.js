import React from "react";
import {
  Blockquote,
  HeadlineBlock,
  FullWidthImage,
  TwoImagesAndText,
} from "./slices";

export default function SliceZone({ sliceZone, featureMetadata }) {
  // Structure the imported Slice Components with their api value
  const sliceComponents = {
    full_width_image: FullWidthImage,
    blockquote: Blockquote,
    two_images___text: TwoImagesAndText,
    headline_block: HeadlineBlock,
  };

  const sliceZoneContent = sliceZone.map((slice, index) => {
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

/**
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
 *      <section>{slice}</section>
 *    </div>
 * </main>
 */
