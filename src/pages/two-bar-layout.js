import React from "react";
import { BottomNav } from "../components/two-bar/index";

import "../components/styles/index.scss";

const TwoBarLayout = () => (
  <div className="has-navbar-fixed-bottom">
    <BottomNav />
  </div>
);

export default TwoBarLayout;
