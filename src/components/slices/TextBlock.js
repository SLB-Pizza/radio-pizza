import React from "react";
import { RichText } from "prismic-reactjs";

export default function TextBlock({ slice }) {
  const { body_text, set_first_letter } = slice.primary;

  if (set_first_letter) {
  }

  return (
    <section class="container">
      <div className="columns">
        <div className="content">{RichText.render(body_text)}</div>
      </div>
    </section>
  );
}
