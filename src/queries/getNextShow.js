import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, not the Gatsby syntax!
 * Retrieves the first available date after yesterday with scheduled show entries
 * @category Queries
 * @const
 * Used in {@link ScheduleBar}
 * @see {@link https://hmbk-cms.prismic.io/graphql | HMBK's Prismic GraphQL API}
 * @see {@link https://prismic.io/docs/graphql/query-the-api/query-by-date | Prismic - GraphQL Query by Date}
 */
export const GET_NEXT_SHOW = gql`
  query getNextShow($yesterday: Date!) {
    allSchedules(
      where: { schedule_date_after: $yesterday }
      sortBy: schedule_date_ASC
      first: 1
    ) {
      edges {
        node {
          schedule_date
          schedule_entries {
            end_time
            start_time
            scheduled_show {
              ... on Mix {
                mix_image
                mix_title
                featured_residents {
                  mix_resident {
                    ... on Resident {
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
  }
`
