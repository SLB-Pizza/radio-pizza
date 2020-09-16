import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "gatsby";
import Ticker from "react-ticker";
import { gql, useQuery } from "@apollo/client";
// import { PrismicLink } from "apollo-link-prismic";
import { formatDateTime, getResidentString } from "../utils";
import { RadioPlayer } from "./index";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// import PageVisibility from "react-page-visibility";

function RadioBar({ nycTime, laTime }) {
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

  const [radioData, setRadioData] = useState({});
  const [pageIsVisible, setPageIsVisible] = useState(true);

  // const handleVisibilityChange = (isVisible) => {
  //   setPageIsVisible(isVisible);
  // };

  // const handlePlayLive = async () => {
  //   await dispatch({
  //     type: "CHANGE_URL",
  //     payload: {
  //       url: "https://streamer.radio.co/sa3c47c55b/listen",
  //       title: "Halfmoon Radio",
  //     },
  //   });
  // };

  // const liveText = "Pendulum: Hold Your Colour 15th Anniversary Live Set";
  // const renderLiveTicker = (text) => {
  //   return (
  //     <div className="columns is-mobile is-vcentered live-bar">
  //       <div className="column is-narrow live-invert">
  //         <p className="display-text is-size-5 has-text-centered">ON AIR</p>
  //       </div>
  //       <div className="column live-ticker">
  //         <Ticker mode="await" offset="run-in" speed={3}>
  //           {() => <p className="display-text is-size-5">{text}!</p>}
  //         </Ticker>
  //       </div>
  //     </div>
  //   );
  // };

  const INITIAL_MIX = gql`
    query DefaultMix {
      allTopnavs {
        edges {
          node {
            default_mix {
              ... on Mix {
                mix_image
                mix_link
                mix_title
                featured_residents {
                  mix_resident {
                    ... on Resident {
                      resident_image
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
  `;

  const { loading, error, data } = useQuery(INITIAL_MIX);

  /**
   * Query the HMBK Prismic CMS to get the data for the initial mix data.
   * Grab the mix data object from the query result.
   * Destructure the mix data object and dispatch the mix data to appear in {@link RadioPlayer}
   * @function
   */
  useEffect(() => {
    if (loading) {
      console.log("Initial Mix request in progress");
    }
    if (error) {
      console.log(`initialMix Error: ${error.message}`);
    }
    if (data) {
      const mixDataObject = data.allTopnavs.edges[0].node.default_mix;
      const {
        featured_residents,
        mix_image,
        mix_link,
        mix_title,
      } = mixDataObject;

      const mixResidentsString = getResidentString(featured_residents);
      return dispatch({
        type: "SET_INITIAL_MIX",
        payload: {
          url: mix_link,
          title: mix_title,
          resident: mixResidentsString,
          img: mix_image.now_playing.url,
        },
      });
    }
  }, [data, loading, error]);

  useEffect(() => {
    async function getRadioData() {
      const result = await axios(
        "https://public.radio.co/stations/sa3c47c55b/status"
      );
      // console.log("radio data ->", result.data.status);
      setRadioData(result.data.status);
    }
    getRadioData();
  }, []);

  return (
    <div className="container is-fluid radio-bar">
      <a href="#navigation" className="sr-only">
        Jump to navigation bar
      </a>

      {/* {globalState.live ? (
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible && renderLiveTicker(liveText)}
        </PageVisibility>
      ) : null} */}

      <div className="columns is-vcentered is-mobile">
        <div className="column is-narrow">
          <Link to="/">
            <figure className="image is-48x48">
              <img
                src={`../img/test/halfmoon-3.png`}
                alt="Return to home page"
              />
            </figure>
          </Link>
        </div>

        {globalState.url === null ? (
          <div className="column mix-data" />
        ) : (
          <RadioPlayer status={radioData.status} />
        )}

        <div className="column is-narrow is-hidden-mobile">
          <p className="display-text is-size-6">
            {formatDateTime(laTime, "hour-minute")} LA
          </p>
          <p className="display-text is-size-6">
            {formatDateTime(nycTime, "hour-minute")} NYC
          </p>
        </div>
      </div>
    </div>
  );
}

export default RadioBar;
