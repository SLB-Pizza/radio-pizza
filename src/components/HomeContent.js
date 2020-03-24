import React from "react";
import { HomeMixes, HomeEvents, HomeNews } from "./index";

function HomeContent() {
  return (
    <div className="home-content">
      <HomeMixes />
      <HomeEvents />
      <HomeNews />
    </div>
  );
}

export default HomeContent;
