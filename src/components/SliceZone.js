import React from "react";

const SliceZone = ({ sliceZone }) => {
  return sliceZone.map((slice, index) => <p key={index}>{slice.type}</p>);
};

export default SliceZone;
