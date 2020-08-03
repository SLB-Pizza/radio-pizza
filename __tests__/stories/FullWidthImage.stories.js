import React from "react";
import { FullWidthImage } from "../../src/components/slices";

export default {
  title: "CMS Slices/Full Width Image",
  component: FullWidthImage
};

export const shortDetails = {
  type: "short",
  data: "Short Full Width Image",
},

export const Regular = (details) => <FullWidthImage details={details}/>;
