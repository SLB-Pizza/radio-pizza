import React, { useEffect, useState, useRef } from 'react'
import { getCursorFromDocumentIndex } from '@prismicio/gatsby-source-prismic-graphql'
import { Link, graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import {
  TopicPageHero,
  TopicPageHighlightSection,
  SingleEventCard,
} from '../../components'
import { linkResolver } from '../../utils'

/**
 * @category Pages
 * @subcategory Indexes
 * @function EventsIndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function EventsIndexPage({ data, prismic }) {
  const prismicContent = data.prismic.allEvents.edges
  if (!prismicContent) return null

  // Initial useState is first query results
  // loadNextEvents calls trigger the loadMoreEvents useEffect and add to mixesData
  const [eventsData, setEventsData] = useState(prismicContent)

  // for loadMoreMixes useEffect and loadNextEvents function
  const eventsPerPage = 12
  const didMountRef = useRef(false)
  const [page, setPage] = useState(-1)
  const [hasMoreEvents, setHasMoreEvents] = useState(true)

  // The onClick function called when the
  const loadNextEvents = () => setPage(page => page + eventsPerPage)

  useEffect(() => {
    const loadMoreEvents = () => {
      if (!didMountRef.current) {
        didMountRef.current = true
        return
      }

      // Grab the next 12 events
      prismic
        .load({ variables: { after: getCursorFromDocumentIndex(page) } })
        .then(res => {
          setEventsData([...eventsData, ...res.data.allEvents.edges])

          if (!res.data.allEvents.pageInfo.hasNextPage) {
            setHasMoreEvents(false)
          }
        })
    }

    return loadMoreEvents()
  }, [page])

  // const leadEventData = {
  //   linkDetails: main_feature_article._meta,
  //   leadTopicTitle: title,
  //   leadTopicSubtitle: subtitle,
  //   leadTopicCategory: category,
  //   leadTopicSubcategory: subcategory,
  // };

  // Column layout for SingleEventCard
  const eventPageLayout = 'column is-12-mobile is-6-tablet is-4-desktop'

  return (
    <main className="full-height-page" id="events-header">
      {/* <TopicPageHero leadTopicData={} leadTopicBG={} topicPageTitling={} /> */}

      <div className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-full content">
            <h1 className="title">Halfmoon Events</h1>
          </div>
          {eventsData.length &&
            eventsData.map(({ node }, index) => (
              <SingleEventCard
                key={`halfmoon-event-${index}`}
                eventData={node}
                eventColumnLayout={eventPageLayout}
              />
            ))}
        </div>
        {hasMoreEvents ? (
          <div className="columns is-mobile">
            <div className="column">
              <button
                className="button is-fullwidth is-outlined is-rounded"
                onClick={loadNextEvents}
              >
                More Events!
              </button>
            </div>
            <div className="column is-narrow">
              <a href="#events-header">
                <button className="button is-fullwidth is-outlined is-rounded">
                  Top
                </button>
              </a>
            </div>
          </div>
        ) : (
          <div className="columns is-mobile">
            <div className="column is-offset-10 is-2">
              <a href="#events-header">
                <button className="button is-fullwidth is-outlined is-rounded">
                  Top
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`
