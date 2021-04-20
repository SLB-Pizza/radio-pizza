import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { formatDateTime, sortShowEntriesByStartTime } from '../../utils'
import { HMBKDivider, SingleDateScheduleEntries } from '../../components'
import { AdminHeader } from '../../components/admin'
import { GET_ALL_SCHEDULED_SHOWS } from '../../queries'
/**
 * Renders the `/hmbk-admin/full-schedule/` page to view all currently scheduled shows
 * @category Admin Page
 * @function FullSchedule
 * @returns {jsx}
 */
export default function FullSchedule() {
  const [currentTime, setCurrentTime] = useState(null)
  const [todayDateHeader, setTodayDateHeader] = useState(null)
  const [yesterdayDate, setYesterdayDate] = useState(null)
  const [scheduledShows, setScheduledShows] = useState(null)

  /**
   * useLazyQuery called by {@link executeAllScheduleFetch}.
   * Passes `yesterdayDate` as variables to query.
   * Returns data as `scheduleData` and a loading state as `isFetching`.
   * @category useLazyQueries
   * @param {String} yesterday - day before today; formatted as `"YYYY-MM-DD"` by {@link formatDateTime}
   * @name fetchAllScheduledShows
   */
  const [
    fetchAllScheduledShows,
    { loading: isFetching, data: scheduleData },
  ] = useLazyQuery(GET_ALL_SCHEDULED_SHOWS)

  /**
   * Returns a Prismic Date for yesterday, `YYYY-MM-DD`, to use in {@link executeAllScheduleFetch}
   * @category useEffect
   * @name getYesterdayDate
   */
  useEffect(() => {
    const getYesterdaysDate = () => {
      const currTime = formatDateTime(null, 'current-time')
      const todayHeader = formatDateTime(currTime, 'schedule-date-heading')
      const yesterday = formatDateTime(currTime, 'prismic-date-query')[0]

      // const yesterday = "2019-01-10";
      setCurrentTime(currTime)
      setTodayDateHeader(todayHeader)
      setYesterdayDate(yesterday)
    }
    return getYesterdaysDate()
  }, [])

  /**
   * Runs {@link fetchAllScheduledShows} to get all scheduled shows from today onward
   * @category useEffect
   * @name executeAllScheduleFetch
   */
  useEffect(() => {
    const executeAllScheduleFetch = () => {
      if (yesterdayDate) {
        fetchAllScheduledShows({
          variables: {
            yesterday: yesterdayDate,
          },
        })
      }
    }
    return executeAllScheduleFetch()
  }, [yesterdayDate])

  useEffect(() => {
    const sortAndSetScheduleData = () => {
      let preppedScheduleData = []

      if (scheduleData) {
        const scheduleEdgesArr = scheduleData.allSchedules.edges

        for (let i = 0; i < scheduleEdgesArr.length; i++) {
          const { schedule_date, schedule_entries } = scheduleEdgesArr[i].node

          let currDateObject = {}
          currDateObject.date = formatDateTime(
            schedule_date,
            'schedule-date-heading'
          )
          currDateObject.entries = sortShowEntriesByStartTime(schedule_entries)
          preppedScheduleData.push(currDateObject)
        }
        if (preppedScheduleData.length === 0) {
          return
        } else if (scheduledShows === null) {
          setScheduledShows(preppedScheduleData)
        } else {
          setScheduledShows(...scheduledShows, ...preppedScheduleData)
        }
      }
    }

    return sortAndSetScheduleData()
  }, [scheduleData])

  return (
    <main className="black-bg-page">
      <AdminHeader renderHomeLink={true} />

      <section className="section container is-fluid">
        <div className="columns is-mobile">
          <div className="column is-12 content">
            <h2 className="title">All Scheduled Shows</h2>
            {todayDateHeader && (
              <p className="subtitle">From {todayDateHeader} onwards.</p>
            )}
          </div>
        </div>
      </section>

      {isFetching ? (
        <section className="container is-fluid">
          <div className="section columns is-mobile is-vcentered">
            <HMBKDivider forLoading={true} />
          </div>
        </section>
      ) : (
        <section className="container is-fluid">
          {scheduledShows ? (
            scheduledShows.map(({ date, entries }, index) => (
              <article
                key={`schedule-for-${index}`}
                className="columns is-multiline is-vcentered is-mobile schedule-page-entries"
              >
                <div className="column is-12 schedule-date-header__sched-page">
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
              </article>
            ))
          ) : (
            <article className="columns is-mobile is-multiline schedule-page-entries">
              <div className="column schedule-date-header__sched-page">
                <p className="title is-size-4-desktop is-size-5-touch has-text-centered">
                  No Future Shows Scheduled!
                </p>
              </div>
              <div className="section is-medium column is-12 content">
                <p className="subtitle is-size-5-desktop is-size-6-touch has-text-centered text-block">
                  <a
                    href="https://hmbk-cms.prismic.io/"
                    target="_blank"
                    rel="noopener"
                  >
                    Add some schedule entries to the CMS!
                  </a>
                </p>
              </div>
            </article>
          )}
        </section>
      )}
    </main>
  )
}
