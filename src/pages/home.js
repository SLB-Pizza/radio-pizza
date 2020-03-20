import React from "react";
import {
  TopNav,
  Hero,
  BottomNav,
  HomeContent
} from "../components/two-bar/index";

import "../components/styles/index.scss";

const TwoBarLayout = () => (
  <div className="has-navbar-fixed-bottom">
    <TopNav />
    <Hero />
    <HomeContent />
    <BottomNav />
  </div>
);

export default TwoBarLayout;
