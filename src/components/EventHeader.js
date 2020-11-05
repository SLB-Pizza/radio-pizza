import React, { useState, useEffect, Fragment } from 'react'
import { RichText } from 'prismic-reactjs'
import { EventCountdown } from '../components'
import { formatDateTime } from '../utils'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)

/**
 * Component that renders the time remaining and relevant button for each event
 * @category Layout Helper
 * @function EventHeader
 * @param {*} { startDate, endDate, eventName }
 * @returns {jsx} a bar that appears after the event's image that sticks to the top on scroll
 */
function EventHeader({
  startDate,
  endDate,
  eventName,
  location,
  headerButtonText,
  headerButtonLink,
}) {
  const [currentTime, setCurrentTime] = useState(dayjs().tz('America/New_York'))
  const [beforeEvent, setBeforeEvent] = useState(null)
  const [dayCount, setDayCount] = useState(null)
  const [hourCount, setHourCount] = useState(null)
  const [minuteCount, setMinuteCount] = useState(null)
  const [secondCount, setSecondCount] = useState(null)
  const [eventHeight, setEventHeight] = useState(1)
  const [timerHeight, setTimerHeight] = useState(1)
  const [headerIsSticky, setHeaderIsSticky] = useState(false)

  const startDateText = formatDateTime(startDate, 'long-form-date-time')
  const endDateText =
    endDate !== null ? formatDateTime(endDate, 'long-form-date') : null

  useEffect(() => {
    const countdownClock = setInterval(() => {
      setCurrentTime(currentTime.add(1, 's'))

      // Check if currentTime is before or same as startDate
      if (currentTime.isSameOrBefore(dayjs(startDate))) {
        setBeforeEvent(true)

        let startDayJS = dayjs(startDate)
        let days = dayjs(startDayJS).diff(currentTime, 'day')

        // 24 hours in a day
        let hours = dayjs(startDayJS).diff(currentTime, 'hour') % 24

        // 60 minutes in a hour
        let minutes = dayjs(startDayJS).diff(currentTime, 'minute') % 60

        // 60 seconds in a minute
        let seconds = dayjs(startDayJS).diff(currentTime, 'second') % 60

        setDayCount(days)
        setHourCount(hours)
        setMinuteCount(minutes)
        setSecondCount(seconds)
      }
    }, 1000)

    return () => {
      clearInterval(countdownClock)
    }
  }, [currentTime])

  useEffect(() => {
    const handleScroll = e => {
      // Set base values for the heights of the image and timer component
      if (timerHeight === 1 && eventHeight === 1) {
        let eventImage = document.querySelector('header.event-image')
        let eventHeader = document.querySelector('.event-header')

        /**
         * Using clientHeight here because neither eventImage nor eventHeader has a border to count.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight|Element.clientHeight - MDN}
         */
        setEventHeight(eventImage.clientHeight)
        setTimerHeight(eventHeader.clientHeight)
      }

      let topNav = document.querySelector('.radio-and-schedule-bar')
      let bottomNav = document.querySelector('.navbar.is-fixed-bottom')

      /**
       * Using offsetHeight here because both topNav and bottomNav have borders to account for.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight|HTMLElement.offsetHeight - MDN}
       */
      let topNavHeight = topNav.offsetHeight
      let bottomNavHeight = bottomNav.offsetHeight

      // If we've scrolled down enough for the event timer to become sticky...
      if (
        e.target.documentElement.scrollTop >=
        eventHeight + timerHeight - topNavHeight - bottomNavHeight
      ) {
        //...make hasScrolled true to activate the style changes...
        setHeaderIsSticky(true)
      } else {
        //...else set to false to deactivate the style changes...
        setHeaderIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [eventHeight, timerHeight, headerIsSticky])

  return (
    <div
      className="container is-fluid event-header"
      style={headerIsSticky ? { minHeight: 'auto' } : null}
    >
      <div className="columns is-mobile is-multiline is-vcentered event-title">
        <div
          className={
            headerButtonLink
              ? 'column is-hidden-mobile'
              : 'column is-12 is-hidden-mobile'
          }
        >
          <div className="content">
            <p
              className={
                headerIsSticky
                  ? 'title is-size-5'
                  : 'title is-size-4-tablet is-size-5-mobile'
              }
            >
              {RichText.asText(eventName)}
            </p>
            <p
              className={
                headerIsSticky
                  ? 'subtitle is-size-7'
                  : 'subtitle is-size-6-tablet is-size-7-mobile'
              }
            >
              {endDate
                ? `${startDateText} to ${endDateText} | ${location}`
                : `${startDateText} | ${location}`}
            </p>
          </div>
        </div>
        <div className="column is-12 is-hidden-tablet">
          <div className="content">
            <p className="title is-size-5">{RichText.asText(eventName)}</p>
            <p className="subtitle is-size-7">
              {endDate
                ? `${startDateText} to ${endDateText} | ${location}`
                : `${startDateText} | ${location}`}
            </p>
          </div>
        </div>
        {beforeEvent && headerButtonLink ? (
          <>
            {/* TABLET AND DESKTOP BUTTON */}
            <div className="column is-narrow is-hidden-mobile">
              <a href={headerButtonLink.url} target="_blank">
                <button
                  className={
                    headerIsSticky
                      ? 'button is-small is-fullwidth is-outlined is-rounded'
                      : 'button is-fullwidth is-outlined is-rounded'
                  }
                >
                  {headerButtonText}
                </button>
              </a>
            </div>
            {/* MOBILE BUTTON */}
            <div className="column is-8 is-offset-2 is-hidden-tablet">
              <a href={headerButtonLink.url} target="_blank">
                <button
                  className={
                    headerIsSticky
                      ? 'button is-small is-fullwidth is-outlined is-rounded'
                      : 'button is-fullwidth is-outlined is-rounded'
                  }
                >
                  {headerButtonText}
                </button>
              </a>
            </div>
          </>
        ) : null}
      </div>
      {beforeEvent ? (
        <EventCountdown
          sticky={headerIsSticky}
          days={dayCount}
          hours={hourCount}
          minutes={minuteCount}
          seconds={secondCount}
        />
      ) : null}
    </div>
  )
}

export default EventHeader
