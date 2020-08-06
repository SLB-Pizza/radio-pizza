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
