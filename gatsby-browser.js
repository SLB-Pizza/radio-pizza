import React from "react";
import GlobalContextProvider from "./src/context/GlobalContextProvider";
import Layout from "./src/components/Layout";
import { registerLinkResolver } from "gatsby-source-prismic-graphql";
import linkResolver from "./src/utils/linkResolver";

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};

/**
 * Wrap every page created by gatsby with the {@link Layout} component.
 */
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

registerLinkResolver(linkResolver);
