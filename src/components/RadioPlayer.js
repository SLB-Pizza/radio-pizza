import React, { useContext, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import { hot } from "react-hot-loader";
import ReactPlayer from "react-player";
import {
  GlobalDispatchContext,
  GlobalStateContext
} from "../context/GlobalContextProvider";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

function RadioPlayer(props) {
  /**
   * Eliminate width and height = 0 errors by breaking ReactPlayer
   * out of normal document flow and throwing it above the top of the page
   */
  const playerStyle = {
    position: "absolute",
    top: "-175px"
  };

  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

  const [localState, setLocalState] = useState({
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.5,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: true
  });

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

  const load = async url => {
    await setLocalState({
      ...localState,
      url: url,
      played: 0,
      loaded: 0,
      pip: false
    });
  };

  const handleToggleMuted = async () => {
    await dispatch({ type: "TOGGLE_MUTE" });
  };

  const renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  //prettier-ignore
  const player = useRef(ReactPlayer);

  // const liveStatus =

  return (
    <div className="columns is-vcentered is-mobile radio-player">
      <div className="column is-narrow">
        {!globalState.playing ? (
          <span className="icon has-text-light">
            <FontAwesomeIcon
              icon={faPlay}
              onClick={handlePlayPause}
              size="2x"
            />
          </span>
        ) : (
          <span className="icon has-text-light">
            <FontAwesomeIcon
              icon={faPause}
              onClick={handlePlayPause}
              size="2x"
            />
          </span>
        )}
      </div>
      <div className="column" id="radioShowDetails">
        <div id="radioShowTime">
          <p className="is-size-7 has-text-light">{props.status}</p>
        </div>
        <div id="radioShowName">
          <p className="is-size-6 has-text-light">{globalState.title}</p>
        </div>
      </div>
      <ReactPlayer
        className="cloud-player"
        url={globalState.url}
        ref={player}
        width="auto"
        height="auto"
        volume={localState.volume}
        playing={globalState.playing}
        loop={globalState.loop}
        muted={globalState.muted}
        style={playerStyle}
        // onReady={() => console.log("onReady")}
        // onStart={() => console.log("onStart")}
        onPlay={handlePlay}
        // onEnablePIP={this.handleEnablePIP}
        // onDisablePIP={this.handleDisablePIP}
        onPause={handlePause}
        // onBuffer={() => console.log('onBuffer')}
        // onSeek={e => console.log('onSeek', e)}
        // onEnded={this.handleEnded}
        onError={e => console.log("onError", e)}
        // onProgress={this.handleProgress}
        // onDuration={this.handleDuration}
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

// export const ref = player => {
//   this.player = player;
// };
