import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import NanoClamp from 'nanoclamp'
import {
  ResidentBio,
  SingleMixCard,
  SingleEventCard,
  SingleFeatureCard,
} from '../components'
import { formatDateTime, mappableDataFilter } from '../utils'

/**
 * @category Templates
 * @function ResidentTemplate
 * @param {object} data - Prismic CMS data object containing all data needed to build `/residents/:uid`
 * @param {object} path - the :uid of `/residents/:uid`; passed to {@link SingleMixCard} so that it can be used by {@link getResidentLink} to compare to the `featured_residents` _meta data
 * @returns {jsx}
 */
function ResidentTemplate({ data }) {
  const [isOpen, setIsOpen] = useState('Mixes')
  const [categoryLabels, setCategoryLabels] = useState(null)
  const [resBio, setResBio] = useState(null)

  const [resMixes, setResMixes] = useState({
    data: null,
    hasMore: null,
    endCursor: null,
  })
  const [resEvents, setResEvents] = useState({
    data: null,
    hasMore: null,
    endCursor: null,
  })
  const [resFeatures, setResFeatures] = useState({
    data: null,
    hasMore: null,
    endCursor: null,
  })

  const prismicContent = data.prismic
  if (!prismicContent) return null

  /**
   * When Gatsby receives the Prismic data, perform a {@link mappableDataFilter} on the Resident's data object to determine which selection columns should be displayed to avoid having empty categories displayed.
   */
  useEffect(() => {
    /**
     * /resident/uid mappableDataCheck steps:
     * 1. Destructure prismicContent.
     * 2. Set resBio using single bio node-object
     * 3. Extract relevant data arrays from each subdata object
     * 4. Do mappableDataFilters on mixes, features, events
     * 5. If a data set passes, sort the data set
     * - mixes: by mix date, descending
     * - events: by event start, descending
     * - feature: by first publication date, descending
     * 6. Set the correct useState
     * - data: use the sorted data set
     * - hasMore: off pageInfo sub object
     * - endCursor: off pageInfo sub object
     * 7. add data type string to labels array
     * 8. Set categoryLabels
     */

    const mappableDataCheck = () => {
      let labels = []

      if (data) {
        console.table(prismicContent)
        const { bio, mixes, features, events } = prismicContent
        /**
         * Set prismicContent's single bio node-object to resBio
         */
        setResBio(bio.edges[0].node)

        /**
         * For each of the mix, event and feature data sets, we need to extract the pertinent data array from their query data object.
         *
         * We can then check mappability of each of the array's data nodes with {@link mappableDataFilter}
         *
         * If both are truthy, set categoryData with object having these keys:
         * - data: the data array from Gatsby containing the first 12 entries of that category
         * - hasMore: boolean dictating whether there are more entries that can be fetched
         * - endCursor: starting point for the next fetch of 12 category entries
         * Finally push a label for that category to the labels array; setCategoryLabels at end of function
         *
         */

        const buildQueryMixes = mixes.edges[0].node.resident_mixes
        const buildQueryEvents = events.edges[0].node.resident_events
        const buildQueryFeatures = features.edges[0].node.resident_features

        const mixCheck = mappableDataFilter(buildQueryMixes)
        const eventCheck = mappableDataFilter(buildQueryEvents)
        const featureCheck = mappableDataFilter(buildQueryFeatures)

        /**
         * Mix data set processing and label push
         */
        if (mixCheck) {
          /**
           * Mixes come in unsorted as they're queried off a content relation
           * Convert the mix_date fields to Dates with {@link formatDateTime} and sort from most recent to least
           * Passing only the mix_date string to {@link formatDateTime} parses it into a Date object
           */
          const dateSortedMixes = mixDateSort(mixCheck)

          setResMixes({
            data: dateSortedMixes,
            hasMore: mixes.pageInfo.hasNextPage,
            endCursor: mixes.pageInfo.endCursor,
          })
          labels.push('Mixes')
        }

        /**
         * Event data set processing and label push
         */
        if (eventCheck) {
          const dateSortedEvents = eventDateSort(eventCheck)

          setResEvents({
            data: dateSortedEvents,
            hasMore: events.pageInfo.hasNextPage,
            endCursor: events.pageInfo.endCursor,
          })
          labels.push('Events')
        }
        /**
         * Feature data set processing and label push
         */
        if (featureCheck) {
          const dateSortedFeatures = featureDateSort(featureCheck)

          setResFeatures({
            data: dateSortedFeatures,
            hasMore: features.pageInfo.hasNextPage,
            endCursor: features.pageInfo.endCursor,
          })
          labels.push('Features')
        }
        /**
         * Set categoryLabels to all the categories in the array.
         * - If none, is ok: defaults to null; won't render
         * - Else, maps through available ones
         */
        setCategoryLabels(labels)
      }
    }
    return mappableDataCheck()
  }, [data])

  /**
   * Helper functions
   * Called by mappableDataCheck useEffect()
   */

  const mixDateSort = mixesData =>
    mixesData.sort(
      (a, b) =>
        formatDateTime(b.resident_mix.mix_date) -
        formatDateTime(a.resident_mix.mix_date)
    )

  const eventDateSort = eventsData =>
    eventsData.sort(
      (a, b) =>
        formatDateTime(b.resident_event.event_start) -
        formatDateTime(a.resident_event.event_start)
    )

  const featureDateSort = featuresData =>
    featuresData.sort(
      (a, b) =>
        formatDateTime(b.resident_feature._meta.firstPublicationDate) -
        formatDateTime(a.resident_feature._meta.firstPublicationDate)
    )

  function toggleColumn(event) {
    if (isOpen !== event.currentTarget.id) {
      setIsOpen(event.currentTarget.id)
    }
  }

  const residentCardLayout = 'column is-12-mobile is-6-tablet is-4-widescreen'

  return (
    <div className="container is-fluid full-height-page">
      <div className="columns is-multiline">
        {resBio && <ResidentBio residentBioData={resBio} />}

        {/* TABLET, DESKTOP CONTENT SELECTOR BUTTONS */}
        <div className="column is-8-tablet is-9-desktop resident-content">
          <div className="columns is-mobile selector is-hidden-mobile">
            {categoryLabels?.map((type, index) => (
              <Fragment key={`HMBK-${type}-category-${index}`}>
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

          {/* RESIDENT MIXES */}
          {isOpen === 'Mixes' ? (
            <div className="columns is-mobile is-multiline">
              {resMixes && <pre>Mixes {JSON.stringify(resMixes, null, 2)}</pre>}
              {/* {resMixes?.data?.map(({ resident_mix }, index) => (
                <SingleMixCard
                  key={`resident-mix-#${index}`}
                  mixData={resident_mix}
                  columnLayout={residentCardLayout}
                />
              ))} */}
            </div>
          ) : null}

          {/* RESIDENT EVENTS */}
          {isOpen === 'Events' ? (
            <div className="columns is-mobile is-multiline">
              {resEvents && (
                <pre>Events {JSON.stringify(resEvents, null, 2)}</pre>
              )}
              {/* {resEvents?.data?.map(({ event }, index) => (
                <SingleEventCard
                  key={`resident-event-#${index}`}
                  eventData={event}
                  columnLayout={residentCardLayout}
                />
              ))} */}
            </div>
          ) : null}

          {/* RESIDENT FEATURES */}
          {isOpen === 'Features' ? (
            <div className="columns is-mobile is-multiline">
              {resFeatures && (
                <pre>Features {JSON.stringify(resFeatures, null, 2)}</pre>
              )}
              {/* {resFeatures?.data?.map(({ node }, index) => (
                <SingleFeatureCard
                  key={`resident-feature-${index}`}
                  featureData={node}
                  featureColumnLayout={residentCardLayout}
                />
              ))} */}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

ResidentTemplate.propTypes = {
  data: PropTypes.shape({
    prismic: PropTypes.shape({
      allResidents: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }),
}

export const query = graphql`
  query ResidentTemplateQuery($uid: String) {
    prismic {
      bio: allResidents(uid: $uid) {
        edges {
          node {
            resident_image
            resident_name
            resident_status
            resident_blurb
            social_media {
              resident_social_page
              resident_social_link {
                ... on PRISMIC__ExternalLink {
                  target
                  _linkType
                  url
                }
              }
            }
          }
        }
      }
      mixes: allResidents(uid: $uid, first: 6) {
        edges {
          node {
            resident_mixes {
              resident_mix {
                ... on PRISMIC_Mix {
                  _meta {
                    tags
                    uid
                    type
                  }
                  mix_image
                  mix_title
                  mix_link
                  mix_date
                  featured_residents {
                    mix_resident {
                      ... on PRISMIC_Resident {
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
      features: allResidents(uid: $uid, first: 2) {
        edges {
          node {
            resident_features {
              resident_feature {
                ... on PRISMIC_Feature {
                  headline_block {
                    ... on PRISMIC_FeatureHeadline_blockHeadline_block {
                      primary {
                        article_headline_img
                        article_headline
                        article_subtitle
                        article_subcategory
                      }
                    }
                  }
                  _meta {
                    uid
                    type
                    firstPublicationDate
                    lastPublicationDate
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
      events: allResidents(uid: $uid, first: 4) {
        edges {
          node {
            resident_events {
              resident_event {
                ... on PRISMIC_Event {
                  main_event_image
                  event_name
                  _meta {
                    uid
                    type
                  }
                  event_start
                  event_end
                  event_blurb
                }
              }
            }
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

export default ResidentTemplate
