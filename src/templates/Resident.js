import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { RichText } from 'prismic-reactjs'
import {
  ResidentBio,
  SingleMixCard,
  SingleEventCard,
  SingleFeatureCard,
  useSiteMetadata,
} from '../components'
import {
  HMBKDivider,
  eventDateSort,
  featureDateSort,
  mappableDataFilter,
  mixDateSort,
  toggleColumn,
} from '../utils'

/**
 * @category Templates
 * @function ResidentTemplate
 * @param {Object} data - Prismic CMS data object containing all data needed to build `/residents/:uid`
 * @param {Object} path - the complete path of `/residents/:uid`; passed to {@link SingleMixCard} so that it can be used by {@link getResidentLink} to compare to the `featured_residents` _meta data
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
   *
   * `/resident/uid` setSingleResDataAndLabels steps:
   * 1. Destructure `prismicContent`.
   * 2. Set `resBio` using single `bio` node-object
   * 3. Extract relevant data arrays from each subdata object
   * 4. Run `mixes`, `features`, `events` arrays through {@link mappableDataFilter}
   * - If {@link mappableDataFilter} returns an array with data, use that array to set that category's value. The array will contain **ALL** of the associated group data with it at once.
   * - NB: The 20 data object limit doesn't apply here since there's only ONE `resident_{category}` array, NOT individual nodes under edges array! Proven by adding 24 events to group field on dev entry and getting them all in template query.
   * 5. If a data set returns array, sort the data sets with their corresponding date sort function:
   * - Mix: {@link mixDateSort}
   * - Event: {@link eventDateSort}
   * - Feature: {@link featureDateSort}
   * 6. Set the correct useState
   * - `data`: use the sorted data set
   * - `hasMore`: off `pageInfo` sub object
   * - `endCursor`: off `pageInfo` sub object
   * 7. add data type string to labels array
   * 8. Set `categoryLabels`
   * - If none, is ok: defaults to null; won't render
   * - Else, maps through available ones
   * @category useEffect
   * @name setSingleResDataAndLabels
   */
  useEffect(() => {
    const setSingleResDataAndLabels = () => {
      if (data) {
        let labels = []
        /**
         * Step 1
         */
        const { bio, mixes, features, events } = prismicContent

        /**
         * Step 2
         */
        setResBio(bio.edges[0].node)

        /**
         * Step 3
         */
        const buildQueryMixes = mixes.edges[0].node.resident_mixes
        const buildQueryEvents = events.edges[0].node.resident_events
        const buildQueryFeatures = features.edges[0].node.resident_features

        /**
         * Step 4
         */
        const mixCheck = mappableDataFilter(buildQueryMixes)
        const eventCheck = mappableDataFilter(buildQueryEvents)
        const featureCheck = mappableDataFilter(buildQueryFeatures)

        /**
         * Steps 5a, 6a, 7a
         */
        if (mixCheck) {
          const dateSortedMixes = mixDateSort(mixCheck)
          setResMixes(dateSortedMixes)
          labels.push('Mixes')
        }

        /**
         * Steps 5b, 6b, 7b
         */
        if (eventCheck) {
          const dateSortedEvents = eventDateSort(eventCheck)
          setResEvents(dateSortedEvents)
          labels.push('Events')
        }
        /**
         * Steps 5c, 6c, 7c
         */

        if (featureCheck) {
          const dateSortedFeatures = featureDateSort(featureCheck)
          setResFeatures(dateSortedFeatures)
          labels.push('Features')
        }
        /**
         * Step 8

         */
        setCategoryLabels(labels)
      }
    }
    return setSingleResDataAndLabels()
  }, [data])

  const smallCardLayout = 'column is-12-mobile is-6-tablet is-4-widescreen'
  const largeCardLayout = 'column is-6 is-4-widescreen'

  /**
   * Processing single resident data to pass to Helmet
   */
  const helmetResName = resBio?.resident_name
    ? resBio?.resident_name
    : `HMBK ${resBio?.resident_status}`
  const helmetDescription = resBio?.resident_blurb
    ? RichText.asText(resBio?.resident_blurb)
    : description

  return (
    <main className="full-height-page">
      <Helmet defer={false}>
        <title>{`${helmetResName} | ${title}`}</title>
        <meta name="description" content={helmetDescription} />
        <meta property="og:title" content={helmetResName} />
        <meta property="og:url" content={`${siteUrl}${path}`} />
        {resBio?.resident_image && resBio?.resident_image?.url && (
          <meta property="og:image" content={resBio.resident_image.url} />
        )}
        <meta name="og:description" content={helmetDescription} />
        {resBio?.resident_image && resBio?.resident_image?.url && (
          <meta property="og:image:type" content="image/webp" />
        )}
        <meta name="twitter:title" content={`${helmetResName} | ${title}`} />
        <meta name="twitter:description" content={helmetDescription} />
        {resBio?.social_media?.find(
          elem => elem.resident_social_page === 'Twitter'
        ) && (
          <meta
            name="twitter:creator"
            content={
              resBio?.social_media?.find(
                elem => elem.resident_social_page === 'Twitter'
              )?.resident_social_link?.url ?? siteUrl
            }
          />
        )}
        {resBio?.resident_image && resBio?.resident_image?.url && (
          <meta name="twitter:image" content={resBio.resident_image.url} />
        )}
      </Helmet>

      <div className="container is-fluid">
        <div className="columns is-multiline">
          {resBio && <ResidentBio residentBioData={resBio} />}

          {/* TABLET, DESKTOP CONTENT SELECTOR BUTTONS */}
          <div className="column is-8-tablet is-9-desktop resident-content">
            <div className="columns is-mobile selector is-hidden-mobile">
              {categoryLabels?.map((category, index) => (
                <Fragment key={`HMBK-${category}-category-${index}`}>
                  <div className="column is-hidden-mobile">
                    <button
                      className={
                        isOpen === category
                          ? 'button active is-fullwidth is-outlined is-rounded'
                          : 'button is-fullwidth is-outlined is-rounded'
                      }
                      id={category}
                      onClick={() => toggleColumn(category, isOpen, setIsOpen)}
                    >
                      {category}
                    </button>
                  </div>
                  <div className="column is-hidden-tablet">
                    <button
                      className={
                        isOpen === category
                          ? 'button is-small active is-fullwidth is-outlined is-rounded'
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

            {/* RESIDENT MIXES */}
            {isOpen === 'Mixes' ? (
              <div className="columns is-mobile is-multiline">
                {resMixes?.map(({ resident_mix }, index) => (
                  <SingleMixCard
                    key={`resident-mix-#${index}`}
                    data={resident_mix}
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
                    data={resident_event}
                    columnLayout={smallCardLayout}
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
                    data={resident_feature}
                    columnLayout={largeCardLayout}
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
                  header {
                    ... on PRISMIC_FeatureHeaderHeadline_block {
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
