import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { debounce } from 'lodash'
import { ResidentLinks } from '../components'
import {
  checkUpcomingShowWidth,
  linkResolver,
  mappableDataFilter,
  setInitialMarqueeState,
} from '../utils'

/**
 * Renders the Prismic Mix data object to be display in `.upcoming-show`
 * @category Layout Helper
 * @function UpcomingShowWithResidents
 * @param {String} startTimeStr - DateTime string; preformatted in {@link UpcomingShow}
 * @param {Object} upcomingShow - the Prismic Mix data object
 * @prop {?String} mix_title - optional mix title
 * @prop {}
 * @param {Boolean} isLoading
 * @returns {jsx}
 */
export default function UpcomingShowWithResidents({
  startTimeStr,
  upcomingShow,
  isLoading,
}) {
  const [activeMarquee, setActiveMarquee] = useState(null)
  const { mix_title, featured_residents } = upcomingShow

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

  if (mix_title) {
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
          {`${startTimeStr} ${mix_title} | `}
          <ResidentLinks
            residentsArr={featured_residents}
            returnAsSpan={true}
          />
        </p>
      </div>
    )
  } else {
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
          {`${startTimeStr} `}
          <ResidentLinks
            residentsArr={featured_residents}
            returnAsSpan={true}
          />
        </p>
      </div>
    )
  }
}
