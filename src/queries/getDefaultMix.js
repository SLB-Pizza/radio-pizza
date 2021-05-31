import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, not the Gatsby syntax!
 * Retrieves the default mix that's displayed in {@link RadioPlayer}.
 * Used in {@link RadioBar} -> dispatched using `SET_INITIAL_MIX`.
 * @category Queries
 * @name GET_DEFAULT_MIX
 * @see {@link https://hmbk-cms.prismic.io/graphql HMBK's Prismic GraphQL API}
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
