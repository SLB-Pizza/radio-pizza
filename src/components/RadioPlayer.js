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
    loading: false,
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
    setLocalState({ ...localState, playing: !localState.playing });
    await dispatch({ type: "TOGGLE_PLAYING" });
  };
  const handlePlay = () => {
    setLocalState({ ...localState, playing: true });
  };

  const handlePause = () => {
    setLocalState({ ...localState, playing: false });
  };

  const handleLoadingComplete = async () => {
    await setLocalState({ ...localState, loading: true });
    console.log(`loading complete`);
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

  const renderNowPlaying = (resident, title) => {
    return (
      <Ticker mode="await" offset="run-in" speed={3}>
        {() => (
          <div className="is-hidden-tablet" id="radioShowName">
            <p className="title is-size-6-mobile">
              {resident} – {title}
            </p>
          </div>
        )}
      </Ticker>
    );
  };

  //prettier-ignore
  const player = useRef(ReactPlayer);

  return (
    <div className="columns is-vcentered is-mobile radio-player">
      <div className="column is-narrow">
        {!globalState.playing ? (
          <>
            <FontAwesomeIcon
              icon={faPlay}
              className="icon-color is-hidden-mobile"
              onClick={handlePlayPause}
              size="2x"
            />
            <FontAwesomeIcon
              icon={faPlay}
              className="icon-color is-hidden-tablet"
              onClick={handlePlayPause}
              size="lg"
            />
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faPause}
              className="icon-color is-hidden-mobile"
              onClick={handlePlayPause}
              size="2x"
            />
            <FontAwesomeIcon
              icon={faPause}
              className="icon-color is-hidden-tablet"
              onClick={handlePlayPause}
              size="lg"
            />
          </>
        )}
      </div>
      <div className="column is-narrow now-playing">
        <figure className="image is-64x64 is-hidden-mobile">
          <img src={`${globalState.img}`} alt="Current mix" />
          {/* <div className="play-btn-diffuser is-overlay">
            {!globalState.playing ? (
              <FontAwesomeIcon
                icon={faPlay}
                onClick={handlePlayPause}
                className="radio-play-btn"
                size="2x"
              />
            ) : (
              <FontAwesomeIcon
                icon={faPause}
                onClick={handlePlayPause}
                className="radio-play-btn"
                size="2x"
              />
            )}
          </div> */}
        </figure>
        {/* <figure className="image is-32x32 is-hidden-tablet">
          <img src={`${globalState.img}`} alt="Current mix" />
        <div className="radio-img-diffuser is-overlay">
            {!globalState.playing ? (
              <FontAwesomeIcon
                icon={faPlay}
                onClick={handlePlayPause}
                className="icon-color"
                size="lg"
              />
            ) : (
              <FontAwesomeIcon
                icon={faPause}
                onClick={handlePlayPause}
                className="icon-color"
                size="lg"
              />
            )}
          </div>
        </figure> */}
      </div>

      <div className="column" id="radioShowDetails">
        {/* Static tablet and up currentTrackTitle */}
        <div className="is-hidden-mobile" id="radioShowName">
          <p className="title is-size-6-tablet">
            {globalState.artist} – {globalState.title}
          </p>
        </div>

        {/* Dynamic mobile currentTrackTitle */}
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible &&
            renderNowPlaying(globalState.artist, globalState.title)}
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
        onReady={handleLoadingComplete}
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
