import React from 'react'
import {
  OnAirScheduleTag,
  SingleScheduledShowTimes,
  SingleScheduledShowTitling,
} from './index'
import { isCurrentShowLive } from '../utils'

/**
 * Renders each of a single date's entries.
 * Called by: {@link SingleDateScheduleGenerator}
 * Calls: {@link SingleScheduledShowTimes}, {@link SingleScheduledShowTitling}
 * @category Layout Helper
 * @function SingleDateScheduleEntries
 * @param {Object[]} entries - array of Schedule entries
 * @prop {String} entries.start_time - Prismic formatted DateTime string
 * @prop {String} entries.end_time - Prismic formatted DateTime string
 * @prop {?String} entries.scheduled_show - Prismic Mix data object; #1 render choice of {@link SingleScheduledShowTitling}
 * @prop {?String} entries.live_show_title - live show titling details
 * @prop {?String} entries.live_show_guests - live show guests details
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
          let isNowPlaying = false

          /**
           * Determine whether show is live ONLY IF show has both start and end times.
           */
          if (start_time && end_time) {
            isNowPlaying = isCurrentShowLive(currentTime, start_time, end_time)
            return (
              <div
                key={`single-schedule-show-details-${index}`}
                className="columns is-mobile is-multiline is-vcentered single-show-entry"
              >
                {isNowPlaying && <OnAirScheduleTag />}
                <SingleScheduledShowTimes
                  start={start_time}
                  end={end_time}
                  isNowPlaying={isNowPlaying}
                />
                <SingleScheduledShowTitling
                  preRecordedMix={scheduled_show}
                  liveShowTitle={live_show_title}
                  liveShowGuests={live_show_guests}
                />
              </div>
            )
          } else {
            return null
          }
        }
      )}
    </div>
  )
}
