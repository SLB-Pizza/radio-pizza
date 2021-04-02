import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import NanoClamp from 'nanoclamp'
import {
  EventCountdown,
  EventDateTimeLocationInfo,
  EventHeaderButton,
  EventInfoButtons,
} from '../components'
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
 * @param {String} startDate - Prismic formatted DateTime string
 * @param {?String} endDate - Prismic formatted DateTime string
 * @param {Object[]} eventName - Prismic RichText array
 * @param {String} location - name of the event location
 * @param {?String} headerButtonText - label to for the action button
 * @param {?Object} headerButtonLink - React link object
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
  const [currentTime, setCurrentTime] = useState(
    formatDateTime(null, 'current-time')
  )
  const [dayCount, setDayCount] = useState(null)
  const [hourCount, setHourCount] = useState(null)
  const [minuteCount, setMinuteCount] = useState(null)
  const [secondCount, setSecondCount] = useState(null)
  const [eventHeight, setEventHeight] = useState(1)
  const [timerHeight, setTimerHeight] = useState(1)
  const [beforeEvent, setBeforeEvent] = useState(null)
  const [headerIsSticky, setHeaderIsSticky] = useState(false)

  headerButtonText =
    'Super long text to test what happens when you add a long description'
  const hasEventButton = headerButtonText && headerButtonLink
  const renderEventButton = hasEventButton && beforeEvent

  /**
   * Renders a countdown clock that tells you the amount of time remaining between now and `event_start`.
   * @category useEffect
   * @name eventCountdownClock
   */
  useEffect(() => {
    const eventCountdownClock = setInterval(() => {
      // startDate = "2021-04-01T20:17:00+0000";
      let startDayJS = dayjs(startDate)
      setCurrentTime(currentTime.add(1, 's'))

      // Check if currentTime is before or same as startDate
      if (currentTime.isSameOrBefore(startDayJS)) {
        let days = dayjs(startDayJS).diff(currentTime, 'day')

        // 24 hours in a day
        let hours = dayjs(startDayJS).diff(currentTime, 'hour') % 24

        // 60 minutes in a hour
        let minutes = dayjs(startDayJS).diff(currentTime, 'minute') % 60

        // 60 seconds in a minute
        let seconds = dayjs(startDayJS).diff(currentTime, 'second') % 60

        setBeforeEvent(true)
        setDayCount(days)
        setHourCount(hours)
        setMinuteCount(minutes)
        setSecondCount(seconds)
      } else {
        /**
         * Remove event timer if event has started already.
         */
        setBeforeEvent(false)
      }
    }, 1000)

    return () => {
      clearInterval(eventCountdownClock)
    }
  }, [currentTime])

  /**
   * useEffect that listens to this event page to see if this component should be made sticky under the {@link ScheduleBar}.
   * @category useEffect
   * @name makeEventHeaderSticky
   */
  useEffect(() => {
    const handleScroll = e => {
      // Set base values for the heights of the image and timer component
      if (timerHeight === 1 && eventHeight === 1) {
        let eventImage = document.querySelector('.event-image')
        let eventHeader = document.querySelector('.event-header')

        /**
         * Using clientHeight here because neither eventImage nor eventHeader has a border to account for.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight Element.clientHeight - MDN}
         */
        setEventHeight(eventImage.clientHeight)
        setTimerHeight(eventHeader.clientHeight)
        return
      }

      let topNav = document.querySelector('.radio-and-schedule-bar')
      let bottomNav = document.querySelector('.navbar.is-fixed-bottom')

      /**
       * Using offsetHeight here because both topNav and bottomNav have borders to account for.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight HTMLElement.offsetHeight - MDN}
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

    // Limit checks to every 1/10 second, instead of on every pixel change
    const makeEventHeaderSticky = _.throttle(handleScroll, 100)

    window.addEventListener('scroll', makeEventHeaderSticky)

    return () => {
      window.removeEventListener('scroll', makeEventHeaderSticky)
    }
  }, [eventHeight, timerHeight, headerIsSticky])

  return (
    <div className="container is-fluid event-header">
      <div className="columns is-mobile is-multiline is-vcentered event-title">
        <EventDateTimeLocationInfo
          isSticky={headerIsSticky}
          renderEventButton={renderEventButton}
          headerButtonLink={headerButtonLink}
          eventName={eventName}
          start={startDate}
          end={endDate}
          location={location}
        />

        {beforeEvent && headerButtonLink ? (
          <EventHeaderButton
            buttonText={headerButtonText}
            buttonLink={headerButtonLink}
            isSticky={headerIsSticky}
          />
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
