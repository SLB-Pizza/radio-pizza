import React from 'react'
import { FeaturesHighlightItems } from '../components'

/**
 *
 * @param {String} highlightSectionTitling - defines the section titling; default values are set within the LayoutComponent
 * @param {String} layoutType - used to select the layout component to render the highlights data
 * @return {jsx}
 */
function TopicPageHighlightSection({
  highlightSectionTitling,
  layoutType,
  highlightsData,
}) {
  // Pull the Highlight Layout Components for use
  const highlightLayoutComponents = {
    features: FeaturesHighlightItems,
  }

  // Select the correct layout component based on layoutType prop value
  const HighlightSectionLayout = highlightLayoutComponents[layoutType]

  return (
    <section className="section container is-fluid highlight-items">
      <h2 className="title is-2 is-size-3-touch hero-title">
        {highlightSectionTitling}
      </h2>
      <HighlightSectionLayout highlightItemsData={highlightsData} />
    </section>
  )
}

export default TopicPageHighlightSection
