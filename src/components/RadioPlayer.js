import React, { useContext, useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import { hot } from 'react-hot-loader'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/**
 * Returns the Radio Player layout element
 * @category Site Elements
 * @function RadioPlayer
 * @returns {jsx}
 */
function RadioPlayer() {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  const [localState, setLocalState] = useState({
    url: null,
    pip: false,
    loading: false,
    playing: false,
    controls: false,
    light: false,
    volume: 1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hoursPlayed: 0,
    minutesPlayed: 0,
    secondsPlayed: 0,
    playbackRate: 1.0,
    loop: false,
  })

  /**
   * Eliminate width and height = 0 errors by breaking ReactPlayer out of normal document flow and throwing it above the top of the page
   */
  const playerStyle = {
    position: 'absolute',
    top: '-1000px',
    width: '1px',
    height: '1px',
    margin: '-1px',
  }

  // const [pageIsVisible, setPageIsVisible] = useState(true);

  // const handleVisibilityChange = (isVisible) => {
  //   setPageIsVisible(isVisible);
  // };

  const handlePlayPause = async () => {
    await dispatch({ type: 'TOGGLE_PLAYING' })
  }
  const handlePlay = () => {
    setLocalState({ ...localState, playing: true })
  }

  const handlePause = () => {
    setLocalState({ ...localState, playing: false })
  }

  const handleMixReady = async () => {
    await dispatch({ type: 'MIX_LOADED' })
  }

  const handleEnded = async () => {
    console.log('onEnded')

    // ADD check in case we are ending on a single track, not a playlist
    if (globalState.playlist.length) {
      // if list_curr_index from global state is less the current playlist's number of tracks, then dispatch func which increments it by one and plays next
      if (globalState.playlist.length - 1 > globalState.list_curr_index) {
        await dispatch({ type: 'PLAYLIST_PLAY_NEXT' })
      } else {
        await dispatch({ type: 'PLAYLIST_LOOP' })
      }
    }

    return
  }

  const handleDuration = (duration) => {
    let seconds = Math.round(duration % 60);
    let minutes = Math.round(duration / 60);
    let hours = Math.round(minutes / 60);

    if( minutes >= 60 ){
      hours = Math.round( minutes / 60 );
      minutes = (minutes % 60);
    } else {
      hours = 0;
    }

    setLocalState({ 
      ...localState,
      duration: duration,
      hours,
      minutes,
      seconds
    });
  };

  const handleProgress = ( played, loaded) => {
    console.log( 'played', played );
    // console.log( 'loaded', loaded );
    let hoursPlayed = 0;
    let minutesPlayed = 0;
    let secondsPlayed = 0;
    if( Math.round(played?.playedSeconds) > 59 ){
      minutesPlayed = (Math.floor(played.playedSeconds / 60));

        if( minutesPlayed > 59 ){
          hoursPlayed = Math.floor( minutesPlayed / 60 );
          minutesPlayed = (minutesPlayed % 60);
        } else {
          hoursPlayed = 0;
        }

      secondsPlayed = 
        Math.round(played.playedSeconds % 60)

    } else {
      hoursPlayed = 0;
      minutesPlayed = 0;
      secondsPlayed = Math.round(played.playedSeconds % 60);
    }

    setLocalState({ 
      ...localState,
      played: played,
      loaded: loaded,
      hoursPlayed,
      minutesPlayed,
      secondsPlayed
    });
  };

  useEffect( () => {
    setLocalState({ 
      ...localState,
      hours: localState.hours,
      minutes: localState.minutes,
      seconds: localState.seconds,
      hoursPlayed: localState.hoursPlayed,
      minutesPlayed: localState.hoursPlayed,
      secondsPlayed: localState.secondsPlayed
    });
  }, [] )

  const player = useRef(ReactPlayer)

  return (
    <>
      <div
        className={
          globalState.isLoading
            ? 'column is-narrow mix-data'
            : 'column is-narrow mix-data is-loaded'
        }
      >
        {!globalState.playing ? (
          <Icon
            icon="play"
            className="icon-color"
            onClick={handlePlayPause}
            size="2x"
          />
        ) : (
          <Icon
            icon="pause"
            className="icon-color"
            onClick={handlePlayPause}
            size="2x"
          />
        )}
      </div>

      <div
        className={
          globalState.isLoading
            ? 'column is-narrow mix-data'
            : 'column is-narrow mix-data is-loaded'
        }
      >
        <figure className="image is-48x48">
          <img src={`${globalState.img}`} alt="" />
        </figure>
      </div>

      {globalState.live && globalState.playingRadio ? (
        <div id="now-playing-details">
          {globalState.liveMarquee.liveShowTitle && (
            <p className="title is-size-6-tablet is-size-7-mobile">
              {globalState.liveMarquee.liveShowTitle}
            </p>
          )}
          {globalState.liveMarquee.liveShowGuests && (
            <p className="title is-size-6-tablet is-size-7-mobile">
              {globalState.liveMarquee.liveShowGuests}
            </p>
          )}
        </div>
      ) : (
        <div
          className={
            globalState.isLoading
              ? 'column text-truncate mix-data'
              : 'column text-truncate mix-data is-loaded'
          }
          id="now-playing"
        >
          {/* CHRISTIAN resident name and track title may be flipped */}
          {globalState.title === null ? (
            <div id="now-playing-details">
              <p className="title is-size-6-tablet is-size-7-mobile">
                {globalState.resident}
              </p>
              { localState.hours > 0 ? `${localState.hoursPlayed.toLocaleString( 'en-US', {minimumIntegerDigits: 2})}:` : null }{ localState.minutesPlayed.toLocaleString( 'en-US', {minimumIntegerDigits: 2}) }:{ localState.secondsPlayed.toLocaleString( 'en-US', {minimumIntegerDigits: 2}) } / { localState.hours > 0 ? `${localState.hours.toLocaleString( 'en-US', {minimumIntegerDigits: 2})}:` : null }{ localState.minutes.toLocaleString( 'en-US', {minimumIntegerDigits: 2}) }:{ localState.seconds.toLocaleString( 'en-US', {minimumIntegerDigits: 2}) }
            </div>
          ) : (
            <div id="now-playing-details">
              <p className="title is-size-6-tablet is-size-7-mobile">
                {globalState.title}
              </p>
              <p className="subtitle is-size-7">{globalState.resident}</p>
              { localState.hours > 0 ? `${localState.hoursPlayed.toLocaleString( 'en-US', {minimumIntegerDigits: 2})}:` : null }{ localState.minutesPlayed.toLocaleString( 'en-US', {minimumIntegerDigits: 2}) }:{ localState.secondsPlayed.toLocaleString( 'en-US', {minimumIntegerDigits: 2}) } / { localState.hours > 0 ? `${localState.hours.toLocaleString( 'en-US', {minimumIntegerDigits: 2})}:` : null }{ localState.minutes.toLocaleString( 'en-US', {minimumIntegerDigits: 2}) }:{ localState.seconds.toLocaleString( 'en-US', {minimumIntegerDigits: 2}) }
            </div>
          )}
        </div>
      )}

      <ReactPlayer
        className="cloud-player"
        id="react-player"
        style={playerStyle}
        url={globalState.url}
        ref={player}
        width="auto"
        height="auto"
        volume={localState.volume}
        playing={globalState.playing}
        loop={globalState.loop}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={error => console.log('ReactPlayer has an issue ↴\n', error)}
        onReady={handleMixReady}
        onStart={() => console.log(`PLAYING: ${globalState.title}`)}
        onBuffer={() => console.log('onBuffer')}
        // muted={globalState.muted}
        onDuration={handleDuration}
        // onEnablePIP={this.handleEnablePIP}
        // onDisablePIP={this.handleDisablePIP}
        // onSeek={e => console.log('onSeek', e)}
        onEnded={handleEnded}
        onProgress={handleProgress}
        playsinline={true}
      />
    </>
  )
}

export default hot(module)(RadioPlayer)

// export const handleStop = () => {
//   this.setState({ url: null, playing: false });
// };

// export const handleToggleControls = () => {
//   const url = this.state.url;
//   this.setState(
//     {
//       controls: !this.state.controls,
//       url: null,
//     },
//     () => this.load(url)
//   );
// };

// export const handleToggleLight = () => {
//   this.setState({ light: !this.state.light });
// };

// export const handleToggleLoop = () => {
//   this.setState({ loop: !this.state.loop });
// };

// export const handleVolumeChange = e => {
//   this.setState({ volume: parseFloat(e.target.value) });
// };

// export const handleSetPlaybackRate = e => {
//   this.setState({ playbackRate: parseFloat(e.target.value) });
// };

// export const handleTogglePIP = () => {
//   this.setState({ pip: !this.state.pip });
// };

// export const handleEnablePIP = () => {
//   // console.log('onEnablePIP');
//   this.setState({ pip: true });
// };

// export const handleDisablePIP = () => {
//   // console.log('onDisablePIP');
//   this.setState({ pip: false });
// };

// export const handleSeekMouseDown = e => {
//   this.setState({ seeking: true });
// };

// export const handleSeekChange = e => {
//   this.setState({ played: parseFloat(e.target.value) });
// };

// export const handleSeekMouseUp = e => {
//   this.setState({ seeking: false });
//   this.player.seekTo(parseFloat(e.target.value));
// };

// export const handleProgress = state => {
//   // console.log('onProgress', state);
//   // We only want to update time slider if we are not currently seeking
//   if (!this.state.seeking) {
//     this.setState(state);
//   }
// };

// export const handleDuration = duration => {
//   // console.log('onDuration', duration);
//   this.setState({ duration });
// };

// export const handleClickFullscreen = () => {
//   screenfull.request(findDOMNode(this.player));
// };
