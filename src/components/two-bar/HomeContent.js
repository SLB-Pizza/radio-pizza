import React from "react";
import { HomeMixes, HomeEvents } from "./index";

function HomeContent() {
  return (
    <div className="home-content">
      <HomeMixes />
      <HomeEvents />
    </div>
  );
}

export default HomeContent;
