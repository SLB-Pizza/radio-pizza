import React from "react";

const FullWidthImage = ({ slice }) => {
  const imgUrl =
    "https://images.prismic.io/hmbk-cms/7a050f39-fc51-4148-8272-cbb5ed05e261_wallhaven-g8gxo3.png?auto=compress,format";

  return (
    <section
      class="hero is-medium"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Full Width Image Title</h1>
          <h2 class="subtitle">Full Width Image Title</h2>
        </div>
      </div>
    </section>
  );
};

export default FullWidthImage;
