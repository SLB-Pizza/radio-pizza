import React from "react";
import { BottomNav, Hero, TopNav } from "../components/two-bar/index";

import "../components/styles/index.scss";

const TwoBarLayout = () => (
  <div className="has-navbar-fixed-bottom">
    <TopNav />
    <Hero />
    <BottomNav />
  </div>
);

export default TwoBarLayout;
