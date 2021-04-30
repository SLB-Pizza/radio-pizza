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
  const [fetchStartTime, setFetchTime] = useState(null)
  const [yesterdayDate, setYesterdayDate] = useState(null)
  const [totalShows, setTotalShows] = useState(null)
  const [categoryLabels, setCategoryLabels] = useState(['All Schedule Dates'])
  const [tempShows, setTempShows] = useState(null)
  const [fetchComplete, setFetchComplete] = useState(false)
  const [scheduledShows, setScheduledShows] = useState(null)
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
   * Triggers `useLazyQuery` {@link fetchAllScheduledShows} on page load.
   * @category useEffect
   * @function initialScheduleFetch
   */
  useEffect(() => {
    const initialFetchSchedules = () => {
      const now = formatDateTime(null, 'current-time')
      const currTime = formatDateTime(now, 'short-form-date-time')
      // const yesterday = formatDateTime(now, "prismic-date-query")[0];
      const yesterday = '2019-01-01'

      setCurrentTime(currTime)
      setYesterdayDate(yesterday)
      setFetchTime(yesterday)
      fetchAllScheduledShows({
        variables: { yesterday },
      })
    }
    initialFetchSchedules()
  }, [])

  /**
   * Process `fetchedScheduleData` every first fetch, and subsequent cursor-add refetches.
   * IF `pageInfohasNextPage`
   *    Combine `tempShows` (if exists), with `currentSchedules`
   *    Refetch using `newCursor
   * ELSE
   *    Combine `tempShows` (if exists), with `currentSchedules`
   *    Mark `fetchComplete` as true, triggers {@link sortAndSetSchedule}
   *    Null `tempShows`
   * @category useEffect
   * @name gatherAllScheduleData
   */
  useEffect(() => {
    const gatherAllScheduleData = async () => {
      if (fetchedScheduleData) {
        const { edges, pageInfo, totalCount } = fetchedScheduleData.allSchedules

        if (!totalShows) {
          setTotalShows(totalCount)
        }

        if (pageInfo.hasNextPage) {
          const newCursor = pageInfo.endCursor

          if (tempShows) {
            setFetchedShows([...tempShows, ...edges])
          } else {
            setFetchedShows(edges)
          }

          fetchAllScheduledShows({
            variables: {
              yesterday: yesterdayDate,
              after: newCursor,
            },
          })
        } else {
          if (tempShows) {
            setFetchedShows([...tempShows, ...edges])
          } else {
            setFetchedShows(edges)
          }
          setFetchComplete(true)
          setTempShows(null)
        }
      }
    }
    gatherAllScheduleData()
  }, [fetchedScheduleData])

  /**
   * Sets values for total number of scheduled shows after today's date, the `scheduledShows` data object array, and the `problemShows` data object array.
   * Runs only when `fetchComplete` is true, as marked by {@link gatherAllScheduleData} and when there's fetched schedule data to process.
   * @category useEffect
   * @name processFetchedScheduleData
   */
  useEffect(() => {
    const processFetchedScheduleData = () => {
      if (fetchComplete && fetchedScheduleData) {
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
         * IF there are no current `problemShows` and
         *    Set `scheduledShows` to the sorted show data
         * ELSE IF `sortedScheduleData` has array elements
         *    Spread the existing `scheduledShows` and new `sortedScheduleData` into a new array to set as `scheduledShows`
         */
        if (problemShows === null && currentFetchProblemShows.length) {
          setProblemShows(currentFetchProblemShows)
          setCategoryLabels(['All Schedule Dates'])
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
          setScheduledShows({
            data: sortedScheduleData,
            hasMore,
            endCursor,
          })
        } else if (sortedScheduleData.length) {
          setScheduledShows({
            data: [...scheduledShows.data, ...sortedScheduleData],
            hasMore,
            endCursor,
          })
        }
      }
    }

    processFetchedScheduleData()
  }, [fetchComplete])

  return (
    <main className="black-bg-page">
      <AdminHeader renderHomeLink={true} />

      <section className="section container is-fluid">
        <div className="columns is-mobile">
          {/* <div className="column content">
            <h2 className="title is-size-4-desktop is-size-5-touch">
              Updates every 10 seconds.
            </h2>
            {fetchStartTime && (
              <p className="subtitle is-size-6-desktop is-size-7-touch">
                <b>Last Schedule Fetch: </b>
                {fetchStartTime}
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
