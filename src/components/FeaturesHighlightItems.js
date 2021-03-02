import React from 'react'
import { SingleFeatureCard } from '../components'

/**
 * Returns the /features highlight section layout
 * @category Site Element
 * @function FeaturesHighlightItems
 * @param {Object} leftFeature - data object for left feature
 * @param {Object} rightFeature - data object for right feature
 * @returns {jsx}
 */
function FeaturesHighlightItems({ leftFeature, rightFeature }) {
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
