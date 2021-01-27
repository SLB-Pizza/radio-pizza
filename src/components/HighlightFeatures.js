import React from 'react'
import { SingleFeatureCard } from '../components'

function HighlightFeatures({
  titling = 'hot off the press',
  leftFeature,
  rightFeature,
}) {
  // Dictates SingleFeatureCard layout; could be overwritten by if-else's below
  let leftFeatureLayout = 'column is-12-mobile is-6 tablet'
  let rightFeatureLayout = 'column is-12-mobile is-6 tablet'

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
    <section
      className="section container is-fluid highlight-features"
      style={{ backgroundColor: '#f600ff' }}
    >
      <h2 className="title hero-title">{titling}</h2>
      <div className="columns is-mobile">
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
        {/* <div className="column">
          <pre>{JSON.stringify(leftFeature, null, 2)}</pre>
        </div> */}
      </div>
    </section>
  )
}

export default HighlightFeatures
