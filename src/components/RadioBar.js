import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { RadioPlayer } from './index'
import { FallbackImage } from '../utils'
import { formatDateTime } from '../utils'
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

  const clearMixSearchTags = async () =>
    await dispatch({ type: 'CLEAR_MIX_SEARCH_TAGS' })

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
