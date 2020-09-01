import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";

import {
  DateSelectorButton,
  ScheduleShowEntry,
  SelectedColumn,
} from "../../components";
import scheduleDummyData from "../../../__tests__/HMBK-schedule-page-query-test.json";
import { result } from "lodash";

/**
 * @category Pages
 * @subcategory Indexes
 * @function ScheduleIndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/schedule`
 * @returns {jsx}
 */
function ScheduleIndexPage({ data }) {
  dayjs.extend(isBetween);
  dayjs.extend(utc);
  const prismicContent = data.prismic.allSchedules.edges;
  if (!prismicContent) return null;

  /**
   * Grab and manip the nodes array of mixs
   */
  const allSchedulesData = prismicContent;

  const [todayDate, setTodayDate] = useState(
    dayjs(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))
  );
  const [isActive, setIsActive] = useState(dayjs(todayDate).format("MM.DD"));

  const getSevenDays = (arr) => {
    const firstDay = dayjs().format("YYYY-MM-DD");
    const lastDay = dayjs(firstDay)
      .add(6, "day")
      .format("YYYY-MM-DD");

    const sevenDaysArray = arr.filter(({ node }) =>
      dayjs(node.schedule_date).isBetween(firstDay, lastDay, "day", [])
    );

    return sevenDaysArray;
  };

  const formatScheduleTime = (time) => dayjs(time).format("HH:MM");

  const addDays = (day) => {
    let daysArr = [];
    let idsArr = [];

    for (let i = 0; i <= 6; i++) {
      daysArr.push(day.add(i, "d").format("ddd, MMM D"));
      idsArr.push(day.add(i, "d").format("ddd"));
    }
  };

  function toggleColumn(e) {
    if (isActive !== e.currentTarget.id) {
      setIsActive(e.currentTarget.id);
    }
  }

  useEffect(() => {
    const date = setInterval(() => {
      // Set today's date
      setTodayDate(todayDate.add(5, "s"));

      // Pass today's date into addDays and receive two arrays of day and id strings

      addDays(todayDate);
    }, 5000);

    return () => {
      clearInterval(date);
    };
  }, []);

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
        const dateID = dayjs(node.schedule_date).format("MM.DD");

        if (isActive === dateID) {
          return (
            <div
              key={`date-#${index}-${dateID}`}
              className="columns is-multiline is-vcentered is-mobile schedule-page-entries"
            >
              <div className="column is-12 today-date">
                <p className="title is-size-4-desktop is-size-5-mobile has-text-centered">
                  {dayjs(node.schedule_date).format("dddd, MMMM D")}
                </p>
                <pre>
                  {JSON.stringify(getSevenDays(scheduleDummyData), null, 2)}
                </pre>
                {/* <pre>{JSON.stringify(allSchedulesData, null, 2)}</pre> */}
              </div>

              {sevenDaysData.map(({ node }, index) => (
                <div
                  key={`show-#${index}-`}
                  className="column is-12 single-show-entry"
                >
                  <div className="columns is-mobile is-vcentered">
                    <div className="column is-4">
                      <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
                        {/* {show.startTime} – {show.endTime} */}
                      </p>
                    </div>

                    {node.hasOwnProperty("showName") ? (
                      <div className="column is-8">
                        <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
                          {/* {show.showName} */}
                        </p>
                        <p className="subtitle is-size-7 has-text-centered">
                          {/* {show.hostInfo.join(", ")} */}
                        </p>
                      </div>
                    ) : (
                      <div className="column is-8">
                        <p className="subtitle is-size-6-tablet is-size-7-mobile has-text-centered">
                          {/* {show.hostInfo.join(", ")} */}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
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

//   <div className="columns is-multiline is-vcentered is-mobile schedule-page-entries">
//     <div className="column is-12 today-date">
//       <p className="title is-size-4-desktop is-size-5-mobile has-text-centered">
//         {dayjs(node.schedule_date).format("dddd, MMMM D")}
//       </p>
//       <pre>
//         {JSON.stringify(getSevenDays(scheduleDummyData), null, 2)}
//       </pre>
//       {/* <pre>{JSON.stringify(allSchedulesData, null, 2)}</pre> */}
//     </div>

//     {sevenDaysData.map(({ node }, index) => (
//       <div
//         key={`show-#${index}-`}
//         className="column is-12 single-show-entry"
//       >
//         <div className="columns is-mobile is-vcentered">
//           <div className="column is-4">
//             <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
//               {/* {show.startTime} – {show.endTime} */}
//             </p>
//           </div>

//           {node.hasOwnProperty("showName") ? (
//             <div className="column is-8">
//               <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
//                 {/* {show.showName} */}
//               </p>
//               <p className="subtitle is-size-7 has-text-centered">
//                 {/* {show.hostInfo.join(", ")} */}
//               </p>
//             </div>
//           ) : (
//             <div className="column is-8">
//               <p className="subtitle is-size-6-tablet is-size-7-mobile has-text-centered">
//                 {/* {show.hostInfo.join(", ")} */}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     ))}
//   </div>

// <SelectedColumn
//   key={`#{index}-schedule-for-${node.schedule_date}`}
//   columnId="schedule_date"
//   layoutData={node}
//   isSelected={isActive}
// />;
