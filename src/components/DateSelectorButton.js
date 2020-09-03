import React from "react";
import { formatDateTime } from "../utils";

/**
 * Function that creates styled date selector buttons using today's date and /schedule's toggleColumn function
 * @category Site Elements
 * @subcategory Layout Helper
 * @component
 * @function DateSelectorButton
 * @param {Object} props - from {@link ScheduleIndexPage}
 * @prop {String} date - today's date as dayjs object
 * @prop {Function} toggleColumn - is attached to the buttons to change which day's schedule is displayed
 * @returns {jsx} A `<div className="columns">` with column-width buttons to switch between dates on `/schedule`
 */
function DateSelectorButton({ date, toggleColumn }) {
  /**
   * Provide additive values to display today and the next six days' worth of schedules.
   */
  const daysToAdd = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="columns is-vcentered is-mobile date-selector">
      {daysToAdd.map((number, index) => {
        const currentDay = formatDateTime(date, "add-days", number);

        return (
          <div key={`date-#${index}-${currentDay}`} className="column">
            <button
              className="button is-small is-fullwidth is-outlined is-rounded"
              id={`${currentDay}`}
              onClick={toggleColumn}
            >
              {currentDay}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default DateSelectorButton;
