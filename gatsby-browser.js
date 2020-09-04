import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PrismicLink } from "apollo-link-prismic";
import GlobalContextProvider from "./src/context/GlobalContextProvider";
import Layout from "./src/components/Layout";
import { registerLinkResolver } from "gatsby-source-prismic-graphql";
import linkResolver from "./src/utils/linkResolver";

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
 * Wrapping the root client with `<ApolloProvider>` allows us to access {@link ApolloPrismicClient} from anywhere in our app. The `<ApolloProvider>` is similar to React's `Context.Provider`.
 *
 * @see {@link https://www.apollographql.com/docs/react/get-started/#connect-your-client-to-react|Connect the Client to the Project}
 * @see {@link https://reactjs.org/docs/context.html#contextprovider|React's Context Provider}
 */
export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <GlobalContextProvider>{element}</GlobalContextProvider>
    </ApolloProvider>
  );
};

/**
 * Wrap every page created by gatsby with the {@link Layout} component.
 */
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

registerLinkResolver(linkResolver);
