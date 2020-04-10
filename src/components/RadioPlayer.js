import React, { useContext, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";
import { hot } from "react-hot-loader";

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

function RadioPlayer(props) {
  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

  const [localState, setLocalState] = useState({
    url: null,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.25,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: true,
  });

  /**
   * Eliminate width and height = 0 errors by breaking ReactPlayer
   * out of normal document flow and throwing it above the top of the page
   */
  const playerStyle = {
    position: "absolute",
    top: "-175px",
    width: "1px",
    height: "1px",
    margin: "-1px",
  };

  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible);
  };

  const handlePlayPause = async () => {
    await setLocalState({ ...localState, playing: !localState.playing });
    await dispatch({ type: "TOGGLE_PLAYING" });
  };
  const handlePlay = async () => {
    await setLocalState({ ...localState, playing: true });
  };

  const handlePause = async () => {
    await setLocalState({ ...localState, playing: false });
  };

  const load = async (url) => {
    await setLocalState({
      ...localState,
      url: url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  const handleToggleMuted = async () => {
    await dispatch({ type: "TOGGLE_MUTE" });
  };

  const renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  const handleDuration = (duration) => {
    setLocalState({ duration: duration });
  };

  const renderCurrentResident = (resident) => {
    return (
      <Ticker mode="await" offset="run-in" speed={3}>
        {() => (
          <>
            <div id="live-light" />
            <p className="is-size-7 has-text-light">{resident}</p>
          </>
        )}
      </Ticker>
    );
  };

  const renderNowPlaying = (title) => {
    return (
      <Ticker mode="await" offset="run-in" speed={3}>
        {() => (
          <div className="is-hidden-tablet" id="radioShowName">
            <p className="title is-size-6 has-text-light">{title}</p>
          </div>
        )}
      </Ticker>
    );
  };

  //prettier-ignore
  const player = useRef(ReactPlayer);

  return (
    <div className="columns is-vcentered is-mobile radio-player">
      <div className="column is-narrow play-pause">
        {!globalState.playing ? (
          <FontAwesomeIcon icon={faPlay} onClick={handlePlayPause} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faPause} onClick={handlePlayPause} size="2x" />
        )}
      </div>
      <div className="column" id="radioShowDetails">
        {globalState.live ? (
          <>
            {/* LIVE Layout */}
            {/* Static Tablet & up LIVE artist */}
            <div className="is-hidden-mobile" id="radioShowTime">
              <div id="live-light" />
              <p className="subtitle is-size-7 has-text-light">
                LIVE - Pendulum
              </p>
            </div>
            {/* Dynamic Mobile Ticker LIVE artist*/}
            <div className="is-hidden-tablet" id="radioShowTime">
              <PageVisibility onChange={handleVisibilityChange}>
                {pageIsVisible && renderCurrentResident("Live - Pendulum")}
              </PageVisibility>
            </div>
          </>
        ) : (
          <>
            {/* NOT LIVE Layout */}
            {/* Static Tablet & up artist */}
            <div className="is-hidden-mobile" id="radioShowTime">
              <p className="subtitle is-size-7 has-text-light ">Some Artist</p>
            </div>
            {/* Dynamic Mobile Ticker artist*/}
            <div className="is-hidden-tablet" id="radioShowTime">
              <PageVisibility onChange={handleVisibilityChange}>
                {pageIsVisible && renderCurrentResident("Some Artist")}
              </PageVisibility>
            </div>
          </>
        )}

        {/* Static tablet and up currentTrackTitle */}
        <div className="is-hidden-mobile" id="radioShowName">
          <p className="title is-size-6 has-text-light">{globalState.title}</p>
        </div>

        {/* Dynamic mobile currentTrackTitle */}
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible && renderNowPlaying(globalState.title)}
        </PageVisibility>
      </div>

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
        muted={globalState.muted}
        onDuration={handleDuration}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={(e) => console.log("ReactPlayer has an issue ↴\n", e)}
        // onReady={() => console.log("onReady")}
        // onStart={() => console.log("onStart")}
        // onEnablePIP={this.handleEnablePIP}
        // onDisablePIP={this.handleDisablePIP}
        // onBuffer={() => console.log('onBuffer')}
        // onSeek={e => console.log('onSeek', e)}
        // onEnded={this.handleEnded}
        // onProgress={this.handleProgress}
      />
    </div>
  );
}

export default hot(module)(RadioPlayer);

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

// export const handleEnded = () => {
//   // console.log('onEnded');
//   this.setState({ playing: this.state.loop });
// };

// export const handleDuration = duration => {
//   // console.log('onDuration', duration);
//   this.setState({ duration });
// };

// export const handleClickFullscreen = () => {
//   screenfull.request(findDOMNode(this.player));
// };
