import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { PrismicLink } from 'apollo-link-prismic'
import GlobalContextProvider from './src/context/GlobalContextProvider'
import Layout from './src/components/Layout'
import { registerLinkResolver } from '@prismicio/gatsby-source-prismic-graphql'
import linkResolver from './src/utils/linkResolver'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faApple,
  faBandcamp,
  faFacebookSquare,
  faInstagram,
  faMixcloud,
  faSoundcloud,
  faSpotify,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import {
  faBook,
  faBroadcastTower,
  faCalendarAlt,
  faCheck,
  faComments,
  faExclamationTriangle,
  faExternalLinkAlt,
  faGlobe,
  faHeadphones,
  faInfoCircle,
  faLock,
  faMapMarkerAlt,
  faPlay,
  faPause,
  faSearch,
  faTag,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import 'firebase/database'

/**
 * @see {@link https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently Build a Library to Reference Icons Throughout Your App More Conveniently}
 */
library.add(
  faApple,
  faBandcamp,
  faBook,
  faBroadcastTower,
  faCalendarAlt,
  faCheck,
  faComments,
  faExclamationTriangle,
  faExternalLinkAlt,
  faHeadphones,
  faFacebookSquare,
  faGlobe,
  faInfoCircle,
  faInstagram,
  faLock,
  faMapMarkerAlt,
  faMixcloud,
  faPlay,
  faPause,
  faSoundcloud,
  faSearch,
  faTag,
  faTimes,
  faSpotify,
  faTwitter,
  faYoutube
)
/**
 * Create the Apollo Client and give it our Prismic CMS graphql endpoint
 * @name ApolloPrismicClient
 * @see {@link https://www.apollographql.com/docs/react/get-started/#create-a-client Create a Client}
 * @see {@link https://github.com/gatsbyjs/gatsby/issues/11225#issuecomment-457211628 Wrapping root element in gatsby-browser AND gatsby-ssr}
 */
const client = new ApolloClient({
  link: PrismicLink({
    uri: 'https://hmbk-cms.prismic.io/graphql',
  }),
  cache: new InMemoryCache(),
})

/**
 * @see {@link https://github.com/gatsbyjs/gatsby/issues/11225#issuecomment-457211628 Wrapping root element in gatsby-browser AND gatsby-ssr}
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
