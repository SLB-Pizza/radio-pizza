import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  filterProblemSingleShows,
  formatDateTime,
  sortShowEntriesByStartTime,
} from '../../utils'
import { HMBKDivider } from '../../components'
import { HMBKFooter } from '../../components/helpers'
import { AdminHeader, AdminScheduleGenerator } from '../../components/admin'
import { GET_ALL_SCHEDULED_SHOWS } from '../../queries'
/**
 * Renders the `/hmbk-admin/full-schedule/` page to view all currently scheduled shows
 * @category Admin Page
 * @function FullSchedule
 * @returns {jsx}
 */
export default function FullSchedule() {
  const [currentTime, setCurrentTime] = useState(null)
  const [fetchTime, setFetchTime] = useState(null)
  const [yesterdayDate, setYesterdayDate] = useState(null)
  const [scheduledShows, setScheduledShows] = useState(null)
  const [problemShows, setProblemShows] = useState(null)
  const [totalShows, setTotalShows] = useState(null)

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
   * Returns a Prismic Date for yesterday, `YYYY-MM-DD`, to use in {@link executeAllScheduleFetch}. The initial schedule fetch
   * @category useEffect
   * @name initialScheduleDataFetch
   */
  useEffect(() => {
    const initialScheduleDataFetch = () => {
      const currTime = formatDateTime(null, 'current-time')
      const lastFetchTime = formatDateTime(currTime, 'short-form-date-time')
      // const yesterday = formatDateTime(currTime, "prismic-date-query")[0];

      const yesterday = '2019-01-10'
      setCurrentTime(currTime)
      setFetchTime(lastFetchTime)
      setYesterdayDate(yesterday)
    }

    return initialScheduleDataFetch()
  }, [])

  /**
   * Returns a Prismic Date for yesterday, `YYYY-MM-DD`, to use in {@link executeAllScheduleFetch}. Updates every ten seconds.
   * @category useEffect
   * @name refreshScheduleData
   */
  useEffect(() => {
    const refreshScheduleData = setInterval(() => {
      const currTime = formatDateTime(null, 'current-time')
      const lastFetchTime = formatDateTime(currTime, 'short-form-date-time')
      // const yesterday = formatDateTime(currTime, "prismic-date-query")[0];

      const yesterday = '2019-01-10'
      setCurrentTime(currTime)
      setFetchTime(lastFetchTime)
      setYesterdayDate(yesterday)
    }, 10000)

    return () => clearInterval(refreshScheduleData)
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
      if (scheduleData) {
        if (!totalShows) {
          setTotalShows(scheduleData.allSchedules.totalCount)
        }

        const scheduleEdgesArr = scheduleData.allSchedules.edges
        let sortedScheduleData = []
        let currentFetchProblemShows = []

        for (let i = 0; i < scheduleEdgesArr.length; i++) {
          const { schedule_date, schedule_entries } = scheduleEdgesArr[i].node
          const currShowDate = formatDateTime(
            schedule_date,
            'schedule-date-heading'
          )

          let currDateObject = {}
          currDateObject.date = currShowDate
          currDateObject.entries = sortShowEntriesByStartTime(schedule_entries)
          sortedScheduleData.push(currDateObject)

          /**
           * Check single entries in this date's show array for issues for with missing times and/or missing show selection/live show info.
           */
          let singleProblemDate = {}
          singleProblemDate.date = currShowDate
          singleProblemDate.entries = []
          filterProblemSingleShows(singleProblemDate, schedule_entries)

          // Push to currentFetchProblemShows only if the entries array has length
          if (singleProblemDate.entries.length !== 0) {
            currentFetchProblemShows.push(singleProblemDate)
          }
        }
        /**
         * IF `scheduledShows` hasn't been initially set
         *    Set `scheduledShows` to the sorted show data
         * ELSE IF `sortedScheduleData` has array elements
         *    Spread the existing `scheduledShows` and new `sortedScheduleData` into a new array to set as `scheduledShows`
         */
        if (problemShows === null) {
          setProblemShows(currentFetchProblemShows)
        } else if (currentFetchProblemShows.length) {
          setProblemShows([...problemShows, ...currentFetchProblemShows])
        }

        /**
         * IF `scheduledShows` hasn't been initially set
         *    Set `scheduledShows` to the sorted show data
         * ELSE IF `sortedScheduleData` has array elements
         *    Spread the existing `scheduledShows` and new `sortedScheduleData` into a new array to set as `scheduledShows`
         */
        if (scheduledShows === null) {
          setScheduledShows(sortedScheduleData)
        } else if (sortedScheduleData.length) {
          setScheduledShows([...scheduledShows, ...sortedScheduleData])
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
          <div className="column content">
            <h2 className="title is-size-4-desktop is-size-5-touch">
              Updates every 10 seconds.
            </h2>
            {fetchTime && (
              <p className="subtitle is-size-6-desktop is-size-7-touch">
                <b>Last Schedule Fetch: </b>
                {fetchTime}
              </p>
            )}
          </div>

          <div className="column content">
            {totalShows && (
              <h3 className="title is-size-4-desktop is-size-5-touch">{`${totalShows} future dates with scheduled shows`}</h3>
            )}
            {problemShows && (
              <p className="subtitle is-size-6-desktop is-size-7-touch">{`${problemShows.length} dates that have problems with one or more show entries.`}</p>
            )}
          </div>
        </div>
      </section>

      {/* {problemShows && <pre>{JSON.stringify(problemShows, null, 2)}</pre>} */}

      {isFetching ? (
        <section className="container is-fluid">
          <div className="section columns is-mobile is-vcentered">
            <HMBKDivider forLoading={true} />
          </div>
        </section>
      ) : (
        <section className="container is-fluid">
          <div className="columns">
            <div className="column is-12 content">
              <h3 className="title">All Scheduled Shows</h3>
            </div>
          </div>
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
                  <AdminScheduleGenerator
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
      <HMBKFooter />
    </main>
  )
}
