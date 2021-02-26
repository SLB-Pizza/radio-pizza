import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import Ticker from 'react-ticker'
import { useQuery } from '@apollo/client'
import { RadioPlayer } from './index'
import { formatDateTime, getResidentString } from '../utils'
import { GET_DEFAULT_MIX } from '../queries'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'

import dayjs from 'dayjs'
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

// import PageVisibility from "react-page-visibility";

function RadioBar({ nycTime, laTime }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  const [radioData, setRadioData] = useState({})
  const [pageIsVisible, setPageIsVisible] = useState(true)

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

  // NEW LINK: https://public.radio.co/stations/s6f093248d/status

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

  const { loading, error, data } = useQuery(GET_DEFAULT_MIX)

  /**
   * Query the HMBK Prismic CMS to get the data for the initial mix data.
   * Grab the mix data object from the query result.
   * Destructure the mix data object and dispatch the mix data to appear in {@link RadioPlayer}
   */
  useEffect(() => {
    if (loading) {
      // console.log("Initial Mix request in progress");
    }
    if (error) {
      console.log(`initialMix Error: ${error.message}`)
    }
    if (data) {
      const mixDataObject = data.allTopnavs.edges[0].node.default_mix
      const {
        featured_residents,
        mix_image,
        mix_link,
        mix_title,
      } = mixDataObject

      const mixResidentsString = getResidentString(featured_residents)

      return dispatch({
        type: 'SET_INITIAL_MIX',
        payload: {
          url: mix_link,
          title: mix_title,
          resident: mixResidentsString,
          img: mix_image.now_playing.url,
        },
      })
    }
  }, [data, loading, error])

  // Currently offline! Not gonna work until HMBK pays for it
  // useEffect(() => {
  //   async function getRadioData() {
  //     const result = await axios(
  //       "https://public.radio.co/stations/sa3c47c55b/"
  //     );
  //     // console.log("radio data ->", result.data.status);
  //     setRadioData(result.data.status);
  //   }
  //   return getRadioData();
  // }, []);

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
            {formatDateTime(laTime, 'hour-minute')} LA
          </p>
          <p className="display-text is-size-6">
            {formatDateTime(nycTime, 'hour-minute')} NYC
          </p>
        </div>
      </div>
    </div>
  )
}

export default RadioBar
