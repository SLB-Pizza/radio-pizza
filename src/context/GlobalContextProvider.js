import React from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  url:
    "https://soundcloud.com/soundcloud-scenes/sets/currents-next-gen-chillwave",
  title: "Next Gen ChillWave",
  artist: "Half Moon BK",
  img: "../img/next-gen-chillwave.jpg",
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
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PLAYING": {
      return {
        ...state,
        playing: !state.playing,
      };
    }
    case "CHANGE_URL": {
      // If a new audio source is selected while playing is NOT playing, set to play
      return {
        ...state,
        url: action.payload.url,
        title: action.payload.title,
        playing: true,
        artist: action.payload.artist,
        img: action.payload.img,
      };
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
