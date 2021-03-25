import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { DateSelectorButton, SingleScheduleEntryRow } from '../../components'
import { formatDateTime } from '../../utils'
import { GET_SEVEN_DAY_SCHEDULE } from '../../queries'
// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
// import utc from "dayjs/plugin/utc";
// dayjs.extend(isBetween);
// dayjs.extend(utc);

import scheduleDummyData from '../../../__test__/HMBK-schedule-page-query-test.json'

/**
 * Layout for the `/schedule` page.
 * @category Pages
 * @function ScheduleIndexPage
 * @returns {jsx}
 */
function ScheduleIndexPage() {
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
   * @name executeScheduleFetch
   */
  useEffect(() => {
    const executeScheduleFetch = () => {
      if (scheduleFetchDates) {
        fetchSevenDaySchedule({
          variables: {
            yesterday: scheduleFetchDates.yesterday,
            weekAndADay: scheduleFetchDates.weekAndADay,
          },
        })
      }
    }
    return executeScheduleFetch()
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
              currDateObject.entries = schedule_entries
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
   * Update today's date every fifteen seconds.
   * @function
   */
  useEffect(() => {
    const updateTimeByFifteenSeconds = setInterval(() => {
      setTodayDate(todayDate.add(15, 's'))
    }, 15000)

    return () => {
      clearInterval(updateTimeByFifteenSeconds)
    }
  }, [todayDate])

  // FOR JSON TEXT FILE DEBUGGING
  // const sevenDaysArray = arr.filter(({ node }) =>
  //   dayjs(node.schedule_date).isBetween(today, sixDaysFromToday, "day", [])
  // );
  // const sevenDaysData = getSevenDays(scheduleDummyData);

  return (
    <main className="container is-fluid black-bg-page">
      <div className="columns is-mobile is-multiline">
        <div className="column">
          <p className="title is-size-2-desktop is-size-3-touch">Schedule</p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            All times are NYC.
          </p>
        </div>
      </div>

      {dateBtnLabels && (
        <DateSelectorButton
          datesArr={dateBtnLabels}
          toggleColumn={toggleColumn}
        />
      )}

      {thisWeekSchedule && (
        <section className="section container is-fluid">
          {thisWeekSchedule.map(({ date, entries, id }, index) => {
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
                    <div className="column is-12">
                      {entries.map(
                        ({ start_time, end_time, scheduled_show }, index) => {
                          const formattedStart = formatDateTime(
                            start_time,
                            'hour-minute'
                          )
                          const formattedEnd = formatDateTime(
                            end_time,
                            'hour-minute'
                          )

                          return (
                            // <pre>{JSON.stringify(entry, null, 2)}</pre>
                            <SingleScheduleEntryRow
                              key={`show-entry-#${index}-${start_time}`}
                              start={formattedStart}
                              end={formattedEnd}
                              show={scheduled_show}
                            />
                          )
                        }
                      )}
                    </div>
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
      )}

      <hr />
      <pre>todayDate {JSON.stringify(todayDate, null, 2)}</pre>
      <pre>dateBtnLabels {JSON.stringify(dateBtnLabels, null, 2)}</pre>
      <pre>
        scheduleFetchDates {JSON.stringify(scheduleFetchDates, null, 2)}
      </pre>

      {/* <pre>
        sevenDayScheduleData
        {JSON.stringify(sevenDayScheduleData.allSchedules.edges, null, 2)}
      </pre> */}
      <pre>thisWeekSchedule {JSON.stringify(thisWeekSchedule, null, 2)}</pre>
    </main>
  )
}

export default ScheduleIndexPage
