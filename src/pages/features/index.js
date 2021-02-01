import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import {
  TopicPageHero,
  TopicPageHighlightSection,
  SingleFeatureCard,
} from '../../components'
import PropTypes from 'prop-types'

/**
 * @category Pages
 * @subcategory Indexes
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

  /**
   * The data from the 'FeaturesIndexPage' query comes pre-sorted to show the most recent published feature, NOT the most recently updated.
   *
   * The remaining array of node objects can be mapped over normally using XYZ_Component.
   */

  /**
   * Break down featuresHeaderData for use
   */
  const {
    features_page_header,
    features_page_subtitle,
    bottom_right_feature,
    top_right_feature,
    main_feature_article,
  } = featuresHeaderData

  /**
   * Process main_feature_data to set up leadTopicHeroDetails props object for {@link TopicPageHero}
   */
  const featuresHeadline = RichText.asText(features_page_header) ?? 'features'

  const {
    article_headline,
    article_subtitle,
    article_category,
    article_subcategory,
    article_headline_img,
  } = main_feature_article.headline_block[0].primary

  const title = RichText.asText(article_headline) ?? ''
  const subtitle = RichText.asText(article_subtitle) ?? ''
  const category = article_category ?? ''
  const subcategory = article_subcategory ?? ''

  const leadFeatureData = {
    linkDetails: main_feature_article._meta,
    leadTopicTitle: title,
    leadTopicSubtitle: subtitle,
    leadTopicCategory: category,
    leadTopicSubcategory: subcategory,
  }

  /**
   * Create /features highlightItemsData object from leftFeature and rightFeature
   */
  const highlightsData = {
    leftFeature: top_right_feature,
    rightFeature: bottom_right_feature,
  }

  const featuresSubheadline =
    RichText.asText(features_page_subtitle) ?? 'the hotlist'

  // Layout details for SingleFeatureCard
  const individualFeatureLayout = 'column is-12-mobile is-6-tablet is-4-desktop'

  return (
    <main className="full-height-page" id="features">
      <TopicPageHero
        leadTopicData={leadFeatureData}
        leadTopicBG={article_headline_img}
        topicPageTitling={featuresHeadline}
      />

      <TopicPageHighlightSection
        layoutType="features"
        highlightsData={highlightsData}
        highlightTitling={featuresSubheadline}
      />

      <section className="section container is-fluid">
        <div className="columns is-mobile is-multiline">
          {otherFeaturesData.length &&
            otherFeaturesData.map(({ node }, index) => (
              <SingleFeatureCard
                key={`halfmoon-feature-${index}`}
                featureData={node}
                featureColumnLayout={individualFeatureLayout}
              />
            ))}
        </div>
      </section>

      <pre>
        main_feature_article {JSON.stringify(main_feature_article, null, 2)}
      </pre>
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
            main_feature_article {
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
                      article_subcategory
                      article_subtitle
                    }
                  }
                }
              }
            }
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
