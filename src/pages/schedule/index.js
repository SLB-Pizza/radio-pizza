import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { DateSelectorButton, SingleScheduleEntryRow } from "../../components";
import { formatDateTime } from "../../utils";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
dayjs.extend(isBetween);
dayjs.extend(utc);

import scheduleDummyData from "../../../__tests__/HMBK-schedule-page-query-test.json";

/**
 * @category Pages
 * @subcategory Indexes
 * @function ScheduleIndexPage
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/schedule`
 * @returns {jsx}
 */
function ScheduleIndexPage({ data }) {
  const prismicContent = data.prismic.allSchedules.edges;
  if (!prismicContent) return null;

  /**
   * Grab and manip the nodes array of mixs
   */
  const allSchedulesData = prismicContent;

  const [todayDate, setTodayDate] = useState(
    dayjs(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))
  );
  const [isActive, setIsActive] = useState(
    formatDateTime(todayDate, "month-day")
  );

  const getSevenDays = (arr) => {
    const today = dayjs(todayDate);
    const sixDaysFromToday = today.add(6, "day");

    const sevenDaysArray = arr.filter(({ node }) =>
      dayjs(node.schedule_date).isBetween(today, sixDaysFromToday, "day", [])
    );

    return sevenDaysArray;
  };

  function toggleColumn(e) {
    if (isActive !== e.currentTarget.id) {
      setIsActive(e.currentTarget.id);
    }
  }

  /**
   * Update today's date every fifteen seconds.
   * @function
   */
  useEffect(() => {
    const date = setInterval(() => {
      setTodayDate(todayDate.add(15, "s"));
    }, 15000);

    return () => {
      clearInterval(date);
    };
  }, [todayDate]);

  const sevenDaysData = getSevenDays(scheduleDummyData);
  return (
    <div className="container is-fluid site-page">
      <div className="columns is-mobile is-multiline">
        <div className="column">
          <p className="title is-size-2-desktop is-size-3-touch">Schedule</p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            All times are NYC.
          </p>
        </div>
      </div>

      <DateSelectorButton date={todayDate} toggleColumn={toggleColumn} />

      {sevenDaysData.map(({ node }, index) => {
        const { schedule_date, schedule_entries } = node;

        const dateID = formatDateTime(schedule_date, "month-day");
        const scheduleDateHeading = formatDateTime(
          schedule_date,
          "schedule-date-heading"
        );

        if (isActive === dateID) {
          return (
            <div
              key={`date-#${index}-${dateID}`}
              className="columns is-multiline is-vcentered is-mobile schedule-page-entries"
            >
              <div className="column is-12 today-date">
                <p className="title is-size-4-desktop is-size-5-mobile has-text-centered">
                  {scheduleDateHeading}
                </p>
                {/* <pre>{JSON.stringify(getSevenDays(node), null, 2)} </pre>*/}
                {/* <pre>{JSON.stringify(node, null, 2)}</pre> */}
              </div>

              <div className="column is-12">
                {schedule_entries.map((entry, index) => {
                  const { start_time, end_time, scheduled_show } = entry;
                  const formattedStart = formatDateTime(
                    start_time,
                    "hour-minute"
                  );
                  const formattedEnd = formatDateTime(end_time, "hour-minute");

                  return (
                    <SingleScheduleEntryRow
                      key={`show-entry-#${index}-${start_time}`}
                      start={formattedStart}
                      end={formattedEnd}
                      show={scheduled_show}
                    />
                  );
                })}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default ScheduleIndexPage;

export const query = graphql`
  query SchedulePageQuery {
    prismic {
      allSchedules(sortBy: schedule_date_ASC) {
        edges {
          node {
            schedule_date
            schedule_entries {
              start_time
              end_time
              scheduled_show {
                ... on PRISMIC_Mix {
                  mix_title
                  featured_residents {
                    mix_resident {
                      ... on PRISMIC_Resident {
                        resident_name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
