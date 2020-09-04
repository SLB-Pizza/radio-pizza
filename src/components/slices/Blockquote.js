import React from "react";
import { RichText } from "prismic-reactjs";
import getBlockquoteStyling from "../../utils/getBlockquoteStyling";

/**
 * @category CMS
 * @subcategory Slices
 * @function
 * @param {object} slice - the data object coming from Prismic CMS that contains all data needed to create the Blockquote slice
 * @returns {jsx}
 */

function Blockquote({ slice }) {
  /**
   * @namespace
   * @memberof slice.primary {String} blockquote_type
   * @memberof slice.primary {Object[]} blockquote_text - Array of paragraph objects containing the quote's text that is passed into RichText.render() inside the blockquote element
   * @memberof slice.primary {Object[]} blockquote_attribution - Array of paragraph objects containing quote attribution details that is passed into RichText.render() inside the cite element
   * @memberof slice.primary {Object} blockquote_bg_img
   * @property {String} blockquote_bg_img.url - the URL from Prismic of background image injected the section element
   * @property {String} blockquote_bg_img.alt - the alt text from Prismic of background image injected the section element
   */
  const {
    blockquote_type,
    blockquote_text,
    blockquote_attribution,
    blockquote_bg_img,
  } = slice.primary;

  /**
   * Pass the type and the bg_type objects to {@link getBlockquoteStyling} to derive styling.
   */
  const blockquoteStyling = getBlockquoteStyling(
    blockquote_type,
    blockquote_bg_img
  );

  return (
    <section className="hero slice" style={blockquoteStyling.imgStyle}>
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
