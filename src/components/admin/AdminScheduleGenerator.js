import React from 'react'
import { OnAirScheduleTag, SingleScheduledShowTitling } from '../index'
import { AdminSingleShowTimes } from './index'
import { isCurrentShowLive } from '../../utils'

/**
 * Renders each of a single date's entries.
 * Called by: {@link SingleDateScheduleGenerator}
 * Calls: {@link AdminSingleShowTimes}, {@link SingleScheduledShowTitling}
 * @category Layout Helper
 * @function AdminScheduleGenerator
 * @param {Object[]} entries - array of Schedule entries
 * @prop {String} entries.start_time - Prismic formatted DateTime string
 * @prop {String} entries.end_time - Prismic formatted DateTime string
 * @prop {?String} entries.scheduled_show - Prismic Mix data object; #1 render choice of {@link SingleScheduledShowTitling}
 * @prop {?String} entries.live_show_title - live show titling details
 * @prop {?String} entries.live_show_guests - live show guests details
 * @param {Object} currentTime - dayjs object detailing current time
 * @return {jsx}
 */
export default function AdminScheduleGenerator({ entries, currentTime }) {
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
          let hasMissingInfo

          /**
           * If show has both start and end times, determine whether it's currently live (to render the {@link OnAirScheduleTag}), and render the schedule entry's data.
           */
          if (start_time && end_time) {
            isNowPlaying = isCurrentShowLive(currentTime, start_time, end_time)
            hasMissingInfo = true
          } else {
            hasMissingInfo = false
          }

          /**
           * Check whether one of
           */

          return (
            <div
              key={`single-schedule-show-details-${index}`}
              className={
                hasMissingInfo
                  ? 'columns is-mobile is-multiline is-vcentered single-show-entry'
                  : 'columns is-mobile is-multiline is-vcentered single-show-entry has-background-danger'
              }
            >
              {isNowPlaying && <OnAirScheduleTag />}
              <AdminSingleShowTimes
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
        }
      )}
    </div>
  )
}
