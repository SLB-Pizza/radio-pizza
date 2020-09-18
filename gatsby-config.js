module.exports = {
  siteMetadata: {
    title: "HalfmoonBK",
    description: "Ears to the concrete.",
  },
  plugins: [
    /**
     * Provides drop-in support for server rendering data added with React Helmet
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=helm/|gatsby-plugin-react-helmet}
     */
    "gatsby-plugin-react-helmet",
    /**
     * Provides drop-in support for Sass/SCSS stylesheets
     * @see {@link https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sass|gatsby-plugin-sass}
     */
    "gatsby-plugin-sass",
    /**
     * A Gatsby source plugin for sourcing data into your Gatsby application from your local filesystem
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-plugin-sass/?=file|gatsby-source-filesystem}
     */
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    /**
     * A Gatsby theme for protecting apps and pages with password
     * @see {@link https://www.gatsbyjs.com/plugins/@mkitio/gatsby-theme-password-protect/|gatsby-theme-password-protect}
     */
    {
      resolve: "@mkitio/gatsby-theme-password-protect",
      options: {
        password: "$HalfmoonBK2020",
        partialMatching: true, // /guide, /guide/any-other-routes, etc..
        pagePaths: ["/guide"], // delete or `undefined` to disable password protection
      },
    },
    /**
     * A Gatsby plugin for fetching source data from the Prismic headless CMS using Prismic’s beta GraphQL API
     * @see {@link https://hmbk-cms.prismic.io/|HMBK Prismic CMS}
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-source-prismic-graphql/|gatsby-source-prismic-graphql}
     * @see {@link https://prismic.io/docs/gatsby/getting-started/prismic-gatsby-source-plugin|Prismic.io docs - Prismic Gatsby Plugin}
     */
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "hmbk-cms", //https://hmbk-cms.prismic.io/
        pages: [
          {
            type: "Feature",
            match: "/features/:uid",
            path: "/feature-preview",
            component: require.resolve("./src/templates/Feature.js"),
          },
          {
            type: "Cms_guide",
            match: "/guide/:uid",
            component: require.resolve("./src/templates/CMSGuide.js"),
          },
          {
            type: "Resident",
            match: "/residents/:uid",
            component: require.resolve("./src/templates/Resident.js"),
          },
          {
            type: "Mix",
            match: "/mixes/:uid",
            component: require.resolve("./src/templates/Mix.js"),
          },
        ],
      },
    },
    /**
     * Purges all unused/unreferenced css rules
     * To prevent conflicts, must be after other CSS plugins
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-plugin-purgecss/|gatsby-plugin-purgecss}
     */
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        develop: false, // Activates purging in npm run develop
        printRejected: true,
      },
    },
    /**
     * Automatically generates a _headers file and a _redirects file at the root of the public folder to configure HTTP headers and redirects on Netlify
     * @see {@link https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify/|gatsby-plugin-netlify}
     */
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
