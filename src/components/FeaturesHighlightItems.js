import React from 'react'
import { SingleFeatureCard } from '../components'

/**
 * Returns the /features highlight section layout. Two highlight editorials are always guaranteed by {@link processEditorialHeaderData}'s handling of 1 or 0 CMS selected highlight editorials.
 * @category Site Element
 * @function FeaturesHighlightItems
 * @param {Object} leftFeature - data object for left feature
 * @param {Object} rightFeature - data object for right feature
 * @returns {jsx}
 */
function FeaturesHighlightItems({ leftFeature, rightFeature }) {
  const leftFeatureLayout = 'column is-12-touch is-6-desktop'
  const rightFeatureLayout = 'column is-12-touch is-6-desktop'

  return (
    <div className="columns is-mobile is-multiline">
      {leftFeature && (
        <SingleFeatureCard
          data={leftFeature}
          columnLayout={leftFeatureLayout}
        />
      )}
      {rightFeature && (
        <SingleFeatureCard
          data={rightFeature}
          columnLayout={rightFeatureLayout}
        />
      )}
    </div>
  )
}

export default FeaturesHighlightItems
