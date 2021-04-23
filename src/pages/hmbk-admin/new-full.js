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

export default function NewFull() {
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
    { called, loading: isFetching, data: fetchedScheduleData },
  ] = useLazyQuery(GET_ALL_SCHEDULED_SHOWS)

  const recursiveFetchAllSchedules = useCallback(
    async (yesterdayDate, currentCursor = null) => {
      fetchAllScheduledShows({
        variables: { yesterday: yesterdayDate, after: currentCursor },
      })

      console.log(fetchedScheduleData)
      const currentSchedules = fetchedScheduleData.allSchedules.edges.map(
        edge => edge.node
      )

      console.log('currSched', currentSchedules)

      if (!fetchedScheduleData.allSchedules.pageInfo.hasNextPage) {
        return currentSchedules
      }

      const newCursor = fetchedScheduleData.allSchedules.pageInfo.endCursor
      const newSchedules = await recursiveFetchAllSchedules(
        yesterdayDate,
        newCursor
      )

      return [...currrentSchedules, ...newSchedules]
    },
    []
  )

  useEffect(() => {
    const fetchAllSchedules = () => {
      const currTime = formatDateTime(null, 'current-time')
      const yesterday = formatDateTime(currTime, 'prismic-date-query')[0]

      const allSchedules = recursiveFetchAllSchedules(yesterday)
      console.log('called', called)
      setScheduledShows({ data: allSchedules })

      return fetchAllSchedules()
    }
  }, [recursiveFetchAllSchedules])

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
            {scheduledShows && <pre>{JSON.stringify(scheduledShows.data)}</pre>}
          </div>
        </div>
      </section>
    </main>
  )
}
