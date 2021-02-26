import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import {
  ResidentBio,
  SingleMixCard,
  SingleEventCard,
  SingleFeatureCard,
} from '../components'
import {
  mixDateSort,
  eventDateSort,
  featureDateSort,
  mappableDataFilter,
} from '../utils'
import { Helmet } from 'react-helmet'
import useSiteMetadata from '../components/SiteMetadata'
import { RichText } from 'prismic-reactjs'

/**
 * @category Templates
 * @function ResidentTemplate
 * @param {object} data - Prismic CMS data object containing all data needed to build `/residents/:uid`
 * @param {object} path - the :uid of `/residents/:uid`; passed to {@link SingleMixCard} so that it can be used by {@link getResidentLink} to compare to the `featured_residents` _meta data
 * @returns {jsx}
 */
function ResidentTemplate({ data, path }) {
  const [isOpen, setIsOpen] = useState('Mixes')
  const [categoryLabels, setCategoryLabels] = useState(null)
  const [resBio, setResBio] = useState(null)

  const [resMixes, setResMixes] = useState(null)
  const [resEvents, setResEvents] = useState(null)
  const [resFeatures, setResFeatures] = useState(null)

  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()

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
         * If both are truthy, set that category's data with the data array containing ALL of the associated group data with it at once.
         *
         * NB: The 20 data object limit doesn't apply here since there's only ONE `resident_{category}` array, NOT individual nodes under edges array! Proven by adding 24 events to group field on dev entry and getting them all in template query.
         */

        const buildQueryMixes = mixes.edges[0].node.resident_mixes
        const buildQueryEvents = events.edges[0].node.resident_events
        const buildQueryFeatures = features.edges[0].node.resident_features

        const mixCheck = mappableDataFilter(buildQueryMixes)
        const eventCheck = mappableDataFilter(buildQueryEvents)
        const featureCheck = mappableDataFilter(buildQueryFeatures)

        /**
         * Mixes, events and features come in unsorted as they're queried off a content relation. Sort using these field for these categories:
         * - Mix: resident_mix.mix_date
         * - Event: resident_event.event_start
         * - Feature: resident_feature._meta.firstPublicationDate
         * Convert these fields to Dates with {@link formatDateTime} and sort from most recent to least
         * Passing only the mix_date string to {@link formatDateTime} parses it into a Date object
         */

        /**
         * Mix data set processing and label push
         */
        if (mixCheck) {
          const dateSortedMixes = mixDateSort(mixCheck)
          setResMixes(dateSortedMixes)
          labels.push('Mixes')
        }

        /**
         * Event data set processing and label push
         */
        if (eventCheck) {
          const dateSortedEvents = eventDateSort(eventCheck)
          setResEvents(dateSortedEvents)
          labels.push('Events')
        }
        /**
         * Feature data set processing and label push
         */
        if (featureCheck) {
          const dateSortedFeatures = featureDateSort(featureCheck)
          setResFeatures(dateSortedFeatures)
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
   * Toggles the column selected based on the id of clicked/selected category
   */
  function toggleCateogry(event) {
    if (isOpen !== event.currentTarget.id) {
      setIsOpen(event.currentTarget.id)
    }
  }

  const smallCardLayout =
    'column is-12-mobile is-6-tablet is-4- is-4-widescreen'
  const largeCardLayout = 'column is-6 is-4-widescreen'

  return (
    <main className="full-height-page">
    <Helmet defer={false}>
      <html lang="en" />
        {resBio?.resident_name && <title>HalfMoon feat. {resBio.resident_name}</title> }
        {resBio?.resident_blurb && <meta name="description" content={RichText.asText(resBio.resident_blurb)} /> }
        <meta name="theme-color" content="#f600ff" />
        <meta property="og:type" content="business.business" />
        {resBio?.resident_name && <meta property="og:title" content={`HalfMoon feat. ${resBio.resident_name}`} /> }
        <meta property="og:url" content={`${siteUrl}${path}`} />
        {resBio?.resident_image && resBio?.resident_image?.url && <meta
          property="og:image"
          content={resBio.resident_image.url}
        /> }
        <meta name="twitter:card" content="summary" />
        {resBio?.resident_name && <meta name="twitter:title" content={`HalfMoon feat. ${resBio.resident_name}`} /> }
        {resBio?.resident_blurb && <meta name="twitter:description" content={RichText.asText(resBio.resident_blurb)} /> }
        <meta name="twitter:site" content={twitterUsername} />
        {resBio?.social_media?.find( elem => elem.resident_social_page === "Twitter") &&  <meta name="twitter:creator" content={resBio?.social_media?.find( elem => elem.resident_social_page === "Twitter")?.resident_social_link?.url ?? siteUrl} /> }
        {resBio?.resident_image && resBio?.resident_image?.url && <meta name="twitter:image" content={resBio.resident_image.url} /> }
    </Helmet>
      <div className="container is-fluid">
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
                      onClick={toggleCateogry}
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
                      onClick={toggleCateogry}
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
                {resMixes?.map(({ resident_mix }, index) => (
                  <SingleMixCard
                    key={`resident-mix-#${index}`}
                    mixData={resident_mix}
                    columnLayout={smallCardLayout}
                  />
                ))}
              </div>
            ) : null}

            {/* RESIDENT EVENTS */}
            {isOpen === 'Events' ? (
              <div className="columns is-mobile is-multiline">
                {resEvents?.map(({ resident_event }, index) => (
                  <SingleEventCard
                    key={`resident-event-#${index}`}
                    eventData={resident_event}
                    eventColumnLayout={smallCardLayout}
                  />
                ))}
              </div>
            ) : null}

            {/* RESIDENT FEATURES */}
            {isOpen === 'Features' ? (
              <div className="columns is-mobile is-multiline">
                {resFeatures?.map(({ resident_feature }, index) => (
                  <SingleFeatureCard
                    key={`resident-feature-${index}`}
                    featureData={resident_feature}
                    featureColumnLayout={largeCardLayout}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
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
                  _meta {
                    uid
                    type
                    firstPublicationDate
                    lastPublicationDate
                  }
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
                  _meta {
                    uid
                    type
                  }
                  event_name
                  event_start
                  event_end
                  event_blurb
                  event_location
                  main_event_image
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
