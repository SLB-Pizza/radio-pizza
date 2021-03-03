import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { useLazyQuery } from '@apollo/client'
import { HMBKDivider, SingleResidentCard } from '../../components'
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
   * Use Apollo's useLazyQuery to allow for a query to run on button press.
   * One useLazyQuery per resident category
   * Each individual fetch update is fed to a useEffect
   * @see {@link https://www.apollographql.com/docs/react/data/queries/#executing-queries-manually Executing queries manually (useLazyQuery hook)}
   */
  const [
    getMoreResidents,
    { loading: resLoad, data: residentFetch },
  ] = useLazyQuery(GET_MORE_RESIDENTS)

  const [
    getMoreAlumni,
    { loading: alumLoad, data: alumniFetch },
  ] = useLazyQuery(GET_MORE_ALUMNI)

  const [
    getMoreGuests,
    { loading: guestLoad, data: guestFetch },
  ] = useLazyQuery(GET_MORE_GUESTS)

  /**
   * Don't render this component with having prismicContent
   */
  const prismicContent = data.prismic
  if (!prismicContent) return null

  useEffect(() => {
    /**
     * There are three categories of resident: resident, alumni, guests.
     * Use their totalCount from the Gatsby page query to see if they have data to render (as of writing there are ZERO "alumni" entries)
     * - data: the data array from Gatsby containing the first 12 entries of that category
     * - hasMore: boolean dictating whether there are more entries that can be fetched
     * - endCursor: starting point for the next fetch of 12 category entries
     */
    const setCategoryData = () => {
      /**
       * Collect the labels of all the resident categories that have entries
       * Set categoryName to categoryLabels
       * categoryLabels mapped to make the resident type selection buttons
       */
      let labels = []

      /**
       * Residents data check
       */
      if (prismicContent.residents.totalCount) {
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
      if (prismicContent.alumni.totalCount) {
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
      if (prismicContent.guests.totalCount) {
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

    return setCategoryData()
  }, [data])

  useEffect(() => {
    const processFetchedData = () => {
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

        setResidents({
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

        setResidents({
          data: [...guests.data, ...edges],
          hasMore: pageInfo.hasNextPage,
          endCursor: pageInfo.endCursor,
        })
      }
    }
    return processFetchedData()
  }, [residentFetch, alumniFetch, guestFetch])

  /**
   * Helper function that toggles the currently display resident category by using the clicked resident category's id
   */
  function toggleColumn(event) {
    if (isOpen !== event.currentTarget.id) {
      setIsOpen(event.currentTarget.id)
    }
  }

  return (
    <main className="black-bg-page">
      <header className="container is-fluid">
        <div className="columns is-mobile">
          <div className="column is-full content">
            <h1 className="title is-size-3-desktop is-size-5-touch">
              residents
            </h1>
          </div>
        </div>
      </header>

      <section className="container is-fluid">
        <div className="columns is-mobile is-variable is-2">
          {/* RESIDENT TYPE SELECTOR BUTTONS */}
          {categoryLabels?.map((type, index) => (
            <Fragment key={`HMBK-${type}-${index}`}>
              {/* DESKTOP SIZED BUTTONS */}
              <div className="column is-hidden-mobile">
                <button
                  className={
                    isOpen === type
                      ? 'button active is-fullwidth is-outlined is-rounded'
                      : 'button is-fullwidth is-outlined is-rounded'
                  }
                  id={type}
                  onClick={toggleColumn}
                >
                  {type}
                </button>
              </div>
              {/* TOUCH SIZED BUTTONS */}
              <div className="column is-hidden-tablet">
                <button
                  className={
                    isOpen === type
                      ? 'button is-small active is-fullwidth is-outlined is-rounded'
                      : 'button is-small is-fullwidth is-outlined is-rounded'
                  }
                  id={type}
                  onClick={toggleColumn}
                >
                  {type}
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
            {residents?.hasMore ? (
              <div className="columns is-mobile is-vcentered">
                {!resLoad ? (
                  <div className="column">
                    <button
                      className="button is-fullwidth is-outlined is-rounded"
                      onClick={() =>
                        getMoreResidents({
                          variables: { after: residents.endCursor },
                        })
                      }
                    >
                      More Residents!
                    </button>
                  </div>
                ) : (
                  <HMBKDivider forLoading={true} />
                )}
                <div className="column is-narrow">
                  <a href="#mixes-header">
                    <button className="button is-fullwidth is-outlined is-rounded">
                      Top
                    </button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="columns is-mobile is-vcentered">
                <HMBKDivider />
                <div className="column is-narrow">
                  <a href="#all-mixes">
                    <button className="button is-fullwidth is-outlined is-rounded">
                      Top
                    </button>
                  </a>
                </div>
              </div>
            )}
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
            {alumni?.hasMore ? (
              <div className="columns is-mobile">
                {!alumLoad ? (
                  <div className="column">
                    <button
                      className="button is-fullwidth is-outlined is-rounded"
                      onClick={() =>
                        getMoreAlumni({
                          variables: { after: alumni.endCursor },
                        })
                      }
                    >
                      More Alumni
                    </button>
                  </div>
                ) : (
                  <HMBKDivider />
                )}
                <div className="column is-narrow">
                  <a href="#mixes-header">
                    <button className="button is-fullwidth is-outlined is-rounded">
                      Top
                    </button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="columns is-mobile">
                <div className="column is-offset-10 is-2">
                  <a href="#all-mixes">
                    <button className="button is-fullwidth is-outlined is-rounded">
                      Top
                    </button>
                  </a>
                </div>
              </div>
            )}
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
            {guests?.hasMore ? (
              <div className="columns is-mobile">
                {!guestLoad ? (
                  <div className="column">
                    <button
                      className="button is-fullwidth is-outlined is-rounded"
                      onClick={() =>
                        getMoreGuests({
                          variables: { after: guests.endCursor },
                        })
                      }
                    >
                      More Guests
                    </button>
                  </div>
                ) : (
                  <HMBKDivider forLoading={true} />
                )}
                <div className="column is-narrow">
                  <a href="#mixes-header">
                    <button className="button is-fullwidth is-outlined is-rounded">
                      Top
                    </button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="columns is-mobile is-vcentered">
                <HMBKDivider />
                <div className="column is-narrow">
                  <a href="#all-mixes">
                    <button className="button is-fullwidth is-outlined is-rounded">
                      Top
                    </button>
                  </a>
                </div>
              </div>
            )}
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
      alumni: allResidents(
        sortBy: resident_name_ASC
        where: { resident_status: "Alumnus" }
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
