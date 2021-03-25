import React from 'react'

/**
 * Function that creates styled date selector buttons using today's date and `/schedule`'s `toggleColumn` function
 * @category Site Elements
 * @function DateSelectorButton
 * @param {Object} props - from {@link ScheduleIndexPage}
 * @prop {String[]} datesArr - the next 7 days, today and the 6 after, formatted as `MM.DD`
 * @prop {Function} toggleColumn - is attached to the buttons to change which day's schedule is displayed
 * @returns {jsx} A `<div className="columns">` with column-width buttons to switch between dates on `/schedule`
 */
function DateSelectorButton({ datesArr, toggleColumn }) {
  return (
    <div className="columns is-vcentered is-mobile date-selector">
      {datesArr.map((date, index) => {
        return (
          <div key={`date-#${index}-${date}`} className="column">
            <button
              className="button is-small is-fullwidth is-outlined is-rounded"
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
