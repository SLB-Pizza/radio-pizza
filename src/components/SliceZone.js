import React from "react";

export default function SliceZone({ sliceZone }) {
  return sliceZone.map((slice, index) => (
    <p className="subtitle is-size-3" key={index}>
      {slice.type}
    </p>
  ));
}
