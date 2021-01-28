import React from 'react'
import { TopicPageHeroDetails } from '../components'
import { FallbackImage } from '../utils'

/**
 * Hero section layout for topic landing pages (/features, /mixes, /events, etc...)
 * @function TopicPageHero
 * @param {Object} leadTopicData
 * @param {Object} leadTopicBG
 * @param {Object} topicPageTitling - default value set on the page /index before passed into TopicPageHero
 * @return {jsx}
 */
function TopicPageHero({ leadTopicData, leadTopicBG, topicPageTitling }) {
  return (
    <header className="hero has-background">
      {leadTopicBG ? (
        <img
          className="hero-background"
          src={leadTopicBG.url}
          alt={leadTopicBG.alt}
        />
      ) : (
        <FallbackImage styleName="hero-background" />
      )}
      <div className="hero-body">
        <div className="container is-fluid">
          <header className="title is-1 is-size-2-touch hero-title">
            {topicPageTitling}
          </header>
          <TopicPageHeroDetails leadTopicDetails={leadTopicData} />
        </div>
      </div>
    </header>
  )
}

export default TopicPageHero
