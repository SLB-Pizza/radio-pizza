module.exports = {
  siteMetadata: {
    title: "HalfmoonBK",
    description: "Ears to the concrete.",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
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
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "@mkitio/gatsby-theme-password-protect",
      options: {
        password: "HalfmoonBK2020",
        pagePaths: ["/cms-help"], // delete or `undefined` to disable password protection
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "hmbk-cms", // https://hmbk-cms.prismic.io/,
        pages: [
          {
            type: "Feature",
            match: "/features/:uid",
            path: "/feature-preview",
            component: require.resolve("./src/templates/Feature.js"),
          },
          {
            type: "Cms_guide",
            match: "/cms-guide/:uid",
            component: require.resolve("./src/templates/CMSGuide.js"),
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        develop: false, // Activates purging in npm run develop
        // purgeOnly: ["/all.sass"], // REMOVE THIS LINE FOR DEPLOYS
        printRejected: true,
      },
    }, // must be after other CSS plugins
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
