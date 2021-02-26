import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { TopicPageHighlightSection, SingleFeatureCard } from '../../components'
import PropTypes from 'prop-types'

/**
 * @category Pages
 * @function FeaturesIndex
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function FeaturesIndex({ data }) {
  /**
   * Focus the node for the otherFeaturesData check below.
   */
  const featuresHeaderData = data.prismic.allLandingpages.edges[0].node
  const otherFeaturesData = data.prismic.allFeatures.edges

  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * @see https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
   */
  if (!otherFeaturesData || !featuresHeaderData) return null

  const [featuresHighlights, setFeaturesHighlights] = useState(null)
  const [featuresToMap, setFeaturesToMap] = useState(null)

  /**
   * The data from the 'FeaturesIndexPage' query comes pre-sorted to show the most recent published feature, NOT the most recently updated.
   *
   * The remaining array of node objects can be mapped over normally using XYZ_Component.
   */

  /**
   * Break down featuresHeaderData for {@link TopicPageHero} and {@link TopicPageHighlightSection}
   */
  useEffect(() => {
    const processFeaturesHeaderData = () => {
      // objects to pass to useState after processing
      let highlightsData = {}

      let {
        features_page_header,
        features_page_subtitle,
        bottom_right_feature,
        top_right_feature,
      } = featuresHeaderData

      const titling = RichText.asText(features_page_header) ?? 'features'

      /**
       * main_feature_article is null
       * - Shift off the first article from `allOtherFeatures` to use as main_feature_article
       */
      const allOtherFeatures = otherFeaturesData

      /**
       * Create /features highlightItemsData object from leftFeature and rightFeature using features from allOtherFeatures if necessary
       */

      if (!top_right_feature) {
        top_right_feature = allOtherFeatures.shift()
      }
      if (!bottom_right_feature) {
        bottom_right_feature = allOtherFeatures.shift()
      }

      /**
       * Build the highlightFeatures data object to pass to highlightsData
       */
      const highlightFeatures = {
        leftFeature: top_right_feature,
        rightFeature: bottom_right_feature,
      }

      const featuresSubheadline =
        RichText.asText(features_page_subtitle) ?? 'the hotlist'

      highlightsData = {
        data: highlightFeatures,
        titling: featuresSubheadline,
      }

      // Set featuresHighlight to the assembled highlightsData object
      // Set featuresToMap to allOtherFeatures
      setFeaturesHighlights(highlightsData)
      setFeaturesToMap(allOtherFeatures)
    }
    return processFeaturesHeaderData()
  }, [data])

  // Layout details for SingleFeatureCard
  const individualFeatureLayout = 'column is-12-mobile is-6-tablet is-4-desktop'

  return (
    <main className="full-height-page" id="features">
      {/* Show only after featuresHighlights is processed by useEffect */
      featuresHighlights && (
        <TopicPageHighlightSection
          layoutType="features"
          highlightsData={featuresHighlights.data}
          highlightTitling={featuresHighlights.titling}
        />
      )}

      <section className="section container is-fluid">
        <div className="columns is-mobile is-multiline">
          {featuresToMap &&
            featuresToMap.map(({ node }, index) => (
              <SingleFeatureCard
                key={`halfmoon-feature-${index}`}
                featureData={node}
                featureColumnLayout={individualFeatureLayout}
              />
            ))}
        </div>
      </section>
    </main>
  )
}

FeaturesIndex.propTypes = {
  leadFeatureData: PropTypes.exact({
    _meta: PropTypes.object.isRequired,
    body: PropTypes.arrayOf(PropTypes.object),
  }),
  allOtherFeatures: PropTypes.arrayOf(PropTypes.object),
}

export const query = graphql`
  query FeaturesIndexPage {
    prismic {
      allLandingpages {
        edges {
          node {
            features_page_header
            features_page_subtitle
            top_right_feature {
              ... on PRISMIC_Feature {
                _meta {
                  uid
                  type
                  lastPublicationDate
                  firstPublicationDate
                }
                headline_block {
                  ... on PRISMIC_FeatureHeadline_blockHeadline_block {
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
                _linkType
                _meta {
                  uid
                  type
                  lastPublicationDate
                  firstPublicationDate
                }
                headline_block {
                  ... on PRISMIC_FeatureHeadline_blockHeadline_block {
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
      allFeatures(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              uid
              firstPublicationDate
              lastPublicationDate
              type
              tags
            }
            headline_block {
              ... on PRISMIC_FeatureHeadline_blockHeadline_block {
                primary {
                  article_headline_img
                  article_headline
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

export default FeaturesIndex
