import { gql } from '@apollo/client'

/**
 * Fetches 12 Mixes to filter through in {@link processFetchedHomeMixes} using {@link removeDuplicateFetchData}.
 * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
 * Similar procedure as in {@link ScheduleBar}, {@link HomeEvents} and {@link HomeFeatures}.
 * Called in {@link HomeMixes} by {@link HomeMixesQuery}.
 * @category Queries
 * @name FILL_HOME_MIXES
 * @see {@link https://hmbk-cms.prismic.io/graphql HMBK's Prismic GraphQL API}
 */
export const FILL_HOME_MIXES = gql`
  query FillHomeMixes {
    allMixs(sortBy: mix_date_DESC, first: 12) {
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
