import React from "react";

// const FullWidthImage = ({ slice }) => {
const imgUrl =
  "https://images.prismic.io/hmbk-cms/3665ac51-0ceb-4701-9e54-1a3699401d13_wallhaven-vm2o9m.jpg?auto=compress,format";

const FullWidthImage = (props) => {
  const { type, data } = props.details;

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
    <section
      class={heroClassName}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div class="hero-body">
        <div class="container">
          <p class="title is-size-3">{data}</p>
          <h2 class="subtitle">Full Width Image Title</h2>
        </div>
      </div>
    </section>
  );
};

export default FullWidthImage;
