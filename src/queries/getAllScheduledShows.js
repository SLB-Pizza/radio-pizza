import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, not the Gatsby syntax!
 * Retrieves the first available date after yesterday with scheduled show entries.
 * Used in {@link ScheduleBar}.
 * @category Queries
 * @name GET_ALL_SCHEDULED_SHOWS
 * @param {String} yesterday - day before today; "YYYY-MM-DD" format
 * @param {?String} after - cursor to when refetching
 * @see {@link https://hmbk-cms.prismic.io/graphql HMBK's Prismic GraphQL API}
 * @see {@link https://prismic.io/docs/graphql/query-the-api/query-by-date Prismic - GraphQL Query by Date}
 */

export const GET_ALL_SCHEDULED_SHOWS = gql`
  query GetAllScheduledShows($yesterday: Date!, $after: String) {
    allSchedules(
      where: { schedule_date_after: $yesterday }
      sortBy: schedule_date_ASC
      after: $after
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          schedule_date
          schedule_entries {
            end_time
            start_time
            live_show_title
            live_show_guests
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
