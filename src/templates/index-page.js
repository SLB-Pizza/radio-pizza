import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import "../styles/index.scss";
import { Hero, HomeContent } from "../components";

function IndexPageTemplate({ data }) {
  return (
    <div className="has-navbar-fixed-bottom site-page">
      <Hero />
      <HomeContent />
    </div>
  );
}

export default IndexPageTemplate;
