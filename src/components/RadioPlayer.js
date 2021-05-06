import React, { useContext, useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { hot } from 'react-hot-loader'
import {
  LiveBroadcastInfoWrapper,
  RecordedMixInfoDisplay,
  RecordedMixPlayerImage,
} from './index'
import { handleEnded, handleMixReady, handlePlayPause } from '../dispatch'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'

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
    hours: 0,
    minutes: 0,
    seconds: 0,
    hoursPlayed: 0,
    minutesPlayed: 0,
    secondsPlayed: 0,
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

  const handleDuration = duration => {
    let seconds = Math.round(duration % 60)
    let minutes = Math.round(duration / 60)
    let hours = Math.round(minutes / 60)

    if (minutes >= 60) {
      hours = Math.round(minutes / 60)
      minutes = minutes % 60
    } else {
      hours = 0
    }

    setLocalState({
      ...localState,
      hours,
      minutes,
      seconds,
    })
  }

  const handleProgress = (played, loaded) => {
    let hoursPlayed = 0
    let minutesPlayed = 0
    let secondsPlayed = 0
    if (Math.round(played?.playedSeconds) > 59) {
      minutesPlayed = Math.floor(played.playedSeconds / 60)

      if (minutesPlayed > 59) {
        hoursPlayed = Math.floor(minutesPlayed / 60)
        minutesPlayed = minutesPlayed % 60
      } else {
        hoursPlayed = 0
      }

      secondsPlayed = Math.round(played.playedSeconds % 60)
    } else {
      hoursPlayed = 0
      minutesPlayed = 0
      secondsPlayed = Math.round(played.playedSeconds % 60)
    }

    setLocalState({
      ...localState,
      hoursPlayed,
      minutesPlayed,
      secondsPlayed,
    })
  }

  /**
   *
   * @category useEffect
   */
  useEffect(() => {
    setLocalState({
      ...localState,
      hours: localState.hours,
      minutes: localState.minutes,
      seconds: localState.seconds,
      hoursPlayed: localState.hoursPlayed,
      minutesPlayed: localState.hoursPlayed,
      secondsPlayed: localState.secondsPlayed,
    })
  }, [])

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
        <Icon
          icon={!globalState.playing ? 'play' : 'pause'}
          className="icon-color"
          onClick={() => {
            handlePlayPause(dispatch)
          }}
          size="2x"
        />
      </div>

      {!globalState.playingRadio ? (
        <RecordedMixPlayerImage
          isLoading={globalState.isLoading}
          imgURL={globalState.img}
          imgAlt={globalState.title}
        />
      ) : null}

      {globalState.live && globalState.playingRadio ? (
        <LiveBroadcastInfoWrapper
          liveTitle={globalState.liveMarquee.liveShowTitle}
          liveGuests={globalState.liveMarquee.liveShowGuests}
        />
      ) : (
        <div
          className={
            globalState.isLoading
              ? 'column text-truncate mix-data'
              : 'column text-truncate mix-data is-loaded'
          }
          id="now-playing"
        >
          <RecordedMixInfoDisplay
            title={globalState.title}
            residents={globalState.resident}
            hoursPlayed={localState.hoursPlayed}
            minutesPlayed={localState.minutesPlayed}
            secondsPlayed={localState.secondsPlayed}
            totalHours={localState.hours}
            totalMinutes={localState.minutes}
            totalSeconds={localState.seconds}
          />
        </div>
      )}

      <ReactPlayer
        width="auto"
        height="auto"
        className="cloud-player"
        id="react-player"
        ref={player}
        style={playerStyle}
        url={globalState.url}
        volume={0.85}
        playing={globalState.playing}
        loop={globalState.loop}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onBuffer={() => console.log('onBuffer')}
        onReady={() => {
          handleMixReady(dispatch)
        }}
        onEnded={() => {
          handleEnded(
            dispatch,
            globalState.playlist.length,
            globalState.list_curr_index
          )
        }}
        onError={error => console.error(error)}
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
