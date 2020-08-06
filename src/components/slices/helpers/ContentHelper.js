import React from "react";
import { RichText } from "prismic-reactjs";

export default function ContentHelper(props) {
  const { tiat_text } = props;
  return (
    <div className="column is-half">
      <div className="content">{RichText.render(tiat_text)}</div>
    </div>
  );
}
