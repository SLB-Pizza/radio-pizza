import { gql } from '@apollo/client'

/**
 * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
 * @category Queries
 * @const GET_MORE_RESIDENTS
 * Used in {@link ResidentIndex}
 * @see {@link https://hmbk-cms.prismic.io/graphql| HMBK's Prismic GraphQL API}
 */
export const GET_MORE_RESIDENTS = gql`
  query GetMoreResidents($first: Int = 12, $after: String) {
    allResidents(
      sortBy: resident_name_ASC
      where: { resident_status: "Resident" }
      first: $first
      after: $after
    ) {
      edges {
        node {
          _meta {
            uid
            type
          }
          resident_name
          resident_image
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

/**
 * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
 * @category Queries
 * @const GET_MORE_ALUMNI
 * Used in {@link ResidentIndex}
 * @see {@link https://hmbk-cms.prismic.io/graphql| HMBK's Prismic GraphQL API}
 */
export const GET_MORE_ALUMNI = gql`
  query GetMoreAlumni($first: Int = 12, $after: String) {
    allResidents(
      sortBy: resident_name_ASC
      where: { resident_status: "Alumni" }
      first: $first
      after: $after
    ) {
      edges {
        node {
          _meta {
            uid
            type
          }
          resident_name
          resident_image
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
/**
 * Query for Prismic in the GraphQL syntax, NOT the Gatsby syntax!
 * @category Queries
 * @const GET_MORE_GUESTS
 * Used in {@link ResidentIndex}
 * @see {@link https://hmbk-cms.prismic.io/graphql| HMBK's Prismic GraphQL API}
 */
export const GET_MORE_GUESTS = gql`
  query GetMoreGuests($first: Int = 12, $after: String) {
    allResidents(
      sortBy: resident_name_ASC
      where: { resient_status: "Guest" }
      first: $first
      after: $after
    ) {
      edges {
        node {
          _meta {
            uid
            type
          }
          resident_name
          resident_image
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
