import React from "react";

function EventCountdown() {
  return (
    <div className="timer-container has-background-info">
      <div className="container">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-12">
            <div className="content">
              <h1 className="title">Words</h1>
            </div>
          </div>
        </div>
        <div className="columns is-mobile is-vcentered event-timer">
          <div className="column is-2 event-timer-component">
            <p className="title is-size-1 event-time has-text-centered">145</p>
            <p className="subtitle event-time-caption has-text-centered">
              DAYS
            </p>
          </div>
          <div className="column is-2 event-timer-component">
            <p className="title is-size-1 event-time has-text-centered">145</p>
            <p className="subtitle event-time-caption has-text-centered">
              HOURS
            </p>
          </div>
          <div className="column is-2 event-timer-component">
            <p className="title is-size-1 event-time has-text-centered">145</p>
            <p className="subtitle event-time-caption has-text-centered">
              MINUTES
            </p>
          </div>
          <div className="column is-2 event-timer-component">
            <p className="title is-size-1 event-time has-text-centered">145</p>
            <p className="subtitle event-time-caption has-text-centered">
              SECONDS
            </p>
          </div>
          <div className="column is-4 event-timer-component">
            <button className="button is-medium is-fullwidth is-outlined is-rounded display-text">
              RSVP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCountdown;
