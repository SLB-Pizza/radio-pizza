import React from "react";
import { TopNav, MixesPage, BottomNav } from "../components";
import "../components/styles/index.scss";

// import Layout from "../components/Layout";

/**
 * SPECIAL NOTE
 * ------------
 * Since this will be the future index page, for the <Hero /> component
 * to work properly, its main div:
 *
 *     <section className="hero is-success is-fullheight-with-navbar">
 *
 * requires that its parent div, this index-level component, be
 * a <body className="has-navbar-fixed-bottom"> element
 * in order for everything to line up. This top level element would be akin modifying the
 * `index.html` <body> element the same way to get this layout setup.
 */

const DailyMixes = () => (
  <div className="has-navbar-fixed-bottom">
    <TopNav />
    <MixesPage />
    <BottomNav />
  </div>
);

export default DailyMixes;
