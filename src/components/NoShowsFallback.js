import React from 'react'

/**
 * Renders a static fallback that tells the user that there are no scheduled shows on the displayed date and where to find additional Half Moon data.
 * Called by {@link SingleDateScheduleGenerator} and {@link }
 * @category Layout Helper
 * @function NoShowsFallback
 * @returns {jsx}
 */
export default function NoShowsFallback() {
  return (
    <div className="section is-medium column is-12 content">
      <p className="title is-size-4-tablet is-size-5-mobile has-text-centered">
        No shows scheduled!
      </p>
      <p className="subtitle is-size-6-tablet is-size-7-mobile has-text-centered text-block">
        {'Follow us on our '}
        <a href="https://twitter.com/halfmoonbk" rel="noopener" target="_blank">
          Twitter
        </a>
        {', '}
        <a
          href="https://www.instagram.com/halfmoonbk/"
          rel="noopener"
          target="_blank"
        >
          Instagram
        </a>
        {', and '}
        <a
          href="https://www.facebook.com/halfmoonbk/"
          rel="noopener"
          target="_blank"
        >
          Facebook
        </a>
        {' for all the latest '}
        <b>Half Moon</b>
        {' news.'}
      </p>
    </div>
  )
}
