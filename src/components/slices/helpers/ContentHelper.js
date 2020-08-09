import React from "react";
import { RichText } from "prismic-reactjs";

export default function ContentHelper(props) {
  const defaultClassName = "column is-12";

  console.log("inside Content Helper", props);

  if (props.type === "text") {
  }
  const contentColumnClass = props.sliceClassName
    ? props.sliceClassName
    : defaultClassName;

  return (
    <div className={contentColumnClass}>
      <div className="content">{RichText.render(props.text)}</div>
    </div>
  );
}
