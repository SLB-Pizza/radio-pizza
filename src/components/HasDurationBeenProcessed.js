import React, { useEffect, useState } from 'react'
import { InfoDisplayTimerElement } from './index'

/**
 *
 * @category Layout Helper
 * @function HasDurationBeenProcessed
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} seconds
 * @returns {jsx}
 */
export default function HasDurationBeenProcessed({ hours, minutes, seconds }) {
  const hasDurationProcessed = hours && minutes && seconds

  return hasDurationProcessed ? (
    <>
      {hours > 0 ? <InfoDisplayTimerElement timePortion={hours} /> : null}
      <InfoDisplayTimerElement timePortion={minutes} />
      <InfoDisplayTimerElement timePortion={seconds} isSeconds={true} />
    </>
  ) : (
    <span>loading...</span>
  )
}
