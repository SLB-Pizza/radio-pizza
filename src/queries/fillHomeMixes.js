import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
 * Similar procedure as in {@link ScheduleBar}, {@link HomeEvents} and {@link HomeFeatures}
 * @category Queries
 * @const FILL_HOME_MIXES
 * Used in {@link HomeMixes}
 * @see {@link https://hmbk-cms.prismic.io/graphql HMBK's Prismic GraphQL API}
 */
export const FILL_HOME_MIXES = gql`
  query FillHomeMixes($count: Int!) {
    allMixs(sortBy: mix_date_DESC, first: $count) {
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
