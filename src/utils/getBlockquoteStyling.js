/**
 * Prismic has a limitation when it comes to the developer's ability to give the end user, in this case, the writer, proper instructions outside of being able to set the placeholder text for the given field in the CMS.
 *
 * In this particular instance, to best inform the user of what each choice in the blockquote_type select dropdown is, I have written the options out as follows:
 * - None: no background image; white quote text on black
 * - Light: light background image; black quote text
 * - Dark: dark background image; white quote text
 * @function getBlockquoteStyling
 * @param {String} type
 * @param {Object} bgIMG
 * @property {String} bgIMG.url - the URL that would be passing into styling.imgStyle should the Blockquote be the type that has a background image
 * @returns {object}
 */

export default function getBlockquoteStyling(type, bgIMG) {
  /**
   * Contains the data needed to style the Blockquote properly.
   * @typedef {Object} styling
   * @property {?Object} styling.imgStyle - the style object to inject the url from bgIMG into the main Blockquote `<section>` element, if the type calls for it. It defaults to `null` so that no inline object is passed to the inline call in the return. Doing so sets the default to no background image; black page background, the "none" blockquote type.
   * @property {string} styling.blockClassNames - the string used as the className for the `<blockquote>` element in Blockquote.js
   * @property {string} styling.citeClassNames - the string used as the className for the `<cite>` element in Blockquote.js
   */
  let styling = {
    imgStyle: null,
    blockClassNames: "is-size-1-desktop is-size-3-tablet is-size-4-mobile",
    citeClassNames:
      "is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-right",
  };

  /**
   *
   * The first word of each option matches a case in the switch statement below.This informs the user and also allows me, the dev, to easily pull the type by doing the following:
   * - a .split() on the ":" character
   * - grabbing the first entry of the created array
   * - finally, transforming that string to all lowercase to match the cases in the switch statement.
   */
  const bgType = type.split(": ")[0].toLowerCase();

  /**
   * Grab the url from the bgURL data object.
   */
  const bgURL = bgIMG.url;

  switch (bgType) {
    case "none": // Blockquote with no background image
      styling.imgStyle = null;
      break;
    case "light": // Blockquote with light color background image--
      styling.imgStyle = {
        backgroundImage: `url(${bgURL})`,
      };
      styling.blockClassNames += " light-bg";
      styling.citeClassNames += " has-text-black";
      break;
    case "dark": // Blockquote with dark color background image
      styling.imgStyle = {
        backgroundImage: `url(${bgURL})`,
      };
      styling.blockClassNames += " dark-bg";
      break;
    default:
      // Default to white text on black, no background image
      styling.imgStyle = null;
  }
  return styling;
}