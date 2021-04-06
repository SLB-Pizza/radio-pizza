import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { compareTextWidthAndShowSpace } from '../utils'

/**
 * Renders the `.upcoming-show` div content when the upcoming show is a Live Broadcast powered by `live_show_title` and `live_show_guests`.
 * @category Layout Helper
 * @function UpcomingShowFallbackMessage
 * @param {Boolean} isLoading - `globalState` pop; originates from {@link UpcomingShow}
 * @returns {jsx}
 */
export default function UpcomingShowFallbackMessage({ isLoading }) {
  const [isScrolling, setScrolling] = useState(null)

  useEffect(() => {
    const debouncedWidthCheck = window.addEventListener

    return () => {
      compareTextWidthAndShowSpace()
    }
  })

  return (
    <div
      className={
        isLoading
          ? 'column upcoming-show text-block'
          : 'column upcoming-show text-block is-loaded'
      }
    >
      <p className="subtitle is-size-6-desktop is-size-7-touch">
        No upcoming shows planned. Follow us on our{' '}
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
        {' for all the latest HMBK news.'}
      </p>
    </div>
  )
}
