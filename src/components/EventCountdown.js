import React, { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import { formatDateTime, htmlSerializer } from "../utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

/**
 * Component that renders the time remaining and relevant button for each event
 * @category Layout Helper
 * @function EventCountdown
 * @param {*} { startDate, endDate, eventName }
 * @returns {jsx} a bar that appears after the event's image that sticks to the top on scroll
 */
function EventCountdown({ startDate, endDate, eventName }) {
  const [currentTime, setCurrentTime] = useState(
    dayjs().tz("America/New_York")
  );
  const [beforeEvent, setBeforeEvent] = useState(null);
  const [dayCount, setDayCount] = useState(null);
  const [hourCount, setHourCount] = useState(null);
  const [minuteCount, setMinuteCount] = useState(null);
  const [secondCount, setSecondCount] = useState(null);
  const [eventHeight, setEventHeight] = useState(1);
  const [timerHeight, setTimerHeight] = useState(1);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  useEffect(() => {
    const countdownClock = setInterval(() => {
      setCurrentTime(currentTime.add(1, "s"));

      // Check if currentTime is before or same as startDate
      if (currentTime.isSameOrBefore(dayjs(startDate))) {
        setBeforeEvent(true);

        let startDayJS = dayjs(startDate);
        let days = dayjs(startDayJS).diff(currentTime, "day");
        // 24 hours in a day
        let hours = dayjs(startDayJS).diff(currentTime, "hour") % 24;
        // 60 minutes in a hour
        let minutes = dayjs(startDayJS).diff(currentTime, "minute") % 60;
        // 60 seconds in a minute
        let seconds = dayjs(startDayJS).diff(currentTime, "second") % 60;

        setDayCount(days);
        setHourCount(hours);
        setMinuteCount(minutes);
        setSecondCount(seconds);
      }
    }, 1000);

    return () => {
      clearInterval(countdownClock);
    };
  }, [currentTime]);

  useEffect(() => {
    const handleScroll = (e) => {
      // Set base values for the heights of the image and timer component
      if (timerHeight === 1 && eventHeight === 1) {
        let eventHeader = document.querySelector("header.event-header");
        let eventTimer = document.querySelector(".event-timer");

        setEventHeight(eventHeader.clientHeight);
        setTimerHeight(eventTimer.clientHeight);
      }
      let topNav = document.querySelector(".radio-and-schedule-bar");
      let topNavHeight = topNav.offsetHeight;
      let bottomNav = document.querySelector(".navbar.is-fixed-bottom");
      let bottomNavHeight = bottomNav.offsetHeight;

      // If we've scrolled down enough for the event timer to become sticky...
      if (
        e.target.documentElement.scrollTop >=
        eventHeight + timerHeight - topNavHeight - bottomNavHeight
      ) {
        //...make hasScrolled true to activate the style changes...
        setHasScrolledDown(true);
      } else {
        //...else set to false to deactivate the style changes...
        setHasScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [eventHeight, timerHeight, hasScrolledDown]);

  const formattedStartDate = formatDateTime(startDate, "first-publication");
  return (
    <div
      className="container event-timer"
      style={hasScrolledDown ? { minHeight: "auto" } : null}
    >
      <div className="columns is-mobile is-vcentered event-title">
        <div className="column is-12">
          <p className={hasScrolledDown ? "title is-size-4" : "title"}>
            {RichText.asText(eventName)}
          </p>
        </div>
      </div>
      {beforeEvent ? (
        <div className="columns is-mobile is-vcentered">
          <div className="column is-2">
            <p
              className={
                hasScrolledDown
                  ? "title time-amount is-size-4 has-text-centered"
                  : "title time-amount is-size-2 has-text-centered"
              }
            >
              {dayCount}
            </p>
            <p
              className={
                hasScrolledDown
                  ? "subtitle is-size-6 timer-caption has-text-centered"
                  : "subtitle timer-caption has-text-centered"
              }
            >
              DAYS
            </p>
          </div>
          <div className="column is-2">
            <p
              className={
                hasScrolledDown
                  ? "title time-amount is-size-4 has-text-centered"
                  : "title time-amount is-size-2 has-text-centered"
              }
            >
              {hourCount}
            </p>
            <p
              className={
                hasScrolledDown
                  ? "subtitle is-size-6 timer-caption has-text-centered"
                  : "subtitle timer-caption has-text-centered"
              }
            >
              HOURS
            </p>
          </div>
          <div className="column is-2">
            <p
              className={
                hasScrolledDown
                  ? "title time-amount is-size-4 has-text-centered"
                  : "title time-amount is-size-2 has-text-centered"
              }
            >
              {minuteCount}
            </p>
            <p
              className={
                hasScrolledDown
                  ? "subtitle is-size-6 timer-caption has-text-centered"
                  : "subtitle timer-caption has-text-centered"
              }
            >
              MINUTES
            </p>
          </div>
          <div className="column is-2">
            <p
              className={
                hasScrolledDown
                  ? "title time-amount is-size-4 has-text-centered"
                  : "title time-amount is-size-2 has-text-centered"
              }
            >
              {secondCount}
            </p>
            <p
              className={
                hasScrolledDown
                  ? "subtitle is-size-6 timer-caption has-text-centered"
                  : "subtitle timer-caption has-text-centered"
              }
            >
              SECONDS
            </p>
          </div>
          <div className="column is-4">
            <button className="button is-medium is-fullwidth is-outlined is-rounded display-text">
              RSVP
            </button>
          </div>
        </div>
      ) : (
        <div className="columns is-mobile is-vcentered">
          <div className="column is-12 content">
            <p
              className={
                hasScrolledDown
                  ? "subtitle is-size-6 event-time"
                  : "subtitle event-time"
              }
            >
              {formattedStartDate}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCountdown;
