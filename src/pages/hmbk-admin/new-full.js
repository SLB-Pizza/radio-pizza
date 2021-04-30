import React, { useCallback, useEffect, useState } from 'react'
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
 *
 *
 * @export
 * @returns
 */
export default function NewFull() {
  const [currentTime, setCurrentTime] = useState(null)
  const [fetchTime, setFetchTime] = useState(null)
  const [yesterdayDate, setYesterdayDate] = useState(null)
  const [totalShows, setTotalShows] = useState(null)
  const [categoryLabels, setCategoryLabels] = useState(['All Schedule Dates'])
  const [tempShows, setTempShows] = useState(null)
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
    { loading, data: fetchedScheduleData },
  ] = useLazyQuery(GET_ALL_SCHEDULED_SHOWS)

  useEffect(() => {
    const fetchAllSchedules = async () => {
      const currTime = formatDateTime(null, 'current-time')
      // const yesterday = formatDateTime(currTime, "prismic-date-query")[0];
      const yesterday = '2019-01-01'

      setYesterdayDate(yesterday)
      fetchAllScheduledShows({
        variables: { yesterday },
      })
    }
    fetchAllSchedules()
  }, [])

  /**
   * Process `fetchedScheduleData` after the first fetch.
   * IF `pageInfohasNextPage`
   *    Combine `tempShows` (if exists), with `currentSchedules`
   *    Refetch using `newCursor
   * ELSE
   *    Combine `tempShows` (if exists), with `currentSchedules`
   *    Null `tempShows`
   * @category useEffect
   * @name processShowAndFetchMore
   */
  useEffect(() => {
    const processShowAndFetchMore = async () => {
      if (fetchedScheduleData) {
        const { edges, pageInfo, totalCount } = fetchedScheduleData.allSchedules
        if (pageInfo.hasNextPage) {
          const newCursor = pageInfo.endCursor

          if (tempShows) {
            setTempShows([...tempShows, ...edges])
          } else {
            setTempShows(edges)
          }

          fetchAllScheduledShows({
            variables: { yesterday: yesterdayDate, after: newCursor },
          })
        } else {
          if (tempShows) {
            setScheduledShows([...tempShows, ...edges])
          } else {
            setScheduledShows(edges)
          }
          setTempShows(null)
        }
      }
    }
    processShowAndFetchMore()
  }, [fetchedScheduleData])

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
        </div>
      </section>

      <section className="section container is-fluid">
        <div className="columns is-mobile">
          <div className="column content">
            {scheduledShows && (
              <>
                <p>{scheduledShows.length}</p>
                <pre>{JSON.stringify(scheduledShows, null, 2)}</pre>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
