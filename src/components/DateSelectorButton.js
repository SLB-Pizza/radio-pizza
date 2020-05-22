import React, { useState } from "react";

/**
 * @function DateSelectorButton - function that creates styled buttons with toggling functionality built in
 * @param {string[]} props.buttonTxtArr - array of strings to use as the text displayed in the button
 * @param {string[]} props.buttonIdArr - array of strings to use as the unique id of the button; used in the passed down toggleColumn function
 * @returns {jsx} A <div className="columns"> with column-width buttons that
 */

// const

function DateSelectorButton(props) {
  return (
    <div className="columns is-vcentered is-mobile">
      <div className="column">
        <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted display-text">
          {props.date.format("MM.DD")}
        </button>
      </div>
      <div className="column">
        <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
          {props.date.add(1, "d").format("MM.DD")}
        </button>
      </div>
      <div className="column">
        <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
          {props.date.add(2, "d").format("MM.DD")}
        </button>
      </div>
      <div className="column">
        <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
          {props.date.add(3, "d").format("MM.DD")}
        </button>
      </div>
      <div className="column">
        <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
          {props.date.add(4, "d").format("MM.DD")}
        </button>
      </div>
      <div className="column">
        <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
          {props.date.add(5, "d").format("MM.DD")}
        </button>
      </div>
      <div className="column">
        <button className="button is-small is-fullwidth is-outlined is-rounded is-dark is-inverted  display-text">
          {props.date.add(6, "d").format("MM.DD")}
        </button>
      </div>
    </div>
  );
}

export default DateSelectorButton;
