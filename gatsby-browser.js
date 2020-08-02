import React from "react";
import GlobalContextProvider from "./src/context/GlobalContextProvider";
import Layout from "./src/components/Layout";
import { registerLinkResolver } from "gatsby-source-prismic-graphql";
import linkResolver from "./src/utils/linkResolver";

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};

// Wraps every page in Layout
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

//
registerLinkResolver(linkResolver);
