import React from 'react'
import { Link } from 'gatsby'
import { linkResolver } from '../utils'

/**
 * The component that renders the lead topic's details and link to item
 * @function TopicPageHeroDetails
 * @param {Object<String>} leadTopicDetails - originally set and passed in the topic index page and passed to {@link TopicPageHero}
 * @prop {Object} leadTopicDetails.linkDetails - link object passed to {@link linkResolver}
 * @prop {String} leadTopicDetails.leadTopicTitle - preprocessed RichText element
 * @prop {String} leadTopicDetails.leadTopicSubtitle - preprocessed RichText element
 * @prop {String} leadTopicDetails.leadTopicCategory
 * @prop {String} leadTopicDetails.leadTopicSubcategory
 * @return {jsx}
 */
function TopicPageHeroDetails({ leadTopicDetails }) {
  const {
    linkDetails,
    leadTopicTitle,
    leadTopicSubtitle,
    leadTopicCategory,
    leadTopicSubcategory,
  } = leadTopicDetails

  // Set span text
  const spanText =
    leadTopicSubcategory !== ''
      ? `${leadTopicCategory} ‣ ${leadTopicSubcategory}`
      : `${leadTopicCategory}`

  return (
    <div className="columns main-feature">
      <div className="column is-5">
        <Link to={linkResolver(linkDetails)}>
          <div className="lead-details border-color">
            <span className="tag is-outlined is-rounded is-black is-hidden-mobile">
              {spanText}
            </span>
            <h1 className="title is-size-5-touch">{leadTopicTitle}</h1>
            <h2 className="subtitle is-size-7-touch">{leadTopicSubtitle}</h2>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default TopicPageHeroDetails
