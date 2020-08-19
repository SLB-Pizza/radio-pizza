import React from "react";
import { RichText } from "prismic-reactjs";

export default function ContentHelper({ columnClassInfo, text }) {
  const defaultClassName = "column is-12";

  const contentColumnClass = columnClassInfo
    ? columnClassInfo
    : defaultClassName;

  return (
    <div className={contentColumnClass}>
      <div className="content">{RichText.render(text)}</div>
    </div>
  );
}
