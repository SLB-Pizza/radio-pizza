import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  filterProblemSingleShows,
  formatDateTime,
  sortShowEntriesByStartTime,
} from '../../utils'
import { HMBKDivider } from '../../components'
import { HMBKFooter } from '../../components/helpers'
import {
  AdminAllSchedules,
  AdminHeader,
  AdminTotalShowsReport,
  NoFutureShowsScheduled,
} from '../../components/admin'
import { GET_ALL_SCHEDULED_SHOWS } from '../../queries'
/**
 * Renders the `/hmbk-admin/full-schedule/` page to view all currently scheduled shows
 * @category Admin Page
 * @function FullSchedule
 * @returns {jsx}
 */
export default function FullSchedules() {
  const [currentTime, setCurrentTime] = useState(null)
  const [fetchTime, setFetchTime] = useState(null)
  const [yesterdayDate, setYesterdayDate] = useState(null)
  const [totalShows, setTotalShows] = useState(null)
  const [categoryLabels, setCategoryLabels] = useState(['All Schedule Dates'])
  const [scheduledShows, setScheduledShows] = useState({
    data: null,
    hasMore: null,
    endCursor: null,
  })
  const [problemShows, setProblemShows] = useState(null)

  /**
   * useLazyQuery called by {@link executeAllScheduleFetch}.
   * Passes `yesterdayDate` as variables to query.
   * Returns data as `fetchedScheduleData` and a loading state as `isFetching`.
   * @category useLazyQueries
   * @param {String} yesterday - day before today; formatted as `"YYYY-MM-DD"` by {@link formatDateTime}
   * @name fetchAllScheduledShows
   */
  const [
    fetchAllScheduledShows,
    { loading: isFetching, data: fetchedScheduleData },
  ] = useLazyQuery(GET_ALL_SCHEDULED_SHOWS)

  /**
   * Triggers schedule fetch `useLazyQuery` into action; called by {@link initialScheduleDataFetch} and {@link refreshScheduleData}
   * @category useEffect
   * @function scheduleDataFetch
   */
  const scheduleDataFetch = () => {
    const currTime = formatDateTime(null, 'current-time')
    const lastFetchTime = formatDateTime(currTime, 'short-form-date-time')
    const yesterday = formatDateTime(currTime, 'prismic-date-query')[0]

    // const yesterday = "2019-01-10";
    setCurrentTime(currTime)
    setFetchTime(lastFetchTime)
    setYesterdayDate(yesterday)
  }

  /**
   * Returns a Prismic Date for yesterday, `YYYY-MM-DD`, to use in {@link executeAllScheduleFetch}. The initial schedule data fetch.
   * @category useEffect
   * @name initialScheduleDataFetch
   */
  useEffect(() => {
    return scheduleDataFetch()
  }, [])

  /**
   * Returns a Prismic Date for yesterday, `YYYY-MM-DD`, to use in {@link executeAllScheduleFetch}. Updates every ten seconds.
   * @category useEffect
   * @name refreshScheduleData
   */
  useEffect(() => {
    const refreshScheduleData = setInterval(() => scheduleDataFetch(), 10000)
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
        if (scheduledShows.endCursor) {
          fetchAllScheduledShows({
            variables: {
              yesterday: yesterdayDate,
              after: scheduledShows.endCursor,
            },
          })
        } else {
          fetchAllScheduledShows({
            variables: {
              yesterday: yesterdayDate,
            },
          })
        }
      }
    }
    return executeAllScheduleFetch()
  }, [yesterdayDate])

  /**
   * Sets values for total number of scheduled shows after today's date, the `scheduledShows` data object array, and the `problemShows` data obecjt array.
   * @category useEffect
   * @name sortAndScheduleData
   */
  useEffect(() => {
    const sortAndSetScheduleData = () => {
      if (fetchedScheduleData) {
        if (!totalShows) {
          setTotalShows(fetchedScheduleData.allSchedules.totalCount)
        }

        const scheduleEdgesArr = fetchedScheduleData.allSchedules.edges
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
        if (problemShows === null && currentFetchProblemShows.length) {
          setProblemShows(currentFetchProblemShows)
          setCategoryLabels(['All Schedule Dates', 'Problem Dates'])
        } else if (currentFetchProblemShows.length) {
          setProblemShows([...problemShows, ...currentFetchProblemShows])
          setCategoryLabels(['All Schedule Dates', 'Problem Dates'])
        }

        /**
         * IF `scheduledShows` hasn't been initially set
         *    Set `scheduledShows` to the sorted show data
         * ELSE IF `sortedScheduleData` has array elements
         *    Spread the existing `scheduledShows` and new `sortedScheduleData` into a new array to set as `scheduledShows`
         */
        const hasMore = fetchedScheduleData.hasMore
        const endCursor = fetchedScheduleData.endCursor

        if (scheduledShows.data === null && sortedScheduleData.length) {
          setScheduledShows({ data: sortedScheduleData, hasMore, endCursor })
        } else if (sortedScheduleData.length) {
          setScheduledShows({
            data: [...scheduledShows.data, ...sortedScheduleData],
            hasMore,
            endCursor,
          })
        }
      }
    }

    return sortAndSetScheduleData()
  }, [fetchedScheduleData])

  return (
    <main className="black-bg-page">
      <AdminHeader renderHomeLink={true} />

      <section className="section container is-fluid">
        <div className="columns is-mobile">
          {/* <div className="column content">
            <h2 className="title is-size-4-desktop is-size-5-touch">
              Updates every 10 seconds.
            </h2>
            {fetchTime && (
              <p className="subtitle is-size-6-desktop is-size-7-touch">
                <b>Last Schedule Fetch: </b>
                {fetchTime}
              </p>
            )}
          </div> */}

          {/* <AdminTotalShowsReport
            totalShows={totalShows}
            problemShows={problemShows}
          /> */}
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
          {scheduledShows?.data ? (
            <AdminAllSchedules
              showsArr={scheduledShows.data}
              currentTime={currentTime}
            />
          ) : (
            <NoFutureShowsScheduled />
          )}
        </section>
      )}
      <HMBKFooter />
    </main>
  )
}
