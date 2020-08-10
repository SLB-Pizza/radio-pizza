import React from "react";
import { RichText } from "prismic-reactjs";
import getBlockquoteStyling from "../../utils/getBlockquoteStyling";

/**
 * @function Blockquote
 * @param {object} slice - the data object coming from Prismic CMS that contains all data needed to create the Blockquote slice
 * @returns {jsx}
 */

function Blockquote({ slice }) {
  // Destructure slice.primary for ease of use below.
  const {
    blockquote_text,
    blockquote_attribution,
    blockquote_type,
    blockquote_bg_img,
  } = slice.primary;

  // Pass the type and the bg_type objects to getBlockStyling to derive styling
  const blockquoteStyling = getBlockquoteStyling(
    blockquote_type,
    blockquote_bg_img
  );

  return (
    <section className="hero sample-feature" style={blockquoteStyling.imgStyle}>
      <div className="hero-body">
        <div className="container">
          <div className="content">
            <blockquote className={blockquoteStyling.blockClassNames}>
              {RichText.render(blockquote_text)}
            </blockquote>
            <cite className={blockquoteStyling.citeClassNames}>
              {RichText.asText(blockquote_attribution)}
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blockquote;
