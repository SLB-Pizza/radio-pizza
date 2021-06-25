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
  filterFetchedEditorials,
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
  const featuresPerPage = 6
  const didMountRef = useRef(false)
  const [page, setPage] = useState(-1)
  const [featuresHighlights, setFeaturesHighlights] = useState(null)
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
      let uidsToFilter
      const highlightEditorials = []
      const highlightedFeatures = {
        leftFeature: null,
        rightFeature: null,
      }

      /**
       * Select and deconstruct `editorialHeaderData` for use.
       */
      const editorialHeaderData = prismicContent.allLandingpages.edges[0].node
      const {
        second_highlight_editorial,
        first_highlight_editorial,
      } = editorialHeaderData

      /**
       * Create an array to collect editorialHeaderData node to pass into {@link getUIDsFromDataArray}
       */
      if (first_highlight_editorial) {
        highlightEditorials.push({
          node: first_highlight_editorial,
        })
      }
      if (second_highlight_editorial) {
        highlightEditorials.push({
          node: second_highlight_editorial,
        })
      }

      /**
       * IF there are highlight editorials
       *    Grab their UIDs
       *    Filter out these UIDs from `featuresToMap` editorial data array.
       *    Set new `featuresToMap`
       * ELSE (No highlight editorials selected in CMS)
       *    Splice first two from `featuresToMap` to use as highlights
       *    Pass as nodes to `uidsToFilter`.
       */

      if (highlightEditorials.length) {
        if (!editorialUIDsToFilter) {
          uidsToFilter = getUIDsFromDataArray(highlightEditorials)
          setEditorialsUIDsToFilter(uidsToFilter)
        }

        const filteredEditorialData = removeDuplicateFetchData(
          featuresToMap,
          uidsToFilter
        )

        setFeaturesToMap({
          data: filteredEditorialData,
          hasMore: prismicContent.allFeatures.pageInfo.hasNextPage,
        })

        /**
         * Build the highlightedFeatures data object; will be used as props for {@link FeaturesHighlightItems}.
         */
        highlightedFeatures.leftFeature = first_highlight_editorial
        highlightedFeatures.rightFeature = second_highlight_editorial
        setFeaturesHighlights(highlightedFeatures)
      } else {
        /**
         * No highlight editorials selected in CMS
         * Therefore, will also be first time setting the editorial UIDs to filter out
         * from fetched data
         */
        const twoMostRecentEditorials = featuresToMap.splice(0, 2)
        console.debug(twoMostRecentEditorials)

        uidsToFilter = getUIDsFromDataArray(highlightEditorials)
        setEditorialsUIDsToFilter(uidsToFilter)

        setFeaturesToMap({
          data: featuresToMap,
          hasMore: prismicContent.allFeatures.pageInfo.hasNextPage,
        })

        highlightedFeatures.leftFeature = twoMostRecentEditorials[0]
        highlightedFeatures.rightFeature = twoMostRecentEditorials[1]
        setFeaturesHighlights(highlightedFeatures)
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
            first: 6,
            after: getCursorFromDocumentIndex(page),
          },
        })
        .then(res => {
          const fetchedEditorialData = res.data.allFeatures
          const filteredFetchedEditorials = removeDuplicateFetchData(
            fetchedEditorialData.edges,
            editorialUIDsToFilter
          )

          setFeaturesToMap({
            data: [...featuresToMap.data, ...filteredFetchedEditorials],
            hasMore: fetchedEditorialData.pageInfo.hasNextPage,
          })
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
            leftFeature={featuresHighlights.leftFeature.node}
            rightFeature={featuresHighlights.rightFeature.node}
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
