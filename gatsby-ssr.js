// const React = require("react");
// const GlobalContextProvider = require("./src/context/GlobalContextProvider")
//   .default;
// const Layout = require("./src/components/Layout").default;
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { PrismicLink } from "apollo-link-prismic";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PrismicLink } from "apollo-link-prismic";
import GlobalContextProvider from "./src/context/GlobalContextProvider";
import Layout from "./src/components/Layout";

/**
 * Create the Apollo Client and give it our Prismic CMS graphql endpoint
 * @name ApolloPrismicClient
 * @see {@link https://www.apollographql.com/docs/react/get-started/#create-a-client|Create a Client}

 */
const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://hmbk-cms.prismic.io/graphql",
  }),
  cache: new InMemoryCache(),
});

/**
 * @see {@link https://github.com/gatsbyjs/gatsby/issues/11225#issuecomment-457211628|Wrapping root element in gatsby-browser AND gatsby-ssr}
 */
export const wrapRootElement = ({ element }) => {
  <ApolloProvider client={client}>
    <GlobalContextProvider>{element}</GlobalContextProvider>
  </ApolloProvider>;
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
