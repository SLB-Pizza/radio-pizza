import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { FallbackImage } from '../utils'
import { GlobalDispatchContext } from '../context/GlobalContextProvider'

/**
 * Creates a clickable play button that sends the selected mix to {@link RadioPlayer}
 * @category Site Elements
 * @function MixPlayOverlay
 * @param {String} url - URL of the mix to play
 * @param {String} title - title of the mix to play; shown in {@link RadioPlayer}
 * @param {String} resident - resident(s) that made the mix; shown in {@link RadioPlayer}.
 * - Single mixes, it's preprocessed by {@link getResidentString}
 * - Collections, processed here in the component
 * @param {String} img - the mix's image; shown in {@link RadioPlayer}
 * @param {?String} wrapperClassName - optional string detailing the overlay wrapper's class
 * @param {?Boolean} isCollection - optional boolean that triggers in how CHANGE_URL is prepared; comes from {@link SingleCollection}
 * @param {?Object} collectionDispatch - optional object containing the dispatch payload in collection format; passed from {@link SingleCollection}
 * @returns {jsx} A play icon that onClick dispatches the SHOW_LOADING and CHANGE_URL actions, playing the audio source through RadioPlayer.js
 */
function MixPlayOverlay({
  url,
  title,
  residents,
  img,
  wrapperClassName,
  isCollection,
  collectionDetails,
}) {
  const dispatch = useContext(GlobalDispatchContext)

  /**
   * Dispatches CHANGE_URL to switch from whatever is in {@link RadioPlayer} to the selected mix.
   * @category Dispatch Function
   * @function playCollection
   */
  const changeUrl = async () => {
    await dispatch({ type: 'SHOW_LOADING' })
    await dispatch({
      type: 'CHANGE_URL',
      payload: {
        url,
        title,
        resident: residents,
        img: img.now_playing.url,
      },
    })
  }

  /**
   * Dispatch corresponds to "PLAYLIST_PLAY_FIRST".
   * @category Dispatch Function
   * @function playCollection
   * @see {@link makeCollectionDispatch}
   */
  const playCollection = async () => {
    await dispatch({ type: 'SHOW_LOADING' })
    await dispatch({ type: 'PLAYLIST_START', payload: collectionDetails })
  }

  // Determine which dispatch function to use based on isCollection boolean
  const dispatchFunc = isCollection === true ? playCollection : changeUrl

  return (
    <div className={wrapperClassName}>
      <div className="card-image">
        <a
          href="#"
          className="sr-only title is-6"
          tabIndex="0"
          onClick={() => dispatchFunc()}
        >
          <span className="icon">
            <Icon icon="play" size="1x" />
          </span>
          <span>Play This Mix</span>
        </a>
        <figure className="image is-1by1">
          {img ? <img src={img.url} alt={img.alt} /> : <FallbackImage />}
          <div className="play-btn-diffuser is-overlay">
            <Icon
              icon="play"
              size="5x"
              className="play-icon"
              onClick={() => dispatchFunc()}
            />
          </div>
        </figure>
      </div>
    </div>
  )
}

export default MixPlayOverlay
MixPlayOverlay.propTypes = {
  img: PropTypes.shape({
    alt: PropTypes.string,
    now_playing: PropTypes.shape({
      url: PropTypes.string,
    }),
    url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }),
  residents: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  wrapperClassName: PropTypes.string,
}
