import React from "react";

// const Blockquote = ( { slice }) => {
const Blockquote = (props) => {
  const { type, bgUrl } = props.details;

  let imgStyle = null;
  if (bgUrl) {
    imgStyle = {
      backgroundImage: `url(${bgUrl})`,
    };
  }

  let heroClassName = "";
  switch (type) {
    case "short":
      heroClassName = "hero sample-feature";
      break;
    case "medium":
      heroClassName = "hero is-medium sample-feature";
      break;
    case "large":
      heroClassName = "hero is-large sample-feature";
      break;
    default:
      heroClassName = "hero sample-feature";
  }

  return (
    <section class={heroClassName} style={imgStyle}>
      <div class="hero-body">
        <div class="container">
          <div className="content">
            <blockquote>
              If we open a quarrel between past and present, we shall find that
              we have lost the future.
              <cite>Winston Churchill</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blockquote;
