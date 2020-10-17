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
  const [beforeEvent, setBeforeEvent] = useState(false);
  const [eventHeight, setEventHeight] = useState(1);
  const [timerHeight, setTimerHeight] = useState(1);

  useEffect(() => {
    const countdownClock = setInterval(() => {
      setCurrentTime(currentTime.add(1, "s"));

      // Check if currentTime is before or same as startDate
      if (currentTime.isSameOrBefore(dayjs(startDate))) {
        setBeforeEvent(true);
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

      if (
        e.target.documentElement.scrollTop >=
        eventHeight + timerHeight - topNavHeight - bottomNavHeight
      ) {
        console.log(
          "Scrolled more than the height of both combined",
          e.target.documentElement.scrollTop
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [eventHeight, timerHeight]);

  const formattedStartDate = formatDateTime(startDate, "first-publication");
  return (
    <div className="container has-background-dark event-timer">
      <div className="columns is-mobile is-vcentered event-title">
        <div className="column is-12 content">
          <RichText render={eventName} htmlSerializer={htmlSerializer} />
        </div>
      </div>
      {beforeEvent ? (
        <div className="columns is-mobile is-vcentered">
          <div className="column is-2">
            <p className="title is-size-3 event-time has-text-centered">145</p>
            <p className="subtitle timer-caption has-text-centered">DAYS</p>
          </div>
          <div className="column is-2">
            <p className="title is-size-3 event-time has-text-centered">145</p>
            <p className="subtitle timer-caption has-text-centered">HOURS</p>
          </div>
          <div className="column is-2">
            <p className="title is-size-3 event-time has-text-centered">145</p>
            <p className="subtitle timer-caption has-text-centered">MINUTES</p>
          </div>
          <div className="column is-2">
            <p className="title is-size-3 event-time has-text-centered">145</p>
            <p className="subtitle timer-caption has-text-centered">SECONDS</p>
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
            <p className="subtitle event-time">{formattedStartDate}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCountdown;
