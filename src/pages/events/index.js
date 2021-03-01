import React, { useEffect, useState, useRef } from 'react'
import { getCursorFromDocumentIndex } from '@prismicio/gatsby-source-prismic-graphql'
import { graphql } from 'gatsby'
import { HMBKDivider, SingleEventCard } from '../../components'

/**
 * Layout for the /events landing page.
 * @category Pages
 * @function EventsIndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 * @param {Object} prismic - the data object containing Prismic follow up functions
 */
function EventsIndexPage({ data, prismic }) {
  const prismicContent = data.prismic.allEvents
  if (!prismicContent) return null

  // Initial useState is first query results
  // loadNextEvents calls trigger the loadMoreEvents useEffect and add to mixesData

  const eventsPerPage = 12
  const didMountRef = useRef(false)
  const [page, setPage] = useState(-1)

  const [eventsData, setEventsData] = useState({
    data: prismicContent.edges,
    hasMore: prismicContent.pageInfo.hasNextPage,
  })
  const [eventsLoading, setEventsLoading] = useState(false)

  /**
   * Changes `eventLoading` to true to render {@link HMBKDivider}, and the `page` value, triggering {@link loadMoreEvents}.
   * @category Fetch Trigger
   * @function loadNextEvents
   */
  const loadNextEvents = () => {
    setEventsLoading(true)
    setPage(page => page + eventsPerPage)
  }

  /**
   * useEffect that fires off a Prismic fetch when the 'More Events' button is clicked in {@link AllMixesLayout} on {@link MixesIndexPage}.
   * Use the  function to call the useEffect.. Adds mixes from Prismic fetch to mixesToMap data array and updates hasMore and endCursor values.
   * @category useEffect
   * @name loadMoreEvents
   */
  useEffect(() => {
    const loadMoreEvents = () => {
      if (!didMountRef.current) {
        didMountRef.current = true
        return
      }

      // Grab the next 12 events
      prismic
        .load({
          variables: {
            after: getCursorFromDocumentIndex(page),
          },
        })
        .then(res => {
          setEventsLoading(false)

          setEventsData({
            data: [...eventsData.data, ...res.data.allEvents.edges],
            hasMore: res.data.allEvents.pageInfo.hasNextPage,
          })
        })
    }

    return loadMoreEvents()
  }, [page])

  // Column layout for SingleEventCard
  const eventPageLayout = 'column is-12-mobile is-6-tablet is-4-desktop'

  return (
    <main className="black-bg-page" id="events-header">
      <header className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-full content">
            <h1 className="title">Halfmoon Events</h1>
          </div>

          {/* MAPPING EVENT DATA TO CARDS */}
          {eventsData?.data.map(({ node }, index) => (
            <SingleEventCard
              key={`halfmoon-event-${index}`}
              eventData={node}
              eventColumnLayout={eventPageLayout}
            />
          ))}
        </div>
      </header>

      <section className="section container is-fluid media-cards">
        {/* TERNARY TO RENDER FETCH MORE BUTTONS */}
        {eventsData.hasMore ? (
          <div className="columns is-mobile is-vcentered">
            {!eventsLoading ? (
              <div className="column">
                <button
                  className="button is-fullwidth is-outlined is-rounded"
                  onClick={loadNextEvents}
                >
                  More Events!
                </button>
              </div>
            ) : (
              <HMBKDivider forLoading={true} />
            )}
            <div className="column is-narrow">
              <a href="#events-header">
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
              <a href="#events-header">
                <button className="button is-fullwidth is-outlined is-rounded">
                  Top
                </button>
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default EventsIndexPage

export const query = graphql`
  query EventsIndexQuery(
    $first: Int = 12
    $last: Int
    $after: String
    $before: String
  ) {
    prismic {
      allEvents(
        sortBy: event_start_DESC
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            _meta {
              uid
              type
            }
            event_blurb
            main_event_image
            event_name
            event_end
            event_start
            event_location
          }
        }
      }
    }
  }
`
