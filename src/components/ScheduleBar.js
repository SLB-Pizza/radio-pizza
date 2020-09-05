import React, { useState, useContext, useEffect } from "react";
import { Link } from "gatsby";
import { makeVar, gql, useQuery } from "@apollo/client";
import {
  faSearch,
  faComments,
  faCalendarAlt,
  faBroadcastTower,
  faHeadphones,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
import { ScheduleDropdown, OutsideClick } from "./index";
import { formatDateTime, formatNextShow } from "../utils";
import UpcomingShow from "./UpcomingShow";

function ScheduleBar({ timeNow }) {
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

  const [open, setOpen] = useState(false);
  const [pageIsVisible, setPageIsVisible] = useState(true);

  /**
   * Format timeNow for use in schedule_date_before and schedule_date_after below. Neither date is inclusive so we need to pass in yesterday as the filter date.
   */
  let yesterday = formatDateTime(timeNow, "prismic-date-query", -1);

  /**
   * Query for Prismic in the GraphQL syntax, not the Gatsby syntax!
   * Retrieves the first available date with scheduled show entries
   * @see {@link https://prismic.io/docs/graphql/query-the-api/query-by-date| Prismic - GraphQL Query by Date}
   */
  const GET_NEXT_SHOW = gql`
    query getNextShow($yesterday: Date!) {
      allSchedules(
        where: { schedule_date_after: $yesterday }
        sortBy: schedule_date_ASC
        first: 1
      ) {
        edges {
          node {
            schedule_date
            schedule_entries {
              end_time
              start_time
              scheduled_show {
                ... on Mix {
                  mix_image
                  mix_title
                  featured_residents {
                    mix_resident {
                      ... on Resident {
                        resident_name
                        _meta {
                          uid
                          type
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

  /**
   * Run the query on load and poll every 120 seconds; 2 minutes.
   */
  const { loading, error, data } = useQuery(GET_NEXT_SHOW, {
    variables: { yesterday },
    pollInterval: 120000,
  });

  if (error) {
    return `Error ${error.message}`;
  }

  // if (data) {
  //   let nextShowData = data.allSchedules.edges[0].node;
  // }

  const toggleSchedule = async () => {
    await dispatch({ type: "TOGGLE_SCHEDULE" });
  };

  const closeSchedule = async () => {
    await dispatch({ type: "CLOSE_SCHEDULE" });
  };

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible);
  };

  // TEST ONLY -- just for live toggle
  const handleLiveTest = async () => {
    await dispatch({ type: "TOGGLE_LIVE_TEST" });
  };

  const showLiveStatus = () => (globalState.live ? "true" : "false");
  // END TEST CODE

  const nextShowTicker = (date, showName) => {
    return (
      <Ticker mode="await" offset="run-in" speed={3}>
        {() => (
          <p className="display-text  is-size-7">
            {/* {date} – {showName} */}
            Aldrich Title - Oxygen Body
          </p>
        )}
      </Ticker>
    );
  };

  /**
   * Schedule Bar LAYOUT
   * OPEN : CLOSED
   */
  return globalState.scheduleOpen ? (
    <OutsideClick id={"schedule-bar"} onClick={() => closeSchedule()}>
      <div
        className={
          globalState.live
            ? "schedule-bar container is-fluid is-open is-live"
            : "schedule-bar container is-fluid is-open"
        }
        id="schedule-bar"
      >
        <div className="columns is-vcentered is-mobile is-variable is-2 up-next">
          <div
            className="column is-narrow"
            onClick={() => {
              handleLiveTest();
              closeSchedule();
            }}
          >
            {globalState.live ? (
              <button
                className="button is-small is-outlined is-rounded"
                onClick={() => closeSchedule()}
              >
                {globalState.playingRadio ? (
                  <>
                    <span>Listening</span>
                    <span className="icon">
                      <FontAwesomeIcon
                        icon={faHeadphones}
                        size="1x"
                        className="live-light"
                      />
                      Listening
                    </span>
                  </>
                ) : (
                  <>
                    <span>Live</span>
                    <span className="icon">
                      <FontAwesomeIcon
                        icon={faBroadcastTower}
                        size="1x"
                        className="live-light"
                      />
                    </span>
                  </>
                )}
              </button>
            ) : (
              <p className="display-text is-size-6-desktop is-size-7-touch">
                Next Show
              </p>
            )}
          </div>
          <div className="column upcoming is-hidden-mobile">
            {!loading && data ? <UpcomingShow showData={data} /> : null}
          </div>
          <div className="column upcoming is-hidden-tablet">
            <PageVisibility onChange={handleVisibilityChange}>
              {pageIsVisible &&
                nextShowTicker("MON 4.21", "An HMBK Moment In Time")}
            </PageVisibility>
          </div>
          <div className="column is-narrow">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size="1x"
              className="icon-color"
              onClick={() => toggleSchedule()}
            />
          </div>
          <div className="column is-narrow">
            <Link to="/search">
              <FontAwesomeIcon
                onClick={() => closeSchedule()}
                icon={faSearch}
                size="1x"
                className="icon-color"
              />
            </Link>
          </div>

          <div className="column is-narrow">
            <a
              href="http://halfmoonradiochat.chatango.com/"
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon
                onClick={() => closeSchedule()}
                icon={faComments}
                size="1x"
                className="icon-color"
              />
            </a>
          </div>
        </div>
        {data && (
          <ScheduleDropdown
            data={data}
            open={open}
            setOpen={setOpen}
            toggleSchedule={toggleSchedule}
          />
        )}
      </div>
    </OutsideClick>
  ) : (
    <div
      className={
        globalState.live
          ? "schedule-bar container is-fluid is-live"
          : "schedule-bar container is-fluid"
      }
    >
      <div className="columns is-vcentered is-mobile is-variable is-2 up-next">
        <div
          className="column is-narrow"
          onClick={() => {
            handleLiveTest();
            closeSchedule();
          }}
        >
          {globalState.live ? (
            <button
              className="button is-small is-outlined is-rounded"
              onClick={() => closeSchedule()}
            >
              {globalState.playingRadio ? (
                <>
                  <span>Listening</span>
                  <span className="icon">
                    <FontAwesomeIcon
                      icon={faHeadphones}
                      size="1x"
                      className="live-light"
                    />
                  </span>
                </>
              ) : (
                <>
                  <span>Live</span>
                  <span className="icon">
                    <FontAwesomeIcon
                      icon={faBroadcastTower}
                      size="1x"
                      className="live-light"
                    />
                  </span>
                </>
              )}
            </button>
          ) : (
            <p className="display-text is-size-6-desktop is-size-7-touch">
              Next Show
            </p>
          )}
        </div>
        <div className="column upcoming is-hidden-mobile">
          {!loading && data ? <UpcomingShow showData={data} /> : null}
        </div>
        <div className="column upcoming is-hidden-tablet">
          <PageVisibility onChange={handleVisibilityChange}>
            {pageIsVisible &&
              nextShowTicker("MON 4.21", "An HMBK Moment In Time")}
          </PageVisibility>
        </div>
        <div className="column is-narrow">
          <FontAwesomeIcon
            onClick={() => toggleSchedule()}
            icon={faCalendarAlt}
            size="1x"
            className="icon-color"
          />
        </div>
        <div className="column is-narrow">
          <Link to="/search">
            <FontAwesomeIcon
              onClick={() => closeSchedule()}
              icon={faSearch}
              size="1x"
              className="icon-color"
            />
          </Link>
        </div>

        <div className="column is-narrow">
          <a
            href="http://halfmoonradiochat.chatango.com/"
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon
              onClick={() => closeSchedule()}
              icon={faComments}
              size="1x"
              className="icon-color"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ScheduleBar;
