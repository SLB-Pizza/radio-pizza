import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import Ticker from 'react-ticker'
import { useQuery } from '@apollo/client'
import { RadioPlayer } from './index'
import { formatDateTime, getResidentString, mappableDataFilter } from '../utils'
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

  /**
   * @category useQuery
   * @name getDefaultMix
   */
  const { loading, error, data } = useQuery(GET_DEFAULT_MIX)
  const clearMixSearchTags = async () =>
    await dispatch({ type: 'CLEAR_MIX_SEARCH_TAGS' })

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
      console.error(`initialMix Error: ${error.message}`)
    }
    if (data) {
      if (data.allTopnavs.edges[0].node) {
        const mixDataObject = data.allTopnavs.edges[0].node.default_mix
        const {
          featured_residents,
          mix_image,
          mix_link,
          mix_title,
        } = mixDataObject

        /**
         * Another case where `objectKeyCount` needs to be assigned `2` for {@link mappableDataFilter}.
         */
        const filteredResidents = mappableDataFilter(featured_residents, 2)
        const mixResidentsString = getResidentString(filteredResidents)

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
      /**
       * Handle case where no initial mix is selected.
       */
      return dispatch({
        type: 'SET_INITIAL_MIX',
        payload: {
          url: null,
          title: null,
          resident: null,
          img: null,
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
          <Link to="/" onClick={() => clearMixSearchTags()}>
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
