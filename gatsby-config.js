require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'HalfmoonBK',
    description:
      'Ears to the concrete. Brooklyn based music network connecting music culture across the world through radio, events, and more. Founded in 2017, Half Moon was born out of the need to defy. We bring our audience live, uncensored and undiscovered music to remind the world that the underground is where the sublime lives, grows and becomes timeless.',
    siteUrl: `https://halfmoon-rebuild-wip-2020.netlify.app/`,
    twitterUsername: '@halfmoonbk',
  },
  plugins: [
    /**
     * Disables Font Awesome auto CSS insertion and instead inserts it at compile time. On the initial load, a page will jump because the icons load without styling. The problem is that Font Awesome inserts its styles in the frontend.
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-plugin-fontawesome-css/ gatsby-plugin-fontawesome-css}
     */
    'gatsby-plugin-fontawesome-css',
    /**
     * Provides drop-in support for server rendering data added with React Helmet
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=helm/ gatsby-plugin-react-helmet}
     */
    'gatsby-plugin-react-helmet',
    /**
     * Provides drop-in support for Sass/SCSS stylesheets
     * @see {@link https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sass gatsby-plugin-sass}
     */
    'gatsby-plugin-sass',
    /**
     * A Gatsby source plugin for sourcing data into your Gatsby application from your local filesystem
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-plugin-sass/?=file gatsby-source-filesystem}
     */
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    /**
     * A Gatsby theme for protecting apps and pages with password
     * @see {@link https://www.gatsbyjs.com/plugins/@mkitio/gatsby-theme-password-protect/ gatsby-theme-password-protect}
     */
    {
      resolve: '@mkitio/gatsby-theme-password-protect',
      options: {
        password: `${process.env.GATSBY_HMBK_ADMIN_PASSWORD}`,
        partialMatching: true, // /guide, /guide/any-other-routes, etc..
        pagePaths: ['/hmbk-admin'], // delete or `undefined` to disable password protection
      },
    },
    /**
     * A Gatsby plugin for fetching source data from the Prismic headless CMS using Prismic’s beta GraphQL API. Previews have been disabled
     * @see {@link https://hmbk-cms.prismic.io/ HMBK Prismic CMS}
     * @see {@link https://prismic.io/docs/technologies/migration-guide-gatsby Migrate to the recommended plugin: `gatsby-source-prismic`}
     * @see {@link https://www.gatsbyjs.com/plugins/@prismicio/gatsby-source-prismic-graphql/ gatsby-source-prismic-graphql}
     * @see {@link https://prismic.io/docs/gatsby/getting-started/prismic-gatsby-source-plugin Prismic.io docs - Prismic Gatsby Plugin}
     */
    {
      resolve: '@prismicio/gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'hmbk-cms', //https://hmbk-cms.prismic.io/
        // previews: true,
        // path: "/preview",
        pages: [
          {
            type: 'Feature',
            match: '/editorial/:uid',
            path: '/feature-preview/',
            component: require.resolve('./src/templates/Feature.js'),
          },
          {
            type: 'Cms_guide',
            match: '/hmbk-admin/guides/:uid',
            path: '/guide-preview/',
            component: require.resolve('./src/templates/CMSGuide.js'),
          },
          {
            type: 'Resident',
            match: '/residents/:uid',
            path: '/resident-preview/',
            component: require.resolve('./src/templates/Resident.js'),
          },
          // {
          //   type: 'Mix',
          //   match: '/mixes/:uid',
          //   path: '/mix-preview/',
          //   component: require.resolve('./src/templates/Mix.js'),
          // },
          {
            type: 'Event',
            match: '/events/:uid',
            path: '/event-preview/',
            component: require.resolve('./src/templates/Event.js'),
          },
        ],
      },
    },
    /**
     * Purges all unused/unreferenced css rules
     * To prevent conflicts, must be after other CSS plugins
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-plugin-purgecss/ gatsby-plugin-purgecss}
     */
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        develop: false, // Activates purging in npm run develop
        printRejected: true,
      },
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        features: {
          // auth: true,
          database: true,
        },
        credentials: {
          apiKey: `${process.env.GATSBY_FIREBASE_API_KEY}`,
          authDomain: 'halfmoonmarquee.firebaseapp.com',
          databaseURL: 'https://halfmoonmarquee-default-rtdb.firebaseio.com',
          projectId: 'halfmoonmarquee',
          storageBucket: 'halfmoonmarquee.appspot.com',
          messagingSenderId: `${process.env.GATSBY_FIREBASE_MESSAGING_SENDER}`,
          appId: `${process.env.GATSBY_FIREBASE_APP_ID}`,
          measurementId: 'G-GGD961PQ5S',
        },
      },
    },
    /**
     * Automatically generates a _headers file and a _redirects file at the root of the public folder to configure HTTP headers and redirects on Netlify
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify/ gatsby-plugin-netlify}
     */
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
