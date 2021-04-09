import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { checkUpcomingShowWidth, setInitialMarqueeState } from '../utils'
/**
 * Renders the `.upcoming-show` div content when the upcoming show is a Live Broadcast powered by `live_show_title` and `live_show_guests`.
 * @category Layout Helper
 * @function UpcomingShowLiveBroadcast
 * @param {String} startTimeStr - DateTime string; preformatted in {@link UpcomingShow}
 * @param {String} showTitle - string from Prismic query
 * @param {String} showGuests - string from Prismic query
 * @param {Boolean} isLoading - `globalState` pop; originates from {@link UpcomingShow}
 * @returns {jsx}
 */
export default function UpcomingShowLiveBroadcast({
  startTimeStr,
  showTitle,
  showGuests,
  isLoading,
}) {
  const [activeMarquee, setActiveMarquee] = useState(null)
  const [liveBroadcastStr, setLiveBroadcastStr] = useState(null)

  /**
   * Create the live broadcast string to render.
   * @category useEffect
   * @name createUpcomingLiveBroadcastString
   */
  useEffect(() => {
    const createUpcomingLiveBroadcastString = () => {
      let liveShowStr = ''
      if (showTitle) {
        liveShowStr += `${showTitle} `
        if (showGuests) {
          liveShowStr += ` | ${showGuests}`
        }
      } else if (showGuests) {
        liveShowStr += `${showGuests}`
      } else {
        liveShowStr = 'HMBK Live Show'
      }
      setLiveBroadcastStr(liveShowStr)
    }
    return createUpcomingLiveBroadcastString()
  }, [showTitle, showGuests])

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
        {`${startTimeStr} ${liveBroadcastStr}`}
      </p>
    </div>
  )
}
