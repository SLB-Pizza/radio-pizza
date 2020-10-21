import React from 'react'
import { Link, graphql } from 'gatsby'
import { LandingPageElement, StickyFeature } from '../../components'
import PropTypes from 'prop-types'

/**
 * @category Pages
 * @subcategory Indexes
 * @function FeaturesIndex
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function FeaturesIndex({ data }) {
  /**
   * Focus the node for the prismicContent check below.
   */
  const prismicContent = data.prismic.allFeatures.edges

  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * @see https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
   */
  if (!prismicContent) return null

  /**
   * Grab the first node object from the prismicContent array of nodes to pass as leadfeatureData prop to StickyFeature.
   *
   * The data from the 'FeaturesIndexPage' query comes pre-sorted to show the most recent published feature, NOT the most recently updated.
   *
   * The remaining array of node objects can be mapped over normally using XYZ_Component.
   */
  const allFeaturesData = prismicContent

  const leadFeatureData = allFeaturesData[0]
  const lfLayout = 'column is-12 landing-page-element'
  const lfImageAspectRatio = 'image is-2by1'

  const allOtherFeatures = allFeaturesData.slice(1)
  const aofLayout = 'column is-6 landing-page-element'
  const aofImageAspectRatio = 'image is-16by9'

  return (
    <main className="container is-fluid black-bg-page">
      <div className="columns is-multiline is-mobile">
        <div className="column is-12">
          <div className="content">
            <h1 className="title is-size-2-widescreen is-size-3-desktop is-size-4-touch">
              Features
            </h1>
            <h4 className="subtitle is-size-6-touch">
              Your reference for Prismic CMS, image guidelines, editorial
              standards and more.
            </h4>
          </div>
        </div>

        {/* Lead Feature */}
        <LandingPageElement
          pageElement={leadFeatureData}
          layout={lfLayout}
          imageAspectRatio={lfImageAspectRatio}
        />

        {/* All other Features */}
        {allOtherFeatures.map((singleFeature, index) => (
          <LandingPageElement
            key={`Feature-#${index + 1}`}
            pageElement={singleFeature}
            layout={aofLayout}
            imageAspectRatio={aofImageAspectRatio}
          />
        ))}

        {/* <div className="column is-12">
          <h1 className="title">leadFeatureData Data Object</h1>
          <pre>{JSON.stringify(leadFeatureData, null, 2)}</pre>
        </div>
        <div className="column is-12">
          <h1 className="title">allOtherFeatures Data Object</h1>
          <pre>{JSON.stringify(allOtherFeatures, null, 2)}</pre>
        </div> */}
      </div>
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
            body {
              ... on PRISMIC_FeatureBodyHeadline_block {
                type
                primary {
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

export default FeaturesIndex
