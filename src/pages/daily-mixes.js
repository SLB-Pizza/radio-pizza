import React from "react";
import { TopNav, MixesPage, BottomNav } from "../components";
import "../styles/index.scss";

// import Layout from "../components/Layout";

const DailyMixes = () => (
  <div className="has-navbar-fixed-bottom">
    <TopNav />
    <MixesPage />
    <BottomNav />
  </div>
);

export default DailyMixes;
