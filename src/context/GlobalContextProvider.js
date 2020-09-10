import React from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  url: null,
  title: null,
  resident: null,
  img: null,
  playing: false,
  controls: false,
  light: false,
  volume: 0.65,
  muted: false,
  played: 0,
  isLoading: false,
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
    /**
     * If a new audio source is selected while playing is NOT playing, set to play
     */
    case "SET_INITIAL_MIX": {
      console.log("payload:", action.payload);
      return {
        ...state,
        isLoading: true,
        url: action.payload.url,
        title: action.payload.title,
        resident: action.payload.resident,
        img: action.payload.img,
      };
    }

    case "MIX_LOADED": {
      return {
        ...state,
        isLoading: false,
      };
    }

    case "SHOW_LOADING": {
      return {
        ...state,
        isLoading: true,
        playing: false,
        url: null,
        title: null,
        resident: null,
        img: null,
      };
    }

    case "CHANGE_URL": {
      return {
        ...state,
        isLoading: false,
        playing: true,
        url: action.payload.url,
        title: action.payload.title,
        resident: action.payload.resident,
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
