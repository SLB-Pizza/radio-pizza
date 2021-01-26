import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import {
  LeadFeatureHero,
  HighlightFeatures,
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
   * Focus the node for the allFeaturesData check below.
   */
  const featuresHeaderData = data.prismic.allLandingpages.edges[0].node
  const allFeaturesData = data.prismic.allFeatures.edges

  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * @see https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
   */
  if (!allFeaturesData || !featuresHeaderData) return null

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

  const backdropImg =
    main_feature_article.headline_block[0].primary.article_headline_img

  const featuresHeadline = RichText.asText(features_page_header) ?? 'features'
  const featuresSubheadline =
    RichText.asText(features_page_subtitle) ?? 'the hotlist'

  // const lfLayout = "column is-12 landing-page-element";
  // const lfImageAspectRatio = "image is-2by1";

  // const allOtherFeatures = allFeaturesData.slice(1);
  // const aofLayout = "column is-6 landing-page-element";
  // const aofImageAspectRatio = "image is-16by9";

  const individualFeatureLayout = 'column is-12-mobile is-6-tablet is-4-desktop'

  return (
    <main className="full-height-page" id="features">
      <LeadFeatureHero
        leadFeatureData={main_feature_article}
        leadFeatureBG={backdropImg}
        pageTitling={featuresHeadline}
      />

      {/* Component that houses secondary features */}
      <HighlightFeatures
        titling={featuresSubheadline}
        rightFeature={bottom_right_feature}
      />

      <section className="section container is-fluid">
        <div className="columns is-mobile is-multiline">
          {allFeaturesData.length &&
            allFeaturesData.map(({ node }, index) => (
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
