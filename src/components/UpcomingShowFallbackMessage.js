import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { measureTextWidth } from '../utils'

/**
 * Renders the `.upcoming-show` div content when the upcoming show is a Live Broadcast powered by `live_show_title` and `live_show_guests`.
 * @category Layout Helper
 * @function UpcomingShowFallbackMessage
 * @param {Boolean} isLoading - `globalState` pop; originates from {@link UpcomingShow}
 * @returns {jsx}
 */
export default function UpcomingShowFallbackMessage({ isLoading }) {
  const [activeMarquee, setActiveMarquee] = useState(null)

  /**
   * Runs once on page load to set initial `activeMarquee` state.
   * @category useEffect
   * @name setInitialMarqueeState
   */
  useEffect(() => {
    const setInitialMarqueeState = () => {
      const marqueeIsActive = measureTextWidth()
      setActiveMarquee(marqueeIsActive)
    }
    return setInitialMarqueeState()
  }, [])

  /**
   * Update `activeMarquee` anytime the page is resized.
   * @category useEffect
   * @name checkUpcomingShowWidth
   */
  useEffect(() => {
    const checkUpcomingShowWidth = () => {
      if (activeMarquee !== null) {
        const marqueeIsActive = measureTextWidth()
        setActiveMarquee(marqueeIsActive)
      }
    }

    const debouncedWidthCheck = debounce(checkUpcomingShowWidth, 500)
    window.addEventListener('resize', debouncedWidthCheck)

    return () => {
      window.removeEventListener('resize', debouncedWidthCheck)
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
      <p
        className={
          activeMarquee
            ? 'title is-size-6-desktop is-size-7-touch active-marquee'
            : 'title is-size-6-desktop is-size-7-touch'
        }
      >
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
