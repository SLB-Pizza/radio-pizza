import { gql } from '@apollo/client'

/**
 * Fetches 4 Features to filter through in {@link processFetchedHomeFeatures} using {@link removeDuplicateFetchData}.
 * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
 * Similar procedure as in {@link ScheduleBar}, {@link HomeMixes} and {@link HomeEvents}.
 * Called in {@link HomeFeatures} by {@link HomeFeaturesQuery}.
 * @category Queries
 * @name FILL_HOME_FEATURES
 * @see {@link https://hmbk-cms.prismic.io/graphql HMBK's Prismic GraphQL API}
 */

export const FILL_HOME_FEATURES = gql`
  query FillHomeFeatures {
    allFeatures(sortBy: meta_firstPublicationDate_DESC, first: 4) {
      edges {
        node {
          _meta {
            uid
            type
            firstPublicationDate
            lastPublicationDate
          }
          header {
            ... on FeatureHeaderHeadline_block {
              primary {
                article_headline
                article_headline_img
                article_category
                article_subcategory
                article_subtitle
              }
            }
          }
        }
      }
    }
  }
`
