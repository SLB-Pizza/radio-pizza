import React from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  url:
    "https://soundcloud.com/soundcloud-scenes/sets/currents-next-gen-chillwave",
  title: "Next Gen ChillWave",
  artist: "Currents",
  img: "../img/test/next-gen-chillwave.jpg",
  playing: false,
  controls: false,
  light: false,
  volume: 0.65,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: true,
  live: false,
  playingRadio: false,
  scheduleOpen: false,
  navMenuOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PLAYING": {
      return {
        ...state,
        playing: !state.playing,
      };
    }
    // If a new audio source is selected while playing is NOT playing, set to play
    case "CHANGE_URL": {
      return {
        ...state,
        url: action.payload.url,
        title: action.payload.title,
        artist: action.payload.artist,
        playing: true,
        img: action.payload.img,
      };
    }

    case "CLOSE_NAVMENU": {
      return { ...state, navMenuOpen: false };
    }

    case "TOGGLE_NAVMENU": {
      return { ...state, navMenuOpen: !state.navMenuOpen };
    }

    case "CLOSE_SCHEDULE": {
      return { ...state, scheduleOpen: false };
    }

    case "TOGGLE_SCHEDULE": {
      return { ...state, scheduleOpen: !state.scheduleOpen };
    }

    case "TOGGLE_MUTE": {
      return {
        ...state,
        muted: !state.muted,
      };
    }
    case "TOGGLE_LIVE_TEST": {
      return {
        ...state,
        live: !state.live,
      };
    }
    case "PLAY_LIVE_RADIO": {
      return {
        ...state,
        playing: true,
        playingRadio: true,
      };
    }
    default:
      throw new Error("Bad Action Type");
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
