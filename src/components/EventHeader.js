import React, { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import { EventCountdown } from "../components";
import { formatDateTime } from "../utils";
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
 * @function EventHeader
 * @param {*} { startDate, endDate, eventName }
 * @returns {jsx} a bar that appears after the event's image that sticks to the top on scroll
 */
function EventHeader({ startDate, endDate, eventName, location }) {
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
  const [headerIsSticky, setHeaderIsSticky] = useState(false);

  const startDateText = formatDateTime(startDate, "long-form-date-time");
  const endDateText =
    endDate !== null ? formatDateTime(endDate, "long-form-date") : null;

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
        let eventImage = document.querySelector("header.event-image");
        let eventHeader = document.querySelector(".event-header");

        setEventHeight(eventImage.clientHeight);
        setTimerHeight(eventHeader.clientHeight);
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
        setHeaderIsSticky(true);
      } else {
        //...else set to false to deactivate the style changes...
        setHeaderIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [eventHeight, timerHeight, headerIsSticky]);

  return (
    <div
      className="container event-header"
      style={headerIsSticky ? { minHeight: "auto" } : null}
    >
      <div className="columns is-mobile is-vcentered event-title">
        <div className="column is-9">
          <div className="content">
            <p className={headerIsSticky ? "title is-size-4" : "title"}>
              {/* {RichText.asText(eventName)} */}
              {formatDateTime(currentTime, "long-form-date-time")}
            </p>
            <p className={headerIsSticky ? "subtitle is-size-6" : "subtitle"}>
              {endDate
                ? `${startDateText} to ${endDateText} | ${location}`
                : `${startDateText} | ${location}`}
            </p>
          </div>
        </div>
        <div className="column is-3">
          <button
            className={
              headerIsSticky
                ? "button is-fullwidth is-outlined is-rounded display-text"
                : "button is-medium is-fullwidth is-outlined is-rounded display-text"
            }
          >
            RSVP
          </button>
        </div>
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
  );
}

export default EventHeader;