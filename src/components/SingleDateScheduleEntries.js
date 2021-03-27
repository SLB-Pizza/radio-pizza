import React from 'react'
import { SingleScheduledShowTimes, SingleScheduledShowTitling } from './index'

/**
 * Renders each of a single date's entries.
 * Called by: {@link SingleDateScheduleGenerator}
 * Calls: {@link SingleScheduledShowTimes}, {@link SingleScheduledShowTitling}
 * @category Layout Helper
 * @function SingleDateScheduleEntries
 * @param {Object[]} entries - array of Schedule entries
 * @prop {String} entries.start_time - Prismic formatted DateTime string
 * @prop {String} entries.end_time - Prismic formatted DateTime string
 * @prop {?String} entries.scheduled_show -
 * @prop {?String} entries.live_show_title -
 * @prop {?String} entries.live_show_guests
 * @param {Object} currentTime - dayjs object detailing current time
 * @return {jsx}
 */
export default function SingleDateScheduleEntries({ entries, currentTime }) {
  return (
    <div className="column is-12">
      {entries.map(
        (
          {
            start_time,
            end_time,
            scheduled_show,
            live_show_title,
            live_show_guests,
          },
          index
        ) => {
          return (
            <div
              key={`single-schedule-show-details-${index}`}
              className="columns is-mobile is-vcentered single-show-entry"
            >
              <SingleScheduledShowTimes start={start_time} end={end_time} />
              <SingleScheduledShowTitling
                preRecordedMix={scheduled_show}
                liveShowTitle={live_show_title}
                liveShowGuests={live_show_guests}
              />
            </div>
          )
        }
      )}
    </div>
  )
}
