import React from 'react'
import { FeaturesHighlightItems } from '../components'

/**
 *
 * @param {String} highlightTitling - defines the section titling; default values are set within the LayoutComponent
 * @param {String} layoutType - used to select the layout component to render the highlights data
 * @param {String} highlightsData - the data to be rendered by HighlightSectionLayout once the layout component is selected
 * @return {jsx}
 */
function TopicPageHighlightSection({
  highlightTitling,
  layoutType,
  highlightsData,
}) {
  // Pull in the Highlight Layout Components for use
  const highlightLayoutComponents = {
    features: FeaturesHighlightItems,
  }

  // Select the correct layout component based on layoutType prop value
  const HighlightSectionLayout = highlightLayoutComponents[layoutType]

  // Do not render section if layout component is undefined
  if (!HighlightSectionLayout) return null

  return (
    <section className="section container is-fluid highlight-items">
      <h2 className="title is-2 is-size-3-touch hero-title">
        {highlightTitling}
      </h2>
      <HighlightSectionLayout highlightItemsData={highlightsData} />
    </section>
  )
}

export default TopicPageHighlightSection
