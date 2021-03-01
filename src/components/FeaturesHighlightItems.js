import React from 'react'
import { SingleFeatureCard } from '../components'

/**
 * Returns the /features highlight section layout
 * @function FeaturesHighlightItems
 * @param {Object} highlightItemsData
 * @prop {Object} highlightItemsData.leftFeature - data object for left feature
 * @prop {Object} highlightItemsData.rightFeature - data object for right feature
 * @param {String} highlightsData - the data to be rendered by HighlightSectionLayout once the layout component is selected
 * @returns {jsx}
 */
function FeaturesHighlightItems({ highlightItemsData, highlightTitling }) {
  /**
   * Deconstruct highlightItemsData from {@link TopicPageHighlightSection}
   */
  const { leftFeature, rightFeature } = highlightItemsData

  // Dictates SingleFeatureCard layout; could be overwritten by if-else's below
  let leftFeatureLayout = 'column is-12-touch is-6-desktop'
  let rightFeatureLayout = 'column is-12-touch is-6-desktop'

  // If BOTH the leftFeature and rightFeature haven't been designated in the CMS, do not render this component!
  if (!leftFeature && !rightFeature) {
    return null
  }
  // Change the featureColumnLayout for rightFeature if there is no leftFeature
  else if (!leftFeature) {
    rightFeatureLayout = 'column is-12'
  }
  // ...and vice versa
  else if (!rightFeature) {
    leftFeatureLayout = 'column is-12'
  }
  return (
    <div className="columns is-mobile is-multiline">
      <div className="column is-12">
        <p className="title is-size-4-desktop is-size-6-touch">
          {highlightTitling}
        </p>
      </div>
      {leftFeature && (
        <SingleFeatureCard
          featureData={leftFeature}
          featureColumnLayout={leftFeatureLayout}
        />
      )}
      {rightFeature && (
        <SingleFeatureCard
          featureData={rightFeature}
          featureColumnLayout={rightFeatureLayout}
        />
      )}
    </div>
  )
}

export default FeaturesHighlightItems
