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

/**
 * @category Site Elements
 * @subcategory Layout Helper
 * @function
 * @returns {jsx}
 */
function RadioPlayer() {
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
   * Eliminate width and height = 0 errors by breaking ReactPlayer out of normal document flow and throwing it above the top of the page
   */
  const playerStyle = {
    position: "absolute",
    top: "-175px",
    width: "1px",
    height: "1px",
    margin: "-1px",
  };

  // const [pageIsVisible, setPageIsVisible] = useState(true);

  // const handleVisibilityChange = (isVisible) => {
  //   setPageIsVisible(isVisible);
  // };

  const handlePlayPause = async () => {
    await dispatch({ type: "TOGGLE_PLAYING" });
  };
  const handlePlay = () => {
    setLocalState({ ...localState, playing: true });
  };

  const handlePause = () => {
    setLocalState({ ...localState, playing: false });
  };

  const handleMixReady = async () => {
    await dispatch({ type: "MIX_LOADED" });
  };

  const handleEnded = async () => {
    console.log('onEnded');


    // ADD check in case we are ending on a single track, not a playlist
    if(globalState.playlist.length){
      // if list_curr_index from global state is less the current playlist's number of tracks, then dispatch func which increments it by one and plays next 
      if(globalState.playlist.length -1 > globalState.list_curr_index) {

        await dispatch({ type: "PLAYLIST_PLAY_NEXT" });

      } else {

        await dispatch({ type: "PLAYLIST_LOOP" });

      }
    }

    return;

  };

  // const handleVolumeChange = (e) => {
  //   let value = parseFloat(e.target.value);
  //   console.log("current volume", value);

  //   setLocalState({ volume: value });
  // };

  // const load = async (url) => {
  //   await setLocalState({
  //     ...localState,
  //     url: url,
  //     played: 0,
  //     loaded: 0,
  //     pip: false,
  //   });
  // };

  // const renderLoadButton = (url, label) => {
  //   return <button onClick={() => this.load(url)}>{label}</button>;
  // };

  // const handleDuration = (duration) => {
  //   setLocalState({ duration: duration });
  // };

  // const renderNowPlaying = (resident, title) => {
  //   return (
  //     <Ticker mode="await" offset="run-in" speed={3}>
  //       {() => (
  //         <div className="is-hidden-tablet" id="radioShowName">
  //           <p className="display-text is-size-6-mobile">
  //             {resident} – {title}
  //           </p>
  //         </div>
  //       )}
  //     </Ticker>
  //   );
  // };

  const player = useRef(ReactPlayer);

  return (
    <>
      <div
        className={
          globalState.isLoading
            ? "column is-narrow mix-data"
            : "column is-narrow mix-data is-loaded"
        }
      >
        {!globalState.playing ? (
          <FontAwesomeIcon
            icon={faPlay}
            className="icon-color"
            onClick={handlePlayPause}
            size="2x"
          />
        ) : (
          <FontAwesomeIcon
            icon={faPause}
            className="icon-color"
            onClick={handlePlayPause}
            size="2x"
          />
        )}
      </div>

      <div
        className={
          globalState.isLoading
            ? "column is-narrow mix-data"
            : "column is-narrow mix-data is-loaded"
        }
      >
        <figure className="image is-48x48">
          <img src={`${globalState.img}`} alt="" />
        </figure>
      </div>

      <div
        className={
          globalState.isLoading
            ? "column text-truncate mix-data"
            : "column text-truncate mix-data is-loaded"
        }
        id="now-playing"
      >
        {globalState.title === null ? (
          <div id="now-playing-details">
            <p className="title is-size-6-tablet is-size-7-mobile">
              {globalState.resident}
            </p>
          </div>
        ) : (
          <div id="now-playing-details">
            <p className="title is-size-6-tablet is-size-7-mobile">
              {globalState.title}
            </p>
            <p className="subtitle is-size-7">{globalState.resident}</p>
          </div>
        )}
      </div>

      {/* <div className="column">
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={localState.volume}
          onChange={(e) => handleVolumeChange(e)}
        />
        <p className="is-size-6">{localState.volume}</p>
      </div> */}

      {/* <div className="column is-hidden-mobile" id="now-playing-img">
        <figure className="image is-48x48">
          <img src={`${globalState.img}`} alt="Current mix" />
        </figure>
      </div>

      <div className="column" id="now-play-details"> */}
      {/* Static tablet and up currentTrackTitle */}
      {/* <p className="display-text is-size-7-tablet">{globalState.resident}</p>
        <p className="display-text is-size-6-tablet">{globalState.title}</p> */}

      {/* <div className="is-hidden-mobile" id="radioShowName">
          <p className="display-text is-size-6-tablet">
            {globalState.resident} – {globalState.title}
          </p>
        </div> */}

      {/* Dynamic mobile currentTrackTitle */}
      {/* <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible &&
            renderNowPlaying(globalState.resident, globalState.title)}
        </PageVisibility>
      </div> */}

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
        onError={(error) => console.log("ReactPlayer has an issue ↴\n", error)}
        onReady={handleMixReady}
        onStart={() => console.log(`PLAYING: ${globalState.title}`)}
        onBuffer={() => console.log("onBuffer")}
        // muted={globalState.muted}
        // onDuration={handleDuration}
        // onEnablePIP={this.handleEnablePIP}
        // onDisablePIP={this.handleDisablePIP}
        // onSeek={e => console.log('onSeek', e)}
        onEnded={handleEnded}
        // onProgress={this.handleProgress}
      />
    </>
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

// export const handleDuration = duration => {
//   // console.log('onDuration', duration);
//   this.setState({ duration });
// };

// export const handleClickFullscreen = () => {
//   screenfull.request(findDOMNode(this.player));
// };
