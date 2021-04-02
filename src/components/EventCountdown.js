import React from 'react'

/**
 * While the current time is before an event's start time,
 * @category Layout Helper
 * @function EventCountdown
 * @param {Boolean} sticky - dictates how to style the countdown text based on whether the {@link EventHeader} is currently sticky
 * @param {Number} days - number of days until event start
 * @param {Number} hours - number of hours until event start
 * @param {Number} minutes - number of minutes until event start
 * @param {Number} seconds - number of seconds until event start
 * @returns {jsx}
 */
function EventCountdown({ sticky, days, hours, minutes, seconds }) {
  return (
    <div className="columns is-mobile is-vcentered">
      {days >= 1 && (
        <div className="column">
          <p
            className={
              sticky
                ? 'title time-amount is-size-5-desktop is-size-6-touch has-text-centered'
                : 'title time-amount is-size-4-desktop is-size-5-touch has-text-centered'
            }
          >
            {days}
          </p>
          <p className="subtitle is-size-6-tablet is-size-7-mobile timer-caption has-text-centered">
            {days !== 1 ? 'DAYS' : 'DAY'}
          </p>
        </div>
      )}
      <div className="column">
        <p
          className={
            sticky
              ? 'title time-amount is-size-5-desktop is-size-6-touch has-text-centered'
              : 'title time-amount is-size-4-desktop is-size-5-touch has-text-centered'
          }
        >
          {hours}
        </p>
        <p className="subtitle is-size-6-tablet is-size-7-mobile timer-caption has-text-centered">
          {hours !== 1 ? 'HOURS' : 'HOUR'}
        </p>
      </div>
      <div className="column">
        <p
          className={
            sticky
              ? 'title time-amount is-size-5-desktop is-size-6-touch has-text-centered'
              : 'title time-amount is-size-4-desktop is-size-5-touch has-text-centered'
          }
        >
          {minutes}
        </p>
        <p className="subtitle is-size-6-tablet is-size-7-mobile timer-caption has-text-centered">
          {minutes !== 1 ? 'MINUTES' : 'MINUTE'}
        </p>
      </div>
      {days === 0 && (
        <div className="column">
          <p
            className={
              sticky
                ? 'title time-amount is-size-5-desktop is-size-6-touch has-text-centered'
                : 'title time-amount is-size-4-desktop is-size-5-touch has-text-centered'
            }
          >
            {seconds}
          </p>
          <p className="subtitle is-size-6-tablet is-size-7-mobile timer-caption has-text-centered">
            {seconds !== 1 ? 'SECONDS' : 'SECOND'}
          </p>
        </div>
      )}
    </div>
  )
}

export default EventCountdown
