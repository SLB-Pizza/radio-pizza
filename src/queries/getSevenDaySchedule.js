import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, not the Gatsby syntax!
 * Retrieves the first available date after yesterday with scheduled show entries.
 * Used in {@link ScheduleBar}.
 * @category Queries
 * @name GET_SEVEN_DAY_SCHEDULE
 * @param yesterday - day before today
 * @param weekAndADay - eight days after today
 * @see {@link https://hmbk-cms.prismic.io/graphql HMBK's Prismic GraphQL API}
 * @see {@link https://prismic.io/docs/graphql/query-the-api/query-by-date Prismic - GraphQL Query by Date}
 */

export const GET_SEVEN_DAY_SCHEDULE = gql`
  query GetSevenDaySchedule($yesterday: Date!, $weekAndADay: Date!) {
    allSchedules(
      where: {
        schedule_date_after: $yesterday
        schedule_date_before: $weekAndADay
      }
      sortBy: schedule_date_ASC
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
