const getBlockquoteStyling = (type, bgIMG) => {
  let styling = {
    imgStyle: null,
    blockClassNames: "is-size-1-desktop is-size-3-tablet is-size-4-mobile",
    citeClassNames:
      "is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-right",
  };

  /**
   * First, we need to deterimine the type of blockquote from slice.primary.blockquote_type.
   *
   * Prismic has a limitation when it comes to the developer's ability to give the end user, in this case, the writer, proper instructions outside of being able to set the placeholder text for the given field in the CMS.
   *
   * In this particular instance, to best inform the user of what each choice in the blockquote_type select dropdown is, I have written the options out as follows:
   * - None: no background image; white quote text on black
   * - Light: light background image; black quote text
   * - Dark: dark background image; white quote text
   *
   * The first word of each option matches a case in the switch statement below.This informs the user and also allows me, the dev, to easily pull the type by doing the following:
   * - a .split() on the ":" character
   * - grabbing the first entry of the created array
   * - finally, transforming that string to all lowercase to match the cases in the switch statement.
   */

  const bgType = type.split(": ")[0].toLowerCase();

  const bgURL = bgIMG.url;

  /**
   * Declare imgStyle as null so that no inline object is passed to the inline call in the return. Doing so sets the default to no background image; black page background, the "none" blockquote type.
   */

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
};

export default getBlockquoteStyling;
