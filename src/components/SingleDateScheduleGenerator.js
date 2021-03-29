import React from 'react'
import { SingleDateScheduleEntries } from './index'

/**
 * Renders an schedule layout for a single date. Called by {@link ScheduleIndexPage}.
 * @category Layout Helper
 * @function SingleDateScheduleGenerator
 * @param {Object[]} scheduledShowsArr - array of schedule and date objects
 * @prop {String} scheduledShowsArr.date - the full weekday, month name and day for this schedule date
 * @prop {String} scheduledShowsArr.id - used as the id for the columns render in the map; "MM.DD" format
 * @prop {Object[]} scheduledShowsArr.entries - sourced from {@link ScheduleIndexPage} - `sevenDayScheduleData` by {@link fetchSevenDaySchedule}
 * @param {Object} currentTime - dayjs object detailing current time
 * @param {Boolean} isActive - dictates whether to render a date's shows IF there are shows schedule, or to render the fallback {@link NoShowsFallback} component.
 * @returns {jsx}
 */
export default function SingleDateScheduleGenerator({
  scheduledShowsArr,
  currentTime,
  isActive,
}) {
  return scheduledShowsArr.map(({ date, entries, id }, index) => {
    if (isActive === id) {
      return (
        <section
          key={`schedule-for-${id}-${index}`}
          className="columns is-multiline is-vcentered is-mobile schedule-page-entries"
          id={id}
        >
          <div className="column is-12 today-date">
            <p className="title is-size-4-desktop is-size-5-touch has-text-centered">
              {date}
            </p>
          </div>

          {entries !== null ? (
            <SingleDateScheduleEntries
              entries={entries}
              currentTime={currentTime}
            />
          ) : (
            <div className="section is-medium column is-12 content">
              <p className="subtitle is-size-5-desktop is-size-6-touch has-text-centered">
                No shows scheduled!
              </p>
            </div>
          )}
        </section>
      )
    } else {
      return null
    }
  })
}
