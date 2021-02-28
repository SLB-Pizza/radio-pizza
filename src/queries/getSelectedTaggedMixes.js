import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
 * A query that's run `onClick` when a {@link SingleMixCard} tag button is clicked.
 * Used by all {@link SingleMixCard} site-wide
 * @category Queries
 * @const GET_SELECTED_TAGGED_MIXES
 * @see {@link https://hmbk-cms.prismic.io/graphql HMBK's Prismic GraphQL API}
 */
export const GET_SELECTED_TAGGED_MIXES = gql`
  query getSelectedTaggedMixes($after: String, $tags: [String!]!) {
    allMixs(sortBy: mix_date_DESC, after: $after, tags_in: $tags) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          _meta {
            uid
            type
            tags
          }
          mix_image
          mix_title
          mix_link
          mix_date
          featured_residents {
            ... on MixFeatured_residents {
              mix_resident {
                ... on Resident {
                  _meta {
                    uid
                    type
                  }
                  resident_name
                }
              }
            }
          }
        }
      }
    }
  }
`
