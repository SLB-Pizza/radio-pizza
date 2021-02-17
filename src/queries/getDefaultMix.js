import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, not the Gatsby syntax!
 * Retrieves the default mix that's displayed in {@link RadioPlayer}
 * @category Queries
 * @const GET_DEFAULT_MIX
 * Used in {@link RadioBar} -> passed to {@link RadioPlayer}
 * @see {@link https://hmbk-cms.prismic.io/graphql| HMBK's Prismic GraphQL API}
 */
export const GET_DEFAULT_MIX = gql`
  query getDefaultMix {
    allTopnavs {
      edges {
        node {
          default_mix {
            ... on Mix {
              mix_image
              mix_link
              mix_title
              featured_residents {
                mix_resident {
                  ... on Resident {
                    resident_image
                    resident_name
                    _meta {
                      uid
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
