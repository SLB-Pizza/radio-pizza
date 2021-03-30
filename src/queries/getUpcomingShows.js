import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, not the Gatsby syntax!
 * Retrieves the first two available dates after yesterday with scheduled show entries.
 * Fetch 2 to cover case where current time is after end of last scheduled show today; present the next available show on a date.
 * Used in {@link ScheduleBar}.
 * @category Queries
 * @name GET_UPCOMING_SHOWS
 * @see {@link https://hmbk-cms.prismic.io/graphql HMBK's Prismic GraphQL API}
 * @see {@link https://prismic.io/docs/graphql/query-the-api/query-by-date Prismic - GraphQL Query by Date}
 */
export const GET_UPCOMING_SHOWS = gql`
  query getUpcomingShows($yesterday: Date!) {
    allSchedules(
      where: { schedule_date_after: $yesterday }
      sortBy: schedule_date_ASC
      first: 2
    ) {
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
