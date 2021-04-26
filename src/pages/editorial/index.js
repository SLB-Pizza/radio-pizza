import React, { useEffect, useState, useRef } from 'react'
import { getCursorFromDocumentIndex } from '@prismicio/gatsby-source-prismic-graphql'
import { graphql } from 'gatsby'
import {
  FeaturesHighlightItems,
  LandingPageFetchAndLoading,
  SingleFeatureCard,
} from '../../components'
import PropTypes from 'prop-types'

/**
 * Layout for /features landing page.
 * @category Pages
 * @function EditorialIndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 * @param {Object} prismic - the data object containing Prismic follow up functions
 * @returns {jsx}
 */
function EditorialIndexPage({ data, prismic }) {
  const prismicContent = data.prismic
  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * @see {@link https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check Retrieve the document object}
   */
  if (!prismicContent) return null

  /**
   * Focus the node for the otherFeaturesData check below.
   */

  const [featuresHighlights, setFeaturesHighlights] = useState(null)

  const featuresPerPage = 6
  const didMountRef = useRef(false)
  const [page, setPage] = useState(-1)
  const [featuresToMap, setFeaturesToMap] = useState({
    data: prismicContent.allFeatures.edges,
    hasMore: prismicContent.allFeatures.hasNextPage,
  })
  const [featuresLoading, setFeaturesLoading] = useState(false)

  /**
   * Break down `prismicContent` to select `featuresHeaderData` for {@link FeaturesHighlightItems}.
   * @category useEffect
   * @name processFeaturesHeaderData
   */
  useEffect(() => {
    const processFeaturesHeaderData = () => {
      // Select and deconstruct featuresHeaderData for use.
      const featuresHeaderData = prismicContent.allLandingpages.edges[0].node
      const { bottom_right_feature, top_right_feature } = featuresHeaderData

      /**
       * Build the highlightedFeatures data object; will be used as props for {@link FeaturesHighlightItems}.
       */
      const highlightedFeatures = {
        leftFeature: top_right_feature,
        rightFeature: bottom_right_feature,
      }

      setFeaturesHighlights(highlightedFeatures)
    }
    return processFeaturesHeaderData()
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

      // Grab the next 12 events
      prismic
        .load({
          variables: {
            after: getCursorFromDocumentIndex(page),
          },
        })
        .then(res => {
          setFeaturesLoading(false)

          setFeaturesToMap({
            data: [...featuresToMap.data, ...res.data.allFeatures.edges],
            hasMore: res.data.allFeatures.pageInfo.hasNextPage,
          })
        })
    }

    return loadMoreFeatures()
  }, [page])

  // Layout details for SingleFeatureCard
  const individualFeatureLayout = 'column is-12-mobile is-6-tablet is-4-desktop'

  return (
    <main className="black-bg-page" id="features">
      <header className="container is-fluid">
        <div className="columns">
          <div className="column is-full content">
            <h1 className="title is-3-desktop is-4-touch">features</h1>
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
          {featuresToMap?.data.map(({ node }, index) => (
            <SingleFeatureCard
              key={`halfmoon-feature-${index}`}
              data={node}
              columnLayout={individualFeatureLayout}
            />
          ))}
        </div>
        <LandingPageFetchAndLoading
          hasMore={featuresToMap.hasMore}
          currentlyFetching={featuresLoading}
          fetchMoreFunc={loadNextFeatures}
          fetchMoreBtnTxt={'More Features'}
        />
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
            top_right_feature {
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
            bottom_right_feature {
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
                type
                primary {
                  article_author {
                    ... on PRISMIC_Staff {
                      hmbk_staff_name
                      hmbk_staff_position
                      hmbk_staff_photo
                    }
                  }
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

export default EditorialIndexPage
