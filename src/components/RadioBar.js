import React, { useContext, useEffect } from 'react'
import { Link } from 'gatsby'
import { useQuery } from '@apollo/client'
import { RadioPlayer } from './index'
import { FallbackImage } from '../utils'
import { formatDateTime, getResidentString, mappableDataFilter } from '../utils'
import { GET_DEFAULT_MIX } from '../queries'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'

import dayjs from 'dayjs'
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

/**
 * Renders the RadioBar portion of the {@link TopNav}.
 * @category Site Elements
 * @function RadioBar
 * @param {Object} nycTime - dayJS object
 * @param {Object} laTime - dayJS object
 * @returns {jsx}
 */
export default function RadioBar({ nycTime, laTime }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

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
   * @category useEffect
   * @name setInitialSource
   */
  useEffect(() => {
    const setInitialSource = async () => {
      if (globalState.live) {
        await dispatch({
          type: 'SET_INITIAL_RADIO',
        })
      } else {
        if (loading) {
          // console.log("Initial Mix request in progress");
        }
        if (error) {
          console.error(`initialMix Error: ${error.message}`)
        }
        if (data) {
          const mixDataObject = data.allTopnavs.edges[0].node.default_mix

          if (mixDataObject) {
            const {
              featured_residents,
              mix_image,
              mix_link,
              mix_title,
            } = mixDataObject

            /**
             * Another case where `objectKeyCount` needs to be assigned `2` for {@link mappableDataFilter}; `__typename` counts!.
             */
            const filteredResidents = mappableDataFilter(featured_residents, 2)
            const mixResidentsString = getResidentString(filteredResidents)

            await dispatch({
              type: 'SET_INITIAL_MIX',
              payload: {
                url: mix_link,
                title: mix_title,
                resident: mixResidentsString,
                img: mix_image.now_playing.url,
              },
            })
            await dispatch({
              type: 'MIX_LOADED',
            })
          } else {
            /**
             * Handle case where no initial mix is selected in the CMS.
             */
            await dispatch({
              type: 'SET_INITIAL_MIX',
              payload: {
                url: null,
                title: null,
                resident: null,
                img: null,
              },
            })
            await dispatch({
              type: 'MIX_LOADED',
            })
          }
        }
      }
    }
    setInitialSource()
  }, [data, loading, error])

  return (
    <div className="container is-fluid radio-bar">
      <a href="#navigation" className="sr-only text-block">
        Jump to navigation bar
      </a>

      <div className="columns is-vcentered is-mobile">
        <div className="column is-narrow">
          <Link to="/" onClick={() => clearMixSearchTags()}>
            <figure className="image is-48x48">
              <FallbackImage alt={'Return Home'} className="lazyload" />
            </figure>
          </Link>
        </div>

        {globalState.isLoading ? (
          <div className="column mix-data" />
        ) : (
          <RadioPlayer />
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
