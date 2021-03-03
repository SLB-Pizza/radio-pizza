import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
 * Similar procedure as in {@link ScheduleBar}, {@link HomeMixes} and {@link HomeEvents}.
 * Used in {@link HomeFeatures}.
 * @category Queries
 * @name FILL_HOME_FEATURES
 * @see {@link https://hmbk-cms.prismic.io/graphql HMBK's Prismic GraphQL API}
 */

export const FILL_HOME_FEATURES = gql`
  query FillHomeFeatures($count: Int!) {
    allFeatures(sortBy: meta_firstPublicationDate_DESC, first: $count) {
      edges {
        node {
          _meta {
            uid
            type
            firstPublicationDate
            lastPublicationDate
          }
          headline_block {
            ... on FeatureHeadline_blockHeadline_block {
              primary {
                article_headline_img
                article_category
                article_subcategory
                article_headline
                article_subtitle
              }
            }
          }
        }
      }
    }
  }
`
