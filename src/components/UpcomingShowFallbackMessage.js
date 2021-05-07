import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { checkUpcomingShowWidth, setInitialMarqueeState } from '../utils'

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
   * Calls on {@link setInitialMarqueeState}.
   * @category useEffect
   */
  useEffect(() => {
    setInitialMarqueeState(
      '.upcoming-show',
      '.upcoming-show p',
      setActiveMarquee
    )
  }, [])

  /**
   * Update `activeMarquee` anytime the page is resized.
   * `stateLoadedFunction` returns {@link checkUpcomingShowWidth} with local state.
   * `stateLoadedFunction` is then debounced, and then passed to the `resize` eventListener
   * @category useEffect
   */
  useEffect(() => {
    const stateLoadedFunction = () =>
      checkUpcomingShowWidth(
        activeMarquee,
        '.upcoming-show',
        '.upcoming-show p',
        setActiveMarquee
      )

    const debouncedActiveMarqueeCheck = debounce(stateLoadedFunction, 500)
    window.addEventListener('resize', debouncedActiveMarqueeCheck)

    return () => {
      window.removeEventListener('resize', debouncedActiveMarqueeCheck)
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
            ? 'title is-size-6-tablet is-size-7-mobile active-marquee'
            : 'title is-size-6-tablet is-size-7-mobile'
        }
      >
        {'No upcoming shows planned. Follow us on our '}
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
