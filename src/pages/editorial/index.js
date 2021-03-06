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
import { getUIDsFromDataArray, removeDuplicateFetchData } from '../../utils'
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
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()
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
      const editorialsToFilter = []
      if (second_highlight_editorial) {
        editorialsToFilter.push({ node: second_highlight_editorial })
      }
      if (first_highlight_editorial) {
        editorialsToFilter.push({ node: first_highlight_editorial })
      }

      /**
       * IF there are highlight editorials
       *    Grab their UIDs
       *    Filter out editorial UIDs that match from `featuresToMap`.
       *    `setFeaturesToMap
       */
      if (editorialsToFilter.length) {
        const uidsToFilter = getUIDsFromDataArray(editorialsToFilter)
        setEditorialsUIDsToFilter(uidsToFilter)

        const filteredEditorialData = removeDuplicateFetchData(
          featuresToMap,
          uidsToFilter
        )
        setFeaturesToMap({
          data: filteredEditorialData,
          hasMore: prismicContent.allFeatures.hasNextPage,
        })

        /**
         * Build the highlightedFeatures data object; will be used as props for {@link FeaturesHighlightItems}.
         */
        const highlightedFeatures = {
          leftFeature: first_highlight_editorial,
          rightFeature: second_highlight_editorial,
        }

        setFeaturesHighlights(highlightedFeatures)
      } else {
        setFeaturesToMap({
          data: prismicContent.allFeatures.edges,
          hasMore: prismicContent.allFeatures.hasNextPage,
        })
      }
    }
    processEditorialHeaderData()
  }, [data])

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
   * useEffect that fires off a Prismic fetch when the 'More Events' button is clicked and {@link loadNextFeatures} changes the `page` value. Adds events from Prismic fetch to eventsToMap data array and updates hasMore value.
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
            after: getCursorFromDocumentIndex(page),
          },
        })
        .then(res => {
          const fetchedEditorialData = res.data.allFeatures
          const filteredFetchedEditorials = removeDuplicateFetchData(
            fetchedEditorialDataArr.edges,
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
            leftFeature={featuresHighlights.leftFeature}
            rightFeature={featuresHighlights.rightFeature}
          />
        )}
      </header>

      <section className="section container is-fluid media-cards">
        <div className="columns is-mobile is-multiline">
          {featuresToMap?.data &&
            featuresToMap?.data.map(({ node }, index) => (
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
    $first: Int = 6
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
