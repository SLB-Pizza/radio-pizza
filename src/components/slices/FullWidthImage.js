import React from "react";

const FullWidthImage = ({ slice }) => (
  <section
    class="hero is-medium is-primary is-bold"
    style={{
      backgroundImage: url(
        "https://images.prismic.io/hmbk-cms/a0964540-5c50-49f1-9d9e-f034dff29707_wallhaven-4g6k87.jpg?auto=compress,format"
      ),
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

export default FullWidthImage;
