import React, { useEffect } from 'react'
import { SingleDateScheduleEntries } from './index'

/**
 * Called by {@link ScheduleIndexPage}.
 * @category Layout Helper
 * @function SingleDateScheduleGenerator
 * @param {Object[]} scheduledShowsArr - array of schedule and date objects
 * @param {Object} currentTime - dayjs object detailing current time
 * @param {Boolean} isActive - dictates whether to render a date's shows IF there are shows schedule, or to render the fallback {@link NoShowsFallback} component.
 * @returns {jsx}
 */
export default function SingleDateScheduleGenerator({
  scheduledShowsArr,
  currentTime,
  isActive,
}) {
  /**
   * @category useEffect
   * @name markCurrentAndUpcomingShow
   */
  useEffect(() => {
    const markCurrentAndUpcomingShow = () => {}
    return markCurrentAndUpcomingShow()
  }, [currentTime])

  return (
    <section className="section container is-fluid">
      {scheduledShowsArr.map(({ date, entries, id }, index) => {
        if (isActive === id) {
          return (
            <div
              key={`schedule-for-${id}-${index}`}
              className="columns is-multiline is-vcentered is-mobile schedule-page-entries"
              id={id}
            >
              <div className="column is-12 today-date">
                <p className="title is-size-4-desktop is-size-6-touch has-text-centered">
                  {date}
                </p>
              </div>

              {entries !== null ? (
                <SingleDateScheduleEntries
                  entries={entries}
                  currentTime={currentTime}
                />
              ) : (
                <div className="column is-12">
                  <div className="content">
                    <p className="subtitle is-size-5-desktop is-size-6-touch has-text-centered">
                      No shows scheduled!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        } else {
          return null
        }
      })}
    </section>
  )
}
