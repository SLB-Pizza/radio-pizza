import React, { useState } from "react";

// TODO: REFACTOR THIS SO THAT THIS IS NOT REPEATING CODE

/**
 * Function that creates styled buttons with toggling functionality built in
 * @category Site Elements
 * @subcategory Layout Helper
 * @component
 * @function DateSelectorButton
 * @param {string[]} buttonTxtArr - array of strings to use as the text displayed in the button
 * @param {string[]} buttonIdArr - array of strings to use as the unique id of the button; used in the passed down toggleColumn function
 * @returns {jsx} A `<div className="columns">` with column-width buttons to switch between dates on `/schedule`
 */

// const

function DateSelectorButton({ date, toggleColumn }) {
  const daysToAdd = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="columns is-vcentered is-mobile mobile-date-selector">
      {daysToAdd.map((number, index) => (
        <div
          key={`date-#${index}-${date.add(number, "day").format("MM.DD")}`}
          className="column"
        >
          <button
            className="button is-small is-fullwidth is-outlined is-rounded"
            id={`${date.add(number, "day").format("MM.DD")}`}
            onClick={toggleColumn}
          >
            {date.add(number, "day").format("MM.DD")}
          </button>
        </div>
      ))}
    </div>
  );
}

export default DateSelectorButton;
