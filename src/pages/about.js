import React from "react";
import { TopNav, AboutPage, BottomNav } from "../components/";
import "../styles/index.scss";

// import Layout from "../components/Layout";

const About = () => (
  <body className="has-navbar-fixed-bottom">
    <TopNav />
    <AboutPage />
    <BottomNav />
  </body>
);

export default About;
