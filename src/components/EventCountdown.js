import React from 'react'

function EventCountdown({ sticky, days, hours, minutes, seconds }) {
  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column">
        <p
          className={
            sticky
              ? 'title time-amount is-size-5-desktop is-size-6-touch has-text-centered'
              : 'title time-amount is-size-2 has-text-centered'
          }
        >
          {days}
        </p>
        <p
          className={
            sticky
              ? 'subtitle is-size-6 timer-caption has-text-centered'
              : 'subtitle timer-caption has-text-centered'
          }
        >
          DAYS
        </p>
      </div>
      <div className="column">
        <p
          className={
            sticky
              ? 'title time-amount is-size-5-desktop is-size-6-touch has-text-centered'
              : 'title time-amount is-size-2 has-text-centered'
          }
        >
          {hours}
        </p>
        <p
          className={
            sticky
              ? 'subtitle is-size-6 timer-caption has-text-centered'
              : 'subtitle timer-caption has-text-centered'
          }
        >
          HOURS
        </p>
      </div>
      <div className="column">
        <p
          className={
            sticky
              ? 'title time-amount is-size-5-desktop is-size-6-touch has-text-centered'
              : 'title time-amount is-size-2 has-text-centered'
          }
        >
          {minutes}
        </p>
        <p
          className={
            sticky
              ? 'subtitle is-size-6 timer-caption has-text-centered'
              : 'subtitle timer-caption has-text-centered'
          }
        >
          MINUTES
        </p>
      </div>
      <div className="column">
        <p
          className={
            sticky
              ? 'title time-amount is-size-5-desktop is-size-6-touch has-text-centered'
              : 'title time-amount is-size-2 has-text-centered'
          }
        >
          {seconds}
        </p>
        <p
          className={
            sticky
              ? 'subtitle is-size-6 timer-caption has-text-centered'
              : 'subtitle timer-caption has-text-centered'
          }
        >
          SECONDS
        </p>
      </div>
    </div>
  )
}

export default EventCountdown
