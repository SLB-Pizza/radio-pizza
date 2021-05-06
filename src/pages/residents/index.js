import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { useLazyQuery } from '@apollo/client'
import { Helmet } from 'react-helmet'
import {
  HMBKDivider,
  LandingPageFetchAndLoading,
  SingleResidentCard,
  useSiteMetadata,
} from '../../components'
import { toggleColumn } from '../../utils'
import {
  GET_MORE_RESIDENTS,
  GET_MORE_ALUMNI,
  GET_MORE_GUESTS,
} from '../../queries'

/**
 * Layout for the /residents page.
 * @category Pages
 * @function ResidentIndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/residents` landing page
 * @returns {jsx}
 */

function ResidentsIndex({ data }) {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()

  const [isOpen, setIsOpen] = useState('Residents')
  const [categoryLabels, setCategoryLabels] = useState(null)

  const [residents, setResidents] = useState({
    data: null,
    hasMore: null,
    endCursor: null,
  })
  const [alumni, setAlumni] = useState({
    data: null,
    hasMore: null,
    endCursor: null,
  })
  const [guests, setGuests] = useState({
    data: null,
    hasMore: null,
    endCursor: null,
  })

  /**
   * Function that fetches more residents on {@link ResidentIndexPage} using {@link GET_MORE_RESIDENTS}.
   * @category useLazyQuery
   * @name getMoreResidents
   * @see {@link https://www.apollographql.com/docs/react/data/queries/#executing-queries-manually Executing queries manually (useLazyQuery hook)}
   */
  const [
    getMoreResidents,
    { loading: resLoad, data: residentFetch },
  ] = useLazyQuery(GET_MORE_RESIDENTS)

  /**
   * Function that fetches more alumni on {@link ResidentIndexPage} using {@link GET_MORE_ALUMNI}.
   * @category useLazyQuery
   * @name getMoreAlumni
   * @see {@link https://www.apollographql.com/docs/react/data/queries/#executing-queries-manually Executing queries manually (useLazyQuery hook)}
   */
  const [
    getMoreAlumni,
    { loading: alumLoad, data: alumniFetch },
  ] = useLazyQuery(GET_MORE_ALUMNI)

  /**
   * Function that fetches more guests on {@link ResidentIndexPage} using {@link GET_MORE_GUESTS}.
   * @category useLazyQuery
   * @name getMoreGuests
   * @see {@link https://www.apollographql.com/docs/react/data/queries/#executing-queries-manually Executing queries manually (useLazyQuery hook)}
   */
  const [
    getMoreGuests,
    { loading: guestLoad, data: guestFetch },
  ] = useLazyQuery(GET_MORE_GUESTS)

  /**
   * Function passed to {@link LandingPageFetchAndLoading} that calls {@link getMoreResidents} `useLazyQuery`.
   * @category Fetch Trigger
   * @function fetchMoreResidents
   */
  const fetchMoreResidents = () => {
    getMoreResidents({
      variables: {
        after: residents.endCursor,
      },
    })
  }

  /**
   * Function passed to {@link LandingPageFetchAndLoading} that calls {@link getMoreAlumni} `useLazyQuery`.
   * @category Fetch Trigger
   * @function fetchMoreAlumni
   */
  const fetchMoreAlumni = () => {
    getMoreAlumni({
      variables: { after: alumni.endCursor },
    })
  }

  /**
   * Function passed to {@link LandingPageFetchAndLoading} that calls {@link getMoreGuests} `useLazyQuery`.
   * @category Fetch Trigger
   * @function fetchMoreGuests
   */
  const fetchMoreGuests = () => {
    getMoreGuests({
      variables: { after: guests.endCursor },
    })
  }

  /**
   * Don't render this component with having prismicContent
   */
  const prismicContent = data.prismic
  if (!prismicContent) return null

  /**
   * Processes the incoming data from the initial (build) Gatsby page query to set initial resident category data and labels for page to render.
   *
   * There are three categories of resident: resident, alumni, guests.
   * Use their totalCount from the Gatsby page query to see if they have data to `setState`; if they do set the corresponding resident's type state to an object with the following key-value pairs:
   *
   * - `data`: the data array from Gatsby containing the first 12 entries of that category
   * - `hasMore`: boolean dictating whether there are more entries that can be fetched
   * - `endCursor`: starting point for the next fetch of 12 category entries
   * @category useEffect
   * @name setResidentsCategoryData
   */
  useEffect(() => {
    const setResidentsCategoryData = () => {
      /**
       * Collect the labels of all the resident categories that have entries
       * Set `categoryName` to `categoryLabels`
       * `categoryLabels` is then mapped to make the resident type selection buttons
       */
      let labels = []

      /**
       * Residents data check
       */
      if (prismicContent?.residents?.totalCount) {
        setResidents({
          data: prismicContent.residents.edges,
          hasMore: prismicContent.residents.pageInfo.hasNextPage,
          endCursor: prismicContent.residents.pageInfo.endCursor,
        })
        labels.push('Residents')
      }
      /**
       * Alumni data check
       */
      if (prismicContent?.alumni?.totalCount) {
        setAlumni({
          type: 'Alumni',
          data: prismicContent.alumni.edges,
          hasMore: prismicContent.alumni.pageInfo.hasNextPage,
          endCursor: prismicContent.alumni.pageInfo.endCursor,
        })
        labels.push('Alumni')
      }
      /**
       * Guests data check
       */
      if (prismicContent?.guests?.totalCount) {
        setGuests({
          type: 'Guests',
          data: prismicContent.guests.edges,
          hasMore: prismicContent.guests.pageInfo.hasNextPage,
          endCursor: prismicContent.guests.pageInfo.endCursor,
        })
        labels.push('Guests')
      }

      setCategoryLabels(labels)
    }

    return setResidentsCategoryData()
  }, [data])

  /**
   * Function that `setState` any data received by an `onClick` triggered `useLazyQuery` fetch function.
   *
   * | fetched data    | fetched by function      | state to update |
   * |-----------------|--------------------------|-----------------|
   * | `residentFetch` | {@link getMoreResidents} | `setResidents`  |
   * | `alumniFetch`   | {@link getMoreAlumni}    | `setAlumni`     |
   * | `guestFetch`    | {@link getMoreGuests}    | `setGuests`     |
   * @category useEffect
   * @name processFetchedResidentsData
   */
  useEffect(() => {
    const processFetchedResidentsData = () => {
      /**
       * Handle a residentFetch update
       */
      if (residentFetch) {
        const { edges, pageInfo } = residentFetch.allResidents

        setResidents({
          data: [...residents.data, ...edges],
          hasMore: pageInfo.hasNextPage,
          endCursor: pageInfo.endCursor,
        })
      }
      /**
       * Handle an alumniFetch update
       */
      if (alumniFetch) {
        const { edges, pageInfo } = alumniFetch.allResidents

        setAlumni({
          data: [...alumni.data, ...edges],
          hasMore: pageInfo.hasNextPage,
          endCursor: pageInfo.endCursor,
        })
      }
      /**
       * Handle a guestFetch update
       */
      if (guestFetch) {
        const { edges, pageInfo } = guestFetch.allResidents

        setGuests({
          data: [...guests.data, ...edges],
          hasMore: pageInfo.hasNextPage,
          endCursor: pageInfo.endCursor,
        })
      }
    }
    processFetchedResidentsData()
  }, [residentFetch, alumniFetch, guestFetch])

  return (
    <main className="black-bg-page">
      <Helmet defer={false}>
        <title>{`Residents | ${title} | Ears to the concrete.`}</title>
        <meta
          property="og:title"
          content={`Residents | ${title} | Ears to the concrete.`}
        />
        <meta property="og:url" content={`${siteUrl}/residents/`} />
        <meta
          name="twitter:title"
          content={`Residents | ${title} | Ears to the concrete.`}
        />
      </Helmet>

      <header className="container is-fluid">
        <div className="columns is-mobile">
          <div className="column is-full content">
            <h1 className="title is-size-3-desktop is-size-5-touch">
              Halfmoon Residents
            </h1>
          </div>
        </div>
      </header>

      <section className="container is-fluid">
        <div className="columns is-mobile is-variable is-2">
          {/* RESIDENT TYPE SELECTOR BUTTONS */}
          {categoryLabels?.map((category, index) => (
            <Fragment key={`HMBK-${category}-${index}`}>
              {/* DESKTOP SIZED BUTTONS */}
              <div className="column is-hidden-mobile">
                <button
                  className={
                    isOpen === category
                      ? 'button is-fullwidth is-outlined is-rounded is-focused'
                      : 'button is-fullwidth is-outlined is-rounded'
                  }
                  id={category}
                  onClick={() => toggleColumn(category, isOpen, setIsOpen)}
                >
                  {category}
                </button>
              </div>
              {/* TOUCH SIZED BUTTONS */}
              <div className="column is-hidden-tablet">
                <button
                  className={
                    isOpen === category
                      ? 'button is-small is-fullwidth is-outlined is-rounded is-focused'
                      : 'button is-small is-fullwidth is-outlined is-rounded'
                  }
                  id={category}
                  onClick={() => toggleColumn(category, isOpen, setIsOpen)}
                >
                  {category}
                </button>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="section container is-fluid media-cards">
        {/* CURRENT HMBK RESIDENTS */}
        {isOpen === 'Residents' ? (
          <>
            <div className="columns is-mobile is-multiline">
              {residents?.data?.map(({ node }, index) => (
                <SingleResidentCard key={`Resident-${index}`} resident={node} />
              ))}
            </div>

            <LandingPageFetchAndLoading
              hasMore={residents.hasMore}
              currentlyFetching={resLoad}
              fetchMoreFunc={fetchMoreResidents}
              fetchMoreBtnTxt={'More Residents'}
            />
          </>
        ) : null}

        {/* HMBK ALUMNI */}
        {isOpen === 'Alumni' ? (
          <>
            <div className="columns is-mobile is-multiline">
              {alumni?.data?.map(({ node }, index) => (
                <SingleResidentCard key={`Alumnus-${index}`} resident={node} />
              ))}
            </div>
            <LandingPageFetchAndLoading
              hasMore={alumni.hasMore}
              currentlyFetching={alumLoad}
              fetchMoreFunc={fetchMoreAlumni}
              fetchMoreBtnTxt={'More Alumni'}
            />
          </>
        ) : null}

        {/* HMBK GUESTS */}
        {isOpen === 'Guests' ? (
          <>
            <div className="columns is-mobile is-multiline">
              {guests?.data?.map(({ node }, index) => (
                <SingleResidentCard key={`Guests-${index}`} resident={node} />
              ))}
            </div>
            <LandingPageFetchAndLoading
              hasMore={guests.hasMore}
              currentlyFetching={guestLoad}
              fetchMoreFunc={fetchMoreGuests}
              fetchMoreBtnTxt={'More Guests'}
            />
          </>
        ) : null}
      </section>
    </main>
  )
}

export const query = graphql`
  query ResidentIndexPage($first: Int = 12) {
    prismic {
      residents: allResidents(
        sortBy: resident_name_ASC
        where: { resident_status: "Resident" }
        first: $first
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
      # alumni: allResidents(
      #   sortBy: resident_name_ASC
      #   where: { resident_status: "Alumnus" }
      #   first: $first
      # ) {
      #   edges {
      #     node {
      #       _meta {
      #         uid
      #         type
      #       }
      #       resident_name
      #       resident_image
      #     }
      #   }
      #   totalCount
      #   pageInfo {
      #     hasNextPage
      #     endCursor
      #   }
      # }
      guests: allResidents(
        sortBy: resident_name_ASC
        where: { resident_status: "Guest" }
        first: $first
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
  }
`

export default ResidentsIndex
