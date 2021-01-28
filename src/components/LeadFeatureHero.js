import React from 'react'
import { LeadFeatureDetails } from '../components'

/**
 * Returns the LeadFeatureHero for /features index page
 * @category LayoutHelper
 * @function LeadFeatureHero
 * @param {Object} leadFeatureBG
 * @param {object} leadFeatureBackground
 * @param {String} pageTitling
 * @returns {jsx}
 */
function LeadFeatureHero({
  leadFeatureBG,
  pageTitling = 'features',
  leadFeatureData,
}) {
  return (
    <header className="hero has-background">
      <img
        className="hero-background"
        src={leadFeatureBG.url}
        alt={leadFeatureBG.alt}
      />
      <div className="hero-body">
        <div className="container is-fluid">
          <header className="title is-1 is-size-2-touch hero-title">
            {pageTitling}
          </header>
          <LeadFeatureDetails articleData={leadFeatureData} />
        </div>
      </div>
    </header>
  )
}

export default LeadFeatureHero
