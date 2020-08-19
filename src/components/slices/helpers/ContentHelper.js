import React from "react";
import { RichText } from "prismic-reactjs";

export default function ContentHelper({ columnClassName, text }) {
  const defaultContentClassName = "column is-12";

  const contentColumnClass = columnClassName
    ? columnClassName
    : defaultContentClassName;

  return (
    <div className={contentColumnClass}>
      <div className="content">{RichText.render(text)}</div>
    </div>
  );
}
