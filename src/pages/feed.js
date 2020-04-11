import React from "react";
import { NewsPage } from "../components/";
import "../styles/index.scss";

const NewsFeed = () => (
  <div className="has-navbar-fixed-bottom">
    <NewsPage />
  </div>
);

export default NewsFeed;
