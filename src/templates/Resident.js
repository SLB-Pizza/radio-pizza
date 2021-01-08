import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import NanoClamp from 'nanoclamp'
import { ResidentBio, SingleMixCard } from '../components'
import { formatDateTime, mappableDataFilter } from '../utils'

/**
 * @category Templates
 * @subcategory Resident
 * @function ResidentTemplate
 * @param {object} data - Prismic CMS data object containing all data needed to build `/residents/:uid`
 * @param {object} path - the :uid of `/residents/:uid`; passed to {@link SingleMixCard} so that it can be used by {@link getResidentLink} to compare to the `featured_residents` _meta data
 * @returns {jsx}
 */
function ResidentTemplate({ data }) {
  const [isOpen, setIsOpen] = useState('Mixes')
  const [hasMixes, setHasMixes] = useState(false)
  const [mixesData, setMixesData] = useState([])
  const [hasEvents, setHasEvents] = useState(false)
  const [eventsData, setEventsData] = useState([])
  const [hasFeatures, setHasFeatures] = useState(false)
  const [featuresData, setFeaturesData] = useState([])

  const prismicContent = data.prismic.allResidents.edges[0]
  if (!prismicContent) return null
  const residentData = prismicContent.node

  const {
    resident_mixes,
    resident_features,
    resident_events,
    ...rest
  } = residentData

  const residentCardLayout = 'column is-12-mobile is-6-tablet is-4-widescreen'

  function toggleColumn(event) {
    if (isOpen !== event.currentTarget.id) {
      setIsOpen(event.currentTarget.id)
    }
  }

  /**
   * When Gatsby receives the Prismic data, perform a {@link mappableDataFilter} on the Resident's data object to determine which selection columns should be displayed to avoid having empty categories displayed.
   */
  useEffect(() => {
    const dataCheck = () => {
      if (data) {
        const filteredMixes = mappableDataFilter(resident_mixes)
        const filteredEvents = mappableDataFilter(resident_events)
        const filteredFeatures = mappableDataFilter(resident_features)
        if (filteredMixes) {
          /**
           * Convert the mix_date fields to Dates with {@link formatDateTime} and sort from most recent to least
           * Passing only the mix_date string to {@link formatDateTime} parses it into a Date object
           */
          filteredMixes.sort((a, b) => {
            return (
              formatDateTime(b.resident_mix.mix_date) -
              formatDateTime(a.resident_mix.mix_date)
            )
          })
          setMixesData(filteredMixes)
          setHasMixes(true)
        }
        if (filteredEvents) {
          setEventsData(filteredEvents)
          setHasEvents(true)
        }
        if (filteredFeatures) {
          setFeaturesData(filteredFeatures)
          setHasFeatures(true)
        }
      }
    }
    return dataCheck()
  }, [data])

  return (
    <div className="container is-fluid full-height-page">
      <div className="columns is-multiline">
        <ResidentBio residentBioData={rest} />
        {/* RESIDENT MIX, EVENT, FEATURE SECTION */}
        <div className="column is-8-tablet is-9-desktop resident-content">
          {/* TABLET, DESKTOP CONTENT SELECTOR BUTTONS */}
          <div className="columns is-mobile selector is-hidden-mobile">
            {hasMixes ? (
              <div className="column">
                {/* TABLET */}
                <button
                  className={
                    isOpen === 'Mixes'
                      ? 'button active is-fullwidth is-outlined is-rounded display-text'
                      : 'button is-fullwidth is-outlined is-rounded display-text'
                  }
                  id="Mixes"
                  onClick={toggleColumn}
                >
                  Mixes
                </button>
              </div>
            ) : null}

            {hasEvents ? (
              <div className="column">
                <button
                  className={
                    isOpen === 'Events'
                      ? 'button active is-fullwidth is-outlined is-rounded display-text'
                      : 'button is-fullwidth is-outlined is-rounded display-text'
                  }
                  id="Events"
                  onClick={toggleColumn}
                >
                  Events
                </button>
              </div>
            ) : null}

            {hasFeatures ? (
              <div className="column">
                <button
                  className={
                    isOpen === 'Features'
                      ? 'button active is-fullwidth is-outlined is-rounded display-text'
                      : 'button is-fullwidth is-outlined is-rounded display-text'
                  }
                  id="Features"
                  onClick={toggleColumn}
                >
                  Features
                </button>
              </div>
            ) : null}
          </div>

          {/* MOBILE CONTENT SELECTOR BUTTONS */}
          <div className="columns is-mobile is-multiline selector is-hidden-tablet">
            <div className="column is-12">
              <NanoClamp
                className="title is-size-5"
                is="p"
                lines={2}
                text={rest.resident_name}
              />
            </div>
            {hasMixes ? (
              <div className="column">
                {/* TABLET */}
                <button
                  className={
                    isOpen === 'Mixes'
                      ? 'button is-small active is-fullwidth is-outlined is-rounded display-text'
                      : 'button is-small is-fullwidth is-outlined is-rounded display-text'
                  }
                  id="Mixes"
                  onClick={toggleColumn}
                >
                  Mixes
                </button>
              </div>
            ) : null}

            {hasEvents ? (
              <div className="column">
                <button
                  className={
                    isOpen === 'Events'
                      ? 'button is-small active is-fullwidth is-outlined is-rounded display-text'
                      : 'button is-small is-fullwidth is-outlined is-rounded display-text'
                  }
                  id="Events"
                  onClick={toggleColumn}
                >
                  Events
                </button>
              </div>
            ) : null}

            {hasFeatures ? (
              <div className="column">
                <button
                  className={
                    isOpen === 'Features'
                      ? 'button is-small active is-fullwidth is-outlined is-rounded display-text'
                      : 'button is-small is-fullwidth is-outlined is-rounded display-text'
                  }
                  id="Features"
                  onClick={toggleColumn}
                >
                  Features
                </button>
              </div>
            ) : null}
          </div>

          {/* RESIDENT MIXES */}
          {hasMixes && isOpen === 'Mixes' ? (
            <div className="columns is-mobile is-multiline">
              {mixesData.map(({ resident_mix }, index) => (
                <SingleMixCard
                  key={`resident-mix-#${index}`}
                  mixData={resident_mix}
                  columnLayout={residentCardLayout}
                />
              ))}
              {/* <pre>
                Resident Mixes {JSON.stringify(resident_mixes, null, 2)}
              </pre> */}
            </div>
          ) : null}

          {/* RESIDENT EVENTS */}
          {hasEvents && isOpen === 'Events' ? (
            <div className="columns is-mobile is-multiline">
              {eventsData.map(({ event }, index) => (
                <SingleEventCard
                  key={`resident-event-#${index}`}
                  eventData={event}
                  columnLayout={residentCardLayout}
                />
              ))}
              {/* <pre>{JSON.stringify(resident_events, null, 2)}</pre> */}
            </div>
          ) : null}

          {/* RESIDENT Features */}
          {hasFeatures && isOpen === 'Features' ? (
            <div className="columns is-mobile is-multiline">
              {featuresData.map((feature, index) => (
                <LandingPageElement
                  key={`resident-feature-#${index}`}
                  pageElement={feature}
                  imageAspectRatio="image is-16by9"
                  columnLayout="column is-6 landing-page-element"
                />
              ))}
              {/* <pre>{JSON.stringify(resident_features, null, 2)}</pre> */}
            </div>
          ) : null}

          <pre>All Resident Data {JSON.stringify(residentData, null, 2)}</pre>
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
      allResidents(uid: $uid) {
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
                    lastPublicationDate
                  }
                }
              }
            }
            resident_events {
              resident_event {
                ... on PRISMIC_Event {
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
`

export default ResidentTemplate

// Resident Template
// Resident Img sizes (square)
// --- MOBILE ---
// --- min-max avg:  461---
// --- mean:  403.33---
// 767  - 703

// 768  - 219
// 1023 - 304

// --- DESKTOP ---
// --- min-max avg:  453.5---
// --- mean:  417.67---
// 1024 - 304
// 1215 - 368

// 1216 - 368
// 1407 - 431

// 1408 - 432
// 1920 - 603

// Mix Img sizes (square)
// --- MOBILE ---
// --- min-max avg:  574---
// --- mean:  590.33---
// 767  - 695

// 768  - 453
// 1023 - 623

// --- DESKTOP ---
// --- min-max avg:  307.5---
// --- mean:  302.5---
// 1024 - 296
// 1215 - 360

// 1216 - 229
// 1407 - 272

// 1408 - 272
// 1920 - 386
