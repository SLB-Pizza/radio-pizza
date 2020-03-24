import React from "react";
import { TopNav, SchedulePage, BottomNav } from "../components/";
import "../styles/index.scss";

// import Layout from "../components/Layout";

const Schedule = () => (
  <div className="has-navbar-fixed-bottom">
    <TopNav />
    <SchedulePage />
    <BottomNav />
  </div>
);

export default Schedule;
