import React from "react";

// const FullWidthImage = ({ slice }) => {
const FullWidthImage = (props) => {
  const { type, data, bgUrl } = props;

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
    <section className={heroClassName} style={imgStyle}>
      <div className="hero-body">
        <div className="container">
          <p className="title is-size-3">{data}</p>
          <h2 className="subtitle">Full Width Image Title</h2>
        </div>
      </div>
    </section>
  );
};

export default FullWidthImage;
