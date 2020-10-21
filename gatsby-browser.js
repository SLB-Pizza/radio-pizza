import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { PrismicLink } from 'apollo-link-prismic'
import GlobalContextProvider from './src/context/GlobalContextProvider'
import Layout from './src/components/Layout'
import { registerLinkResolver } from 'gatsby-source-prismic-graphql'
import linkResolver from './src/utils/linkResolver'

/**
 * Create the Apollo Client and give it our Prismic CMS graphql endpoint
 * @name ApolloPrismicClient
 * @see {@link https://www.apollographql.com/docs/react/get-started/#create-a-client|Create a Client}
 * @see {@link https://github.com/gatsbyjs/gatsby/issues/11225#issuecomment-457211628|Wrapping root element in gatsby-browser AND gatsby-ssr}
 */
const client = new ApolloClient({
  link: PrismicLink({
    uri: 'https://hmbk-cms.prismic.io/graphql',
  }),
  cache: new InMemoryCache(),
})

/**
 * @see {@link https://github.com/gatsbyjs/gatsby/issues/11225#issuecomment-457211628|Wrapping root element in gatsby-browser AND gatsby-ssr}
 */
export const wrapRootElement = ({ element }) => {
  return (
    <GlobalContextProvider>
      <ApolloProvider client={client}>{element}</ApolloProvider>
    </GlobalContextProvider>
  )
}

/**
 * Wrap every page created by gatsby with the {@link Layout} component.
 */
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

registerLinkResolver(linkResolver)
