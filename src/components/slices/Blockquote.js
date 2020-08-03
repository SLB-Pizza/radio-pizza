import React from "react";

// const Blockquote = ( { slice }) => {
const Blockquote = (props) => {
  const { bgURL, bgType } = props;

  // Declare imgStyle to default to no background image; black page background
  let imgStyle = null;

  let blockClassNames = "is-size-1-desktop is-size-3-tablet is-size-4-mobile";
  let citeClassNames =
    "is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-right";

  switch (bgType) {
    case "none": // Blockquote with no background image
      imgStyle = null;
      break;
    case "light": // Blockquote with light color background image
      imgStyle = {
        backgroundImage: `url(${bgURL})`,
      };
      blockClassNames += " light-bg";
      citeClassNames += " has-text-black";
      break;
    case "dark": // Blockquote with dark color background image
      imgStyle = {
        backgroundImage: `url(${bgURL})`,
      };
      blockClassNames += " dark-bg";
      citeClassNames += " has-text-white";
      break;
    default:
      imgStyle = null;
  }

  return (
    <section className="hero sample-feature" style={imgStyle}>
      <div className="hero-body">
        <div className="container">
          <div className="content">
            <blockquote className={blockClassNames}>
              If we open a quarrel between past and present, we shall find that
              we have lost the future.
            </blockquote>
            <cite className={citeClassNames}>Winston Churchill</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blockquote;
