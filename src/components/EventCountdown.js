import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const countdownClock = setInterval(() => {
      setCurrentTime(currentTime.add(1, "s"));
    }, 1000);

    return () => {
      clearInterval(countdownClock);
    };
  });

  return (
    <div className="container has-background-dark event-timer">
      <div className="columns is-mobile is-vcentered event-title">
        <div className="column is-12">
          <div className="content">
            <h1 className="title">{currentTime.format("HH:mm:ss")}</h1>
          </div>
        </div>
      </div>
      <div className="columns is-mobile is-vcentered">
        <div className="column is-2 timer-component">
          <p className="title is-size-1 event-time has-text-centered">145</p>
          <p className="subtitle timer-caption has-text-centered">DAYS</p>
        </div>
        <div className="column is-2 timer-component">
          <p className="title is-size-1 event-time has-text-centered">145</p>
          <p className="subtitle timer-caption has-text-centered">HOURS</p>
        </div>
        <div className="column is-2 timer-component">
          <p className="title is-size-1 event-time has-text-centered">145</p>
          <p className="subtitle timer-caption has-text-centered">MINUTES</p>
        </div>
        <div className="column is-2 timer-component">
          <p className="title is-size-1 event-time has-text-centered">145</p>
          <p className="subtitle timer-caption has-text-centered">SECONDS</p>
        </div>
        <div className="column is-4 timer-component">
          <button className="button is-medium is-fullwidth is-outlined is-rounded display-text">
            RSVP
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCountdown;
