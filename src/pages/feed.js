import React from "react";
import { TopNav, NewsPage, BottomNav } from "../components/";
import "../styles/index.scss";

// import Layout from "../components/Layout";

const NewsFeed = () => (
  <div className="has-navbar-fixed-bottom">
    <TopNav />
    <NewsPage />
    <BottomNav />
  </div>
);

export default NewsFeed;
