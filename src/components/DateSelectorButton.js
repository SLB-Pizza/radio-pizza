import React from 'react'

/**
 * Function that creates styled date selector buttons using today's date and `/schedule`'s `toggleColumn` function.
 * Called by: {@link ScheduleIndexPage}
 * @category Site Elements
 * @function DateSelectorButton
 * @param {String[]} datesArr - the next 7 days, today and the 6 after, formatted as `MM.DD`
 * @param {String} activeButton - value of {@link ScheduleIndexPage} `isActive`; used to set `is-active` button class styling
 * @param {Function} toggleColumn - is attached to the buttons to change which day's schedule is displayed
 * @returns {jsx} A `<div className="columns">` with column-width buttons to switch between dates on `/schedule`
 */
function DateSelectorButton({ datesArr, activeButton, toggleColumn }) {
  return (
    <div className="columns is-vcentered is-mobile date-selector">
      {datesArr.map((date, index) => {
        return (
          <div key={`date-button-${date}- ${index}`} className="column">
            <button
              className={
                activeButton === date
                  ? 'button is-fullwidth is-outlined is-rounded is-hidden-touch is-focused'
                  : 'button is-fullwidth is-outlined is-rounded is-hidden-touch'
              }
              id={`${date}`}
              onClick={toggleColumn}
            >
              {date}
            </button>
            <button
              className={
                activeButton === date
                  ? 'button is-small is-fullwidth is-outlined is-rounded is-hidden-desktop is-focused'
                  : 'button is-small is-fullwidth is-outlined is-rounded is-hidden-desktop'
              }
              id={`${date}`}
              onClick={toggleColumn}
            >
              {date}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default DateSelectorButton
