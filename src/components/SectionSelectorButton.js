import React, { useState } from "react";

/**
 * @function SectionSelectorButton - function that creates styled buttons with toggling functionality built in
 * @param {string[]} props.buttonTxtArr - array of strings to use as the text displayed in the button
 * @param {string[]} props.buttonIdArr - array of strings to use as the unique id of the button; used in the passed down toggleColumn function
 * @returns {jsx} A <div className="columns"> with column-width buttons that
 */

// const

function SectionSelectorButton(props) {
  return <div className="columns is-mobile is-hidden-mobile">{props}</div>;
}

export default SectionSelectorButton;
