import React from "react";
import { TopNav, ResidentsPage, BottomNav } from "../components/";
import "../styles/index.scss";

// import Layout from "../components/Layout";

const Residents = () => (
  <div className="has-navbar-fixed-bottom">
    <TopNav />
    <ResidentsPage />
    <BottomNav />
  </div>
);

export default Residents;
