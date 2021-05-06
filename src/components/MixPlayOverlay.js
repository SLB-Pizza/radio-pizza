import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { GlobalDispatchContext } from '../context/GlobalContextProvider'
import { FallbackImage, IconMaker } from '../utils'
import { changeURL, playCollection } from '../dispatch'

/**
 * Creates a play icon that `onClick` dispatches the `SHOW_LOADING` and `CHANGE_URL` actions, playing the audio source through {@link RadioPlayer}.
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
 * @returns {jsx}
 */
export default function MixPlayOverlay({
  url,
  title,
  residents,
  img,
  wrapperClassName,
  isCollection,
  collectionDetails,
}) {
  const dispatch = useContext(GlobalDispatchContext)

  // Remove punctuation and white spaces in title string for use with the SR-only #play-mix-title href
  const titleForSRHashURL = title.replace(/[.,\/#!$%\^&\*;:{}=\_`~()\s]/g, '-')
  const imgDataToSend = img === null ? null : img.now_playing.url

  return (
    <div className={wrapperClassName}>
      <IconMaker
        iconSize={'1x'}
        iconToUse={'play'}
        linkAddress={`#play-${titleForSRHashURL}`}
        linkIsLocal={true}
        linkClassName={'sr-only title is-6'}
        linkOnClickFunc={
          isCollection
            ? () => {
                playCollection(dispatch, collectionDetails)
              }
            : () => {
                changeURL(dispatch, url, title, residents, imgDataToSend)
              }
        }
        linkProps={{
          tabIndex: '0',
        }}
        textAfterIcon={isCollection ? 'Load This Collection' : 'Load This Mix'}
      />

      <figure className="image is-1by1">
        {img ? (
          <img className="lazyload" src={img.url} alt={img.alt} />
        ) : (
          <FallbackImage />
        )}
        <div className="play-btn-diffuser is-overlay">
          <IconMaker
            spanClass={'icon is-large'}
            iconSize={'4x'}
            iconToUse={'play'}
            iconClass={'play-icon'}
            iconOnClickFunc={
              isCollection
                ? () => {
                    playCollection(dispatch, collectionDetails)
                  }
                : () => {
                    changeURL(dispatch, url, title, residents, imgDataToSend)
                  }
            }
          />
        </div>
      </figure>
    </div>
  )
}

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
