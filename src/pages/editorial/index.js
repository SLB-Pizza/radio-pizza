import React, { useEffect, useState, useRef } from 'react'
import { getCursorFromDocumentIndex } from '@prismicio/gatsby-source-prismic-graphql'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import {
  FeaturesHighlightItems,
  LandingPageFetchAndLoading,
  SingleFeatureCard,
  useSiteMetadata,
} from '../../components'
import {
  getHighlightEditorialUID,
  getUIDsFromDataArray,
  removeDuplicateFetchData,
} from '../../utils'
import PropTypes from 'prop-types'

/**
 * Layout for /features landing page.
 * @category Pages
 * @function EditorialIndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 * @param {Object} prismic - the data object containing Prismic follow up functions
 * @returns {jsx}
 */
export default function EditorialIndexPage({ data, prismic }) {
  const { title, siteUrl } = useSiteMetadata()
  const prismicContent = data.prismic
  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * @see {@link https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check Retrieve the document object}
   */
  if (!prismicContent) return null

  const firstEditorialFetch = prismicContent.allFeatures.edges
  /**
   * Focus the node for the otherFeaturesData check below.
   */
  const featuresPerPage = 12
  const didMountRef = useRef(false)
  const [page, setPage] = useState(-1)
  const [featuresHighlights, setHighlightEditorials] = useState(null)
  const [editorialUIDsToFilter, setEditorialsUIDsToFilter] = useState(null)
  const [featuresLoading, setFeaturesLoading] = useState(false)
  const [featuresToMap, setFeaturesToMap] = useState(firstEditorialFetch)
  // const [featuresToMap, setFeaturesToMap] = useState({
  //   data: prismicContent.allFeatures.edges,
  //   hasMore: prismicContent.allFeatures.hasNextPage,
  // });

  /**
   * Break down `prismicContent` to select `editorialHeaderData` for {@link FeaturesHighlightItems}.
   * IF `second_highlight_editorial` AND/OR `first_highlight_editorial` exists
   *    Filter out their UIDs
   * @category useEffect
   * @name processEditorialHeaderData
   */
  useEffect(() => {
    const processEditorialHeaderData = () => {
      let filteredEditorialData
      const highlightUIDs = []
      const highlightedFeatures = {}

      /**
       * Select and deconstruct `editorialHeaderData` for use.
       */
      const editorialHeaderData = prismicContent.allLandingpages.edges[0].node
      const {
        first_highlight_editorial,
        second_highlight_editorial,
      } = editorialHeaderData

      /**
       * Create an array to collect editorialHeaderData node to pass into {@link getHighlightEditorialUID}
       */
      if (first_highlight_editorial) {
        const firstUID = getHighlightEditorialUID(first_highlight_editorial)
        highlightUIDs.push(firstUID)
      }
      if (second_highlight_editorial) {
        const secondUID = getHighlightEditorialUID(second_highlight_editorial)
        highlightUIDs.push(secondUID)
      }

      /**
       * There should always be 2 highlight editorials.
       * IF highlight editorials contains 2 editorial objects
       *    Set the filter of highlight UIDs array
       *    - No splice of `featuresToMap` needed
       *    Filter out possible first fetch highlights from `featuresToMap`
       *    Set featuresToMap using filtered features
       *    Set highlightsEditorial data using both highlight editorials
       * ELSE IF it contains 1 highlight
       *    Set the filter using the single highlight UID
       *    Filter out possible first fetch highlights from `featuresToMap`
       *    Splice from the filteredEditorialData to fill second highlight slot
       * ELSE
       *    No highlights selected in CMS
       *    No filter needs to be set
       *    Splice two from `featuresToMap` to fill both highlight slots
       */
      const selectedHighlights = highlightUIDs.length
      if (selectedHighlights === 2) {
        setEditorialsUIDsToFilter(highlightUIDs)

        filteredEditorialData = removeDuplicateFetchData(
          featuresToMap,
          highlightUIDs
        )

        setFeaturesToMap({
          data: filteredEditorialData,
          hasMore: prismicContent.allFeatures.pageInfo.hasNextPage,
        })

        highlightedFeatures.leftFeature = first_highlight_editorial
        highlightedFeatures.secondFeature = second_highlight_editorial

        setHighlightEditorials(highlightedFeatures)
      } else if (selectedHighlights === 1) {
        setEditorialsUIDsToFilter(highlightUIDs)

        filteredEditorialData = removeDuplicateFetchData(
          featuresToMap,
          highlightUIDs
        )

        const fillSecondHighlight = filteredEditorialData.splice(0, 1)

        setFeaturesToMap({
          data: filteredEditorialData,
          hasMore: prismicContent.allFeatures.pageInfo.hasNextPage,
        })

        highlightedFeatures.leftFeature = first_highlight_editorial
        highlightedFeatures.rightFeature = fillSecondHighlight[0].node

        setHighlightEditorials(highlightedFeatures)
      } else {
        // ZERO CMS selected highlight editorials
        const twoMostRecentEditorials = featuresToMap.splice(0, 2)

        setFeaturesToMap({
          data: featuresToMap,
          hasMore: prismicContent.allFeatures.pageInfo.hasNextPage,
        })

        highlightedFeatures.leftFeature = twoMostRecentEditorials[0].node
        highlightedFeatures.rightFeature = twoMostRecentEditorials[1].node
        setHighlightEditorials(highlightedFeatures)
      }
    }
    processEditorialHeaderData()
  }, [])

  /**
   * Changes `eventLoading` to true to render {@link HMBKDivider}, and the `page` value, triggering {@link loadMoreEvents}.
   * @category Fetch Trigger
   * @function loadNextFeatures
   */
  const loadNextFeatures = () => {
    setFeaturesLoading(true)
    setPage(page => page + featuresPerPage)
  }

  /**
   * useEffect that fires off a Prismic fetch when the 'More Events' button is clicked and {@link loadNextFeatures} changes the `page` value. Adds events from Prismic fetch to `eventsToMap` data array and updates `pageInfo.hasMore` value.
   * @category useEffect
   * @name loadMoreFeatures
   */
  useEffect(() => {
    const loadMoreFeatures = () => {
      if (!didMountRef.current) {
        didMountRef.current = true
        return
      }

      /**
       * Grab the next 6 Features
       */
      prismic
        .load({
          variables: {
            first: 12, // matches page increase number and base query Int
            after: getCursorFromDocumentIndex(page),
          },
        })
        .then(res => {
          const fetchedEditorialData = res.data.allFeatures

          /**
           * IF there are editorial UIDs to filter out
           *    remove any possible duplicate editorials from the `fetchedEditorialData`
           * ELSE
           *    no UID filter set; which means no highlight editorials selected in CMS
           *    skip filter step and spread `fetchedEditorialData` edges arr into data
           */
          if (editorialUIDsToFilter) {
            const filteredFetchedEditorials = removeDuplicateFetchData(
              fetchedEditorialData.edges,
              editorialUIDsToFilter
            )

            setFeaturesToMap({
              data: [...featuresToMap.data, ...filteredFetchedEditorials],
              hasMore: fetchedEditorialData.pageInfo.hasNextPage,
            })
          } else {
            setFeaturesToMap({
              data: [...featuresToMap.data, ...fetchedEditorialData.edges],
              hasMore: fetchedEditorialData.pageInfo.hasNextPage,
            })
          }
          setFeaturesLoading(false)
        })
    }

    return loadMoreFeatures()
  }, [page])

  // Layout details for SingleFeatureCard
  const individualFeatureLayout = 'column is-12-mobile is-6-tablet is-4-desktop'

  return (
    <main className="black-bg-page" id="features">
      <Helmet defer={false}>
        <title>{`Editorial | ${title} | Ears to the concrete.`}</title>
        <meta
          property="og:title"
          content={`Editorial | ${title} | Ears to the concrete.`}
        />
        <meta property="og:url" content={`${siteUrl}/editorial/`} />
        <meta
          name="twitter:title"
          content={`Editorial | ${title} | Ears to the concrete.`}
        />
      </Helmet>

      <header className="container is-fluid">
        <div className="columns">
          <div className="column is-full content">
            <h1 className="title is-3-desktop is-4-touch">Editorial</h1>
          </div>
        </div>
        {/* Show only after featuresHighlights is processed by useEffect */
        featuresHighlights && (
          <FeaturesHighlightItems
            leftFeature={featuresHighlights.leftFeature}
            rightFeature={featuresHighlights.rightFeature}
          />
        )}
      </header>

      <section className="section container is-fluid media-cards">
        <div className="columns is-mobile is-multiline">
          {featuresToMap?.data?.map(({ node }, index) => (
            <SingleFeatureCard
              key={`halfmoon-feature-${index}`}
              data={node}
              columnLayout={individualFeatureLayout}
            />
          ))}
        </div>
        {featuresToMap && (
          <LandingPageFetchAndLoading
            hasMore={featuresToMap.hasMore}
            fetchMoreFunc={loadNextFeatures}
            currentlyFetching={featuresLoading}
            fetchMoreBtnTxt={'More Features'}
          />
        )}
      </section>
    </main>
  )
}

EditorialIndexPage.propTypes = {
  leadFeatureData: PropTypes.exact({
    _meta: PropTypes.object.isRequired,
    body: PropTypes.arrayOf(PropTypes.object),
  }),
  allOtherFeatures: PropTypes.arrayOf(PropTypes.object),
}

export const query = graphql`
  query EditorialIndexPage(
    $first: Int = 12
    $last: Int
    $after: String
    $before: String
  ) {
    prismic {
      allLandingpages {
        edges {
          node {
            first_highlight_editorial {
              ... on PRISMIC_Feature {
                _meta {
                  uid
                  type
                  lastPublicationDate
                  firstPublicationDate
                }
                header {
                  ... on PRISMIC_FeatureHeaderHeadline_block {
                    type
                    primary {
                      article_headline_img
                      article_headline
                      article_category
                      article_subtitle
                    }
                  }
                }
              }
            }
            second_highlight_editorial {
              ... on PRISMIC_Feature {
                _meta {
                  uid
                  type
                  lastPublicationDate
                  firstPublicationDate
                }
                header {
                  ... on PRISMIC_FeatureHeaderHeadline_block {
                    primary {
                      article_headline_img
                      article_headline
                      article_category
                      article_subtitle
                    }
                  }
                }
              }
            }
          }
        }
      }
      allFeatures(
        sortBy: meta_firstPublicationDate_DESC
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            _meta {
              uid
              lastPublicationDate
              firstPublicationDate
              type
            }
            header {
              ... on PRISMIC_FeatureHeaderHeadline_block {
                primary {
                  article_category
                  article_headline
                  article_headline_img
                  article_subcategory
                  article_subtitle
                }
              }
            }
          }
        }
      }
    }
  }
`
