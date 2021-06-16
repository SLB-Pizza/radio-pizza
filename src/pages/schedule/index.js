import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Helmet } from 'react-helmet'
import {
  DateSelectorButton,
  SingleDateScheduleGenerator,
  useSiteMetadata,
} from '../../components'
import { formatDateTime, sortShowEntriesByStartTime } from '../../utils'
import { GET_SEVEN_DAY_SCHEDULE } from '../../queries'

/**
 * Layout for the `/schedule` page.
 * @category Pages
 * @function ScheduleIndexPage
 * @returns {jsx}
 */
function ScheduleIndexPage() {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()

  const [todayDate, setTodayDate] = useState(null)
  const [isActive, setIsActive] = useState(null)
  const [dateBtnLabels, setDateBtnLabels] = useState(null)
  const [dateHeaders, setDateHeaders] = useState(null)
  const [datesToMatch, setDatesToMatch] = useState(null)
  const [scheduleFetchDates, setFetchDates] = useState(null)
  const [thisWeekSchedule, setThisWeekSchedule] = useState(null)

  /**
   * useLazyQuery called by {@link executeScheduleFetch}.
   * Passes `scheduleFetchDates` as variables to query.
   * Returns data as `sevenDayScheduleData` and a loading state as `isFetching`.
   * @category useLazyQueries
   * @param {String} yesterday - day before today; formatted as `"YYYY-MM-DD"` by {@link formatDateTime}
   * @param {String} dayAndAWeek eight days after today; formatted as `"YYYY-MM-DD"` by {@link formatDateTime}
   * @name fetchSevenDaySchedule
   */
  const [
    fetchSevenDaySchedule,
    { loading: isFetching, data: sevenDayScheduleData },
  ] = useLazyQuery(GET_SEVEN_DAY_SCHEDULE)

  /**
   * Set initial values for `/schedule` state and fetches the current seven day schedule.
   *
   * 1. Set `todayDate` using {@link formatDateTime}
   * 2. Set `isActive` using formatted `todayDate`; "MM.DD"
   * 3. Set `dateBtnLabels` setDateBtnLabels `convertedDates.dateLabels`
   * 4. Set `datesToMatch` using `convertedDates.queryMatching`
   * 5. Fetch the schedule for the next seven days -- today and next 6 days
   * - Set variables for query use
   * -- `$yesterday`:   day today before today
   * -- `$weekAndADay`: eight days after today
   * @category useEffect
   * @name loadSevenDaySchedule
   */
  useEffect(() => {
    const loadSevenDaySchedule = () => {
      // #1
      const currTime = formatDateTime(null, 'current-time')
      setTodayDate(currTime)

      // #2
      const todayInMMDD = formatDateTime(currTime, 'month-day')
      setIsActive(todayInMMDD)

      // #3, 4
      const convertedDates = formatDateTime(currTime, 'get-this-weeks-dates')
      const { btnLabels, queryMatching, dateHeadings } = convertedDates
      setDateBtnLabels(btnLabels)
      setDatesToMatch(queryMatching)
      setDateHeaders(dateHeadings)

      // #5
      const queryDatesArr = formatDateTime(currTime, 'prismic-date-query')
      setFetchDates({
        yesterday: queryDatesArr[0],
        weekAndADay: queryDatesArr[1],
      })
    }
    return loadSevenDaySchedule()
  }, [])

  /**
   * Fetch new schedule info by calling {@link fetchSevenDaySchedule} when `scheduleFetchDates` is initially set, or changes because of a day change.
   * @category useEffect
   * @name executeSevenDayScheduleFetch
   */
  useEffect(() => {
    const executeSevenDayScheduleFetch = () => {
      if (scheduleFetchDates) {
        fetchSevenDaySchedule({
          variables: {
            yesterday: scheduleFetchDates.yesterday,
            weekAndADay: scheduleFetchDates.weekAndADay,
          },
        })
      }
    }
    return executeSevenDayScheduleFetch()
  }, [scheduleFetchDates])

  /**
   * Fetch new schedule info by calling {@link fetchSevenDaySchedule} when `scheduleFetchDates` is initially set, or changes because of a day change.
   * @category useEffect
   * @name executeScheduleFetch
   */
  useEffect(() => {
    const updateThisWeeksSchedule = () => {
      let datedScheduleEntries = []

      if (sevenDayScheduleData) {
        for (let i = 0; i < datesToMatch.length; i++) {
          const currDate = datesToMatch[i]
          const currHeading = dateHeaders[i]
          const currLabel = dateBtnLabels[i]

          let currDateObject = {}
          currDateObject.date = currHeading
          currDateObject.id = currLabel
          currDateObject.entries = null

          for (
            let j = 0;
            j < sevenDayScheduleData.allSchedules.edges.length;
            j++
          ) {
            const {
              schedule_date,
              schedule_entries,
            } = sevenDayScheduleData.allSchedules.edges[j].node

            if (currDate === schedule_date) {
              const sortedEntries = sortShowEntriesByStartTime(schedule_entries)

              currDateObject.entries = sortedEntries
            }
          }
          datedScheduleEntries.push(currDateObject)
        }
        setThisWeekSchedule(datedScheduleEntries)
      }
    }
    return updateThisWeeksSchedule()
  }, [sevenDayScheduleData])

  function toggleColumn(e) {
    if (isActive !== e.currentTarget.id) {
      setIsActive(e.currentTarget.id)
    }
  }

  /**
   * Update today's date every second.
   * @category useEffect
   * @name updateTimeEverySecond
   */
  useEffect(() => {
    const updateTimeEverySecond = setInterval(() => {
      setTodayDate(todayDate.add(1, 's'))
    }, 1000)

    return () => {
      clearInterval(updateTimeEverySecond)
    }
  }, [todayDate])

  return (
    <main className="container is-fluid black-bg-page">
      <Helmet defer={false}>
        <title>{`Schedule | ${title} | Ears to the concrete.`}</title>
        <meta
          property="og:title"
          content={`Schedule | ${title} | Ears to the concrete.`}
        />
        <meta property="og:url" content={`${siteUrl}/schedule/`} />
        <meta
          name="twitter:title"
          content={`Schedule | ${title} | Ears to the concrete.`}
        />
      </Helmet>

      <div className="columns is-mobile is-multiline">
        <div className="column">
          <h1 className="title is-size-3-desktop is-size-5-touch">
            Broadcast Schedule
          </h1>
          <h2 className="subtitle is-size-5-desktop is-size-6-touch">
            All times are EST.
          </h2>
        </div>
      </div>
      {dateBtnLabels && (
        <DateSelectorButton
          datesArr={dateBtnLabels}
          activeButton={isActive}
          toggleColumn={toggleColumn}
        />
      )}
      {thisWeekSchedule && (
        <SingleDateScheduleGenerator
          currentTime={todayDate}
          scheduledShowsArr={thisWeekSchedule}
          isActive={isActive}
        />
      )}
    </main>
  )
}

export default ScheduleIndexPage
