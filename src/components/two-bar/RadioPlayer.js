import React, { useContext, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { hot } from 'react-hot-loader';
import ReactPlayer from 'react-player';
import PlayButton from '../../img/play-button.svg';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../../context/GlobalContextProvider';

//   this.state = {
// url: null,
// pip: false,
// playing: true,
// controls: false,
// light: false,
// volume: 1,
// muted: false,
// played: 0,
// loaded: 0,
// duration: 0,
// playbackRate: 1.0,
// loop: true,
//   };

function RadioPlayer() {
  // const {
  //   url,
  //   playing,
  //   controls,
  //   light,
  //   volume,
  //   muted,
  //   loop,
  //   played,
  //   loaded,
  //   duration,
  //   playbackRate,
  //   pip,
  // } = this.state;
  // const SEPARATOR = ' · ';
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);
  console.log(state);
  console.log(dispatch);

  const [localState, setLocalState] = useState({
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: true,
  });

  const handlePlayPause = async () => {
    await setLocalState({ ...localState, playing: !localState.playing });
    // alert(this.state.playing);
  };
  const handlePlay = async () => {
    // console.log('onPlay');
    await setLocalState({ ...localState, playing: true });
  };

  const handlePause = async () => {
    // console.log('onPause');
    await setLocalState({ ...localState, playing: false });
  };
  //prettier-ignore
  // const player = useRef <ReactPlayer> (null);

  return (
    <div className="radio-player is-flex">
      <img
        id="play-button"
        onClick={handlePlayPause}
        src={PlayButton}
        alt="playButton"
      />
      <ReactPlayer
        className="cloud-player"
        url="https://www.mixcloud.com/HalfMoonbk/endemico-presents-juke-dealer-3102020/"
        // ref={player}
        // className="react-player"
        width="100%"
        height="100%"
        // url={url}
        // pip={pip}
        playing={localState.playing}
        // controls={controls}
        // light={light}
        // loop={loop}
        // playbackRate={playbackRate}
        // volume={volume}
        // muted={muted}
        // onReady={() => console.log('onReady')}
        // onStart={() => console.log('onStart')}
        onPlay={handlePlay}
        // onEnablePIP={this.handleEnablePIP}
        // onDisablePIP={this.handleDisablePIP}
        onPause={handlePause}
        // onBuffer={() => console.log('onBuffer')}
        // onSeek={e => console.log('onSeek', e)}
        // onEnded={this.handleEnded}
        onError={e => console.log('onError', e)}
        // onProgress={this.handleProgress}
        // onDuration={this.handleDuration}
      />
      <div id="radioShowPic">
        <img
          src="https://source.unsplash.com/1920x1080/daily?music"
          alt="ShowPic"
        />
      </div>
      <div id="radioShowDetails">
        <div id="radioShowTime">
          <p>4:00 - 6:00PM</p>
        </div>
        <div id="radioShowName">
          <p>The Show with a Much Longer Title </p>
        </div>
      </div>
    </div>
  );
}

export default RadioPlayer;

// export const load = url => {
//   this.setState({
//     // url,
//     played: 0,
//     loaded: 0,
//     pip: false,
//   });
// };

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

// export const handleToggleMuted = () => {
//   this.setState({ muted: !this.state.muted });
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

// export const renderLoadButton = (url, label) => {
//   return <button onClick={() => this.load(url)}>{label}</button>;
// };

// export const ref = player => {
//   this.player = player;
// };
