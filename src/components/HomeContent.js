import React from "react";
import { HomeMixes, HomeEvents, HomeNews } from "./index";

function HomeContent() {
  return (
    <section className="home-content">
      <HomeMixes />
      <HomeEvents />
      <HomeNews />
    </section>
  );
}

export default HomeContent;
