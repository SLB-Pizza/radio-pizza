import React, { useEffect, useState, useRef } from 'react'
import { getCursorFromDocumentIndex } from '@prismicio/gatsby-source-prismic-graphql'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  CuratedCollections,
  SingleMixCard,
  MixPlayOverlay,
  TopicPageHero,
  TopicPageHighlightSection,
} from '../../components/'
import { getResidentString, mappableDataFilter } from '../../utils'

/**
 * @category Pages
 * @function MixesIndexPage
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @param {Object} prismic - the data object containing Prismic follow up functions
 * @returns {jsx}
 */
function MixesIndexPage({ data, prismic }) {
  // Initial useState is first query results
  // loadNextMixes calls trigger the loadMoreMixes useEffect and add to mixesToMap
  const mixesHeaderData = data.prismic.allLandingpages.edges[0].node
  const otherMixesData = data.prismic.allMixs.edges
  if (!otherMixesData || !mixesHeaderData) return null

  const mixesPerPage = 12
  const didMountRef = useRef(false)
  const mixListLayout =
    'column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen'

  // for loadMoreMixes useEffect and loadNextMixes function
  const [page, setPage] = useState(-1)
  const [hasMoreMixes, setHasMoreMixes] = useState(true)
  const [mixHeroData, setMixHeroData] = useState(null)
  const [mixHighlightsData, setHighlightsData] = useState(null)
  const [mixesToMap, setMixesToMap] = useState(otherMixesData)

  /**
   * Set up /mixes props object for {@link TopicPageHero} and {@link TopicPageHighlightSection}
   */
  useEffect(() => {
    const processMixesHeaderData = () => {
      // objects to pass to useState after processing
      let heroData = {}
      let highlightsData = {}

      // Break down mixesHeaderData
      let {
        radio_page_header,
        radio_highlights_subheader,
        lead_radio_mix,
        highlight_mixes,
      } = mixesHeaderData

      const titling = radio_page_header ?? 'radio'
      const subheader = radio_highlights_subheader ?? 'select sounds'
      /**
       * lead_radio_mix is null
       * - Shift off the first mix from `mixesToMap` to use as lead_radio_mix
       */
      let allOtherMixes = mixesToMap
      if (!lead_radio_mix) {
        lead_radio_mix = allOtherMixes.shift()
      }

      // Break down lead_radio_mix
      const {
        _meta,
        mix_title,
        mix_blurb,
        mix_image,
        featured_residents,
      } = lead_radio_mix

      /**
       * Once lead_radio_mix exits we can set heroData's bg, titling and some of the data key-value pairs (ones independent of mix_title's existence)
       */

      heroData = {
        bg: mix_image,
        titling,
        data: {
          linkDetails: _meta,
          leadTopicCategory: 'mix',
        },
      }

      /**
       * mix_title exists
       *  linkTopicTitle : use mix_title
       *    if mix_blurb exists as well
       *      linkTopicSubtitle : use 1st paragraph of mix_blurb
       *      linkTopicCategory : format list of residents
       *    else
       *      linkTopicSubtitle : format list of residents
       *      linkTopicCategory : "mix" as set above
       */
      if (mix_title) {
        heroData.data.leadTopicTitle = mix_title

        if (mix_blurb) {
          heroData.data.leadTopicSubtitle = RichText.asText([mix_blurb[0]])
          heroData.data.leadTopicCategory = getResidentString(
            featured_residents
          )
        } else {
          heroData.data.leadTopicSubtitle = getResidentString(
            featured_residents
          )
        }
      } else {
        /**
         * mix_title === null
         *  linkTopicTitle    : format list of residents as mix_title
         *  linkTopicSubtitle : if mix_blurb, 1st paragraph of mix_blurb, else ""
         */
        heroData.data.leadTopicTitle = getResidentString(featured_residents)
        heroData.data.leadTopicSubtitle = mix_blurb
          ? RichText.asText([mix_blurb[0]])
          : ''
      }

      /**
       * Check highlight_mixes for mappability and return the first 3 mixes of the resulting array. These three are the ones that'll be mapped by {@link TopicPageHighlightSection}. The slice is necessary because Prismic doesn't allow the setting of a max number of group field items.
       */
      let checkedHighlights = mappableDataFilter(highlight_mixes).slice(0, 4)
      console.log(checkedHighlights)

      /**
       * Do an array length check; if there aren't three featured_mix objects in the array, shift from allOtherMixes to fill the gaps
       */
      if (checkedHighlights.length !== 4) {
        const difference = 4 - checkedHighlights.length

        for (let i = 1; i <= difference; i++) {
          const highlightMixToAdd = allOtherMixes.shift
          checkedHighlights.push(highlightMixToAdd)
        }
      }

      highlightsData = {
        titling: subheader,
        data: checkedHighlights,
      }

      // Set mixesHeroData using the mix_title processed heroData object
      // Set highlightsData using the 3 featured_mix objects
      // Set allOtherMixes in case lead_radio_mix was originally defined
      setMixHeroData(heroData)
      setHighlightsData(highlightsData)
      setMixesToMap(allOtherMixes)
    }
    return processMixesHeaderData()
  }, [data])

  /**
   * Fetch more mixes when the 'More Music' button is clicked.
   * Use the loadNextMixes function to call the useEffect.
   */
  const loadNextMixes = () => setPage(page => page + mixesPerPage)

  useEffect(() => {
    const loadMoreMixes = () => {
      if (!didMountRef.current) {
        didMountRef.current = true
        return
      }

      // Grab the next 12 mixes
      prismic
        .load({
          variables: {
            after: getCursorFromDocumentIndex(page),
          },
        })
        .then(res => {
          // Spread the received mix objects into the existing mixesToMap array
          setMixesToMap([...mixesToMap, ...res.data.allMixs.edges])
          // If there are no further mixes to get, don't show the load button
          // undefined for some reason
          // console.log(res);
          // if (!res.data.allMixs.pageInfo.hasNextPage) {
          //   setHasMoreMixes(false);
          // }
        })
    }

    return loadMoreMixes()
  }, [page])

  return (
    <main className="full-height-page">
      /* Show after mixHeroData is processed by useEffect */
      {/* {
      mixHeroData && (
        <TopicPageHero
          leadTopicData={mixHeroData.data}
          leadTopicBG={mixHeroData.bg}
          topicPageTitling={mixHeroData.titling}
        />
      )} */}
      {/* Show after mixHighlightsData is processed by useEffect */
      mixHighlightsData && (
        <TopicPageHighlightSection
          layoutType="mixes"
          highlightsData={mixHighlightsData.data}
          highlightTitling={mixHighlightsData.titling}
        />
      )}
      {/* <pre>{JSON.stringify(mixesHeaderData.highlight_mixes, null, 2)}</pre> */}
      {/* FIRST SECTION - Header Section */}
      {/* <header className="container is-fluid" id="mixes-header">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content">
            <h1 className="title is-3-desktop is-4-touch">Recent Mixes</h1>
            <p className="subtitle is-5-desktop is-6-touch">
              These dummy mixes are the same as the ones on the home page. You
              can hover/touch and play them the same way. Try it!
            </p>
          </div>
        </div>
      </header> */}
      {/*
          Inactive Search Bar!
          <div className="column is-9-widescreen is-8-tablet is-12-mobile">
            <div className="field">
              <div className="control is-expanded has-icons-left has-icons-right">
                <div className="control is-expanded has-icons-left has-icons-right is-loading is-medium">
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Search all mixes..."
                />
                <span className="icon is-left">
                  <Icon icon="search" />
                </span>
              </div>
            </div>
          </div>
          <div className="column is-3-widescreen is-4-tablet is-12-mobile">
            <div className="field">
              <div className="control is-expanded has-icons-left">
                <div className="select is-fullwidth is-rounded">
                  <select name="country">
                    <option value="">--Country--</option>
                    {dummyOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="icon is-left">
                  <Icon icon="tag" />
                </span>
              </div>
            </div>
          </div> */}
      <section className="section container is-fluid" id="all-mixes">
        <div className="columns is-mobile is-multiline">
          {/* All Mixs data in pulled correctly */}
          {mixesToMap.map(({ node }, index) => {
            return (
              <SingleMixCard
                key={`mixes-page-#${index}`}
                mixData={node}
                columnLayout={mixListLayout}
              />
            )
          })}
          {/* {mixesToMap.map(({ node }, index) => {
            return (
              <SingleMixCard
                key={`mixes-page-#${index}`}
                mixData={node}
                columnLayout={mixListLayout}
              />
            );
          })} */}
          <hr />
          {/* <pre>{JSON.stringify(mixesToMap, null, 2)}</pre> */}
        </div>
        {hasMoreMixes ? (
          <div className="columns is-mobile">
            <div className="column">
              <button
                className="button is-fullwidth is-outlined is-rounded"
                onClick={loadNextMixes}
              >
                More Music!
              </button>
            </div>
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
      </section>
    </main>
  )
}

export const query = graphql`
  query MixesIndexQuery(
    $first: Int = 12
    $last: Int
    $after: String
    $before: String
  ) {
    prismic {
      allMixs(
        sortBy: mix_date_DESC
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
              tags
            }
            mix_date
            mix_image
            mix_link
            mix_title
            featured_residents {
              mix_resident {
                ... on PRISMIC_Resident {
                  resident_name
                }
              }
            }
          }
        }
      }
      allLandingpages {
        edges {
          node {
            radio_page_header
            radio_highlights_subheader
            lead_radio_mix {
              ... on PRISMIC_Mix {
                _meta {
                  uid
                  type
                  tags
                }
                mix_date
                mix_image
                mix_link
                mix_title
                mix_blurb
                featured_residents {
                  mix_resident {
                    ... on PRISMIC_Resident {
                      resident_name
                    }
                  }
                }
              }
            }
            highlight_mixes {
              featured_mix {
                ... on PRISMIC_Mix {
                  _meta {
                    uid
                    type
                    tags
                  }
                  mix_date
                  mix_image
                  mix_link
                  mix_title
                  featured_residents {
                    mix_resident {
                      ... on PRISMIC_Resident {
                        resident_name
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

export default MixesIndexPage

// Mix img square sizes
// --- MOBILE ---
// --- CMS Size: 500
// --- min-max avg:  513.5---
// --- mean:  495.67---
// 767  - 695

// 768  - 332
// 1023 - 460

// --- DESKTOP ---
// --- min-max avg:  350---
// --- mean:  329.33---
// 1024 - 296
// 1215 - 360

// 1216 - 262
// 1407 - 310

// 1408 - 310
// 1920 - 438
