import React from "react";

// const Blockquote = ( { slice }) => {
const Blockquote = (props) => {
  const { bgURL, bgType } = props;

  // Declare imgStyle to default to no background image; black page background
  let imgStyle = null;
  let blockColors = null;
  let citeColors = null;

  switch (bgType) {
    case "none": // Blockquote with no background image
      imgStyle = null;
      break;
    case "light": // Blockquote with light color background image
      imgStyle = {
        backgroundImage: `url(${bgURL})`,
      };
      blockColors = {
        borderLeft: "5px solid black",
        color: "black",
      };
      citeColors = {
        color: "black",
      };
      break;
    case "dark": // Blockquote with dark color background image
      imgStyle = {
        backgroundImage: `url(${bgURL})`,
      };
      blockColors = {
        borderLeft: "5px solid white",
        color: "white",
      };
      citeColors = {
        color: "white",
      };
      break;
    default:
      imgStyle = null;
  }

  return (
    <section className="hero sample-feature" style={imgStyle}>
      <div className="hero-body">
        <div className="container">
          <div className="content">
            <blockquote
              className="is-size-1-desktop is-size-3-tablet is-size-4-mobile"
              style={blockColors}
            >
              If we open a quarrel between past and present, we shall find that
              we have lost the future.
            </blockquote>
            <cite
              className="is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-right"
              style={citeColors}
            >
              Winston Churchill
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blockquote;
