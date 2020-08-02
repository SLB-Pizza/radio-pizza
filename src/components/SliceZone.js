import React from "react";
import { FullWidthImage } from "./slices";

export default function SliceZone({ sliceZone }) {
  // Structure the imported Slice Components with their api value
  const sliceComponents = {
    full_width_image: FullWidthImage,
  };

  const sliceZoneContent = sliceZone.map((slice, index) => {
    const SliceComponent = sliceComponents[slice.type];

    if (SliceComponent) {
      return <SliceComponent slice={slice} key={`slice-${index}`} />;
    }
    return null;
  });

  return <>{sliceZoneContent}</>;
}
