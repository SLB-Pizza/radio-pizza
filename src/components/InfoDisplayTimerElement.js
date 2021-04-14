import React from 'react'

/**
 * Renders the individual number portions for the hours (if that lengthy), minutes, and seconds of for the current progress in the mix and the mix's total length.
 * @category Layout Helper
 * @function InfoDisplayTimerElement
 * @param {Number} timePortion - number for the hours, minutes, or seconds set by {@link handleProgress} or {@link handleDuration}
 * @param {?Boolean} isSeconds - when passed true, do not render the `:` after the padded number
 * @returns {jsx}
 */
export default function InfoDisplayTimerElement({ timePortion, isSeconds }) {
  let numToStr = `${timePortion}`

  if (numToStr.length === 1) {
    numToStr = `0${numToStr}`
  }

  if (!isSeconds) {
    numToStr = `${numToStr}:`
  }

  return <span>{numToStr}</span>
}
