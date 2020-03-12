import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { hot } from 'react-hot-loader';
import MixCloudPlayer from 'react-player/lib/players/Mixcloud';
import PlayButton from '../../img/play-button.svg';

class RadioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      pip: false,
      playing: false,
      controls: false,
      light: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
    };
  }
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  handlePlayPause = async () => {
    await this.setState({ playing: !this.state.playing });
    alert(this.state.playing);
  };

  handleStop = () => {
    this.setState({ url: null, playing: false });
  };

  handleToggleControls = () => {
    const url = this.state.url;
    this.setState(
      {
        controls: !this.state.controls,
        url: null,
      },
      () => this.load(url)
    );
  };

  handleToggleLight = () => {
    this.setState({ light: !this.state.light });
  };

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip });
  };

  handlePlay = () => {
    console.log('onPlay');
    this.setState({ playing: true });
  };

  handleEnablePIP = () => {
    console.log('onEnablePIP');
    this.setState({ pip: true });
  };

  handleDisablePIP = () => {
    console.log('onDisablePIP');
    this.setState({ pip: false });
  };

  handlePause = () => {
    console.log('onPause');
    this.setState({ playing: false });
  };

  handleSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = state => {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handleEnded = () => {
    console.log('onEnded');
    this.setState({ playing: this.state.loop });
  };

  handleDuration = duration => {
    console.log('onDuration', duration);
    this.setState({ duration });
  };

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player));
  };

  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = player => {
    this.player = player;
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
    } = this.state;
    const SEPARATOR = ' · ';
    return (
      <div className="radio-player is-flex">
        <img
          id="play-button"
          onClick={this.handlePlayPause}
          src={PlayButton}
          alt="playButton"
        />
        <MixCloudPlayer
          className="cloud-player"
          url="https://www.mixcloud.com/HalfMoonbk/donis-dez-andres-11222019/"
          light="true"
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
}

export default RadioPlayer;
