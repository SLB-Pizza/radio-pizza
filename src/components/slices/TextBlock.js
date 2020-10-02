import React from "react";
import { RichText } from "prismic-reactjs";
import { htmlSerializer } from "../../utils";

/**
 * @category CMS
 * @subcategory Slices
 * @function
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function TextBlock({ slice }) {
  const { body_text, set_first_letter } = slice.primary;

  if (set_first_letter) {
  }

  return (
    <section className="container slice">
      <div className="columns">
        <div className="column is-full">
          <div className="content">
            <RichText render={body_text} htmlSerializer={htmlSerializer} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TextBlock;
