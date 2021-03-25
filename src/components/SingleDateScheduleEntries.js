import React from 'react'
import { SingleScheduleEntryRow } from './index'
import { formatDateTime } from '../utils'

/**
 * Called by {@link SingleDateScheduleGenerator}.
 * @category Layout Helper
 * @function SingleDateScheduleEntries
 * @param {Object[]} entries
 * @param {Object} currentTime - dayjs object detailing current time
 * @return {jsx}
 */
export default function SingleDateScheduleEntries({ entries, currentTime }) {
  console.log('currentTime', currentTime)
  return (
    <div className="column is-12">
      {entries.map(({ start_time, end_time, scheduled_show }, index) => {
        const formattedStart = formatDateTime(start_time, 'hour-minute')
        const formattedEnd = formatDateTime(end_time, 'hour-minute')

        return (
          // <pre>{JSON.stringify(entry, null, 2)}</pre>
          <SingleScheduleEntryRow
            key={`show-entry-#${index}-${start_time}`}
            start={formattedStart}
            end={formattedEnd}
            show={scheduled_show}
            // upcomingOrNow={}
          />
        )
      })}
    </div>
  )
}
