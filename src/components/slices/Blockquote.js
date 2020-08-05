import React from "react";
import { RichText } from "prismic-reactjs";
import getBlockquoteStyling from "./utils/getBlockquoteStyling";

/**
 * @function Blockquote
 * @param {object} { slice }
 * @returns {jsx}
 */

function Blockquote({ slice }) {
  let blockquoteStyling = getBlockquoteStyling(slice);

  // Now grab the rest of the blockquoteSlice details.
  const quoteText = slice.primary.blockquote_text;
  const quoteAuthor = slice.primary.blockquote_attribution;

  return (
    <section className="hero sample-feature" style={blockquoteStyling.imgStyle}>
      <div className="hero-body">
        <div className="container">
          <div className="content">
            <blockquote className={blockquoteStyling.blockClassNames}>
              {RichText.render(quoteText)}
            </blockquote>
            <cite className={blockquoteStyling.citeClassNames}>
              {RichText.asText(quoteAuthor)}
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blockquote;
