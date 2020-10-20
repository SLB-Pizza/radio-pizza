import React from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  url: null,
  // playlist is an array of shows to play in as a playlist;
  // should be array of show objects (that include title, url, reisdent, etc)
  playlist: [],
  list_curr_index: 0,
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
  loop: false,
  live: false,
  playingRadio: false,
  scheduleOpen: false,
  navMenuOpen: false,
  currentClockTime: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PLAYING": {
      return {
        ...state,
        playing: !state.playing,
      };
    }

    case "SET_CLOCK_TIME": {
      console.log("time", action.payload.clockTime);
      return {
        ...state,
        currentClockTime: action.payload.clockTime,
      };
    }
    // If a new audio source is selected while playing is NOT playing, set to play
    case "SET_INITIAL_MIX": {
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
      console.log('CHANGE_URL case hit; \npayload: ', action.payload)
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

    // PLAYLIST_PLAY_FIRST should be hit by dispatch called when a NEW Curated Collection is played
    case "PLAYLIST_PLAY_FIRST": {
      // assuming payload looks like: action: { payload: { playlist: [arrayOfShowObjects] }}
      return {
        ...state,
        isLoading: false,
        playing: true,
        playlist: action.payload.playlist,
        list_curr_index: 0,
        url: action.payload.playlist[0].url,
        title: action.payload.playlist[0].title,
        resident: action.payload.playlist[0].resident,
        img: action.payload.playlist[0].img,
      };
    }

    // PLAYLIST_PLAY_NEXT should be hit by dispatch called by onEnded() in radio player callback
    case "PLAYLIST_PLAY_NEXT": {
      // TO-DO add handling in case idx is at last spot in array (can't do +1!)

      let nextIdx = state.list_curr_index +1;

      return {
        ...state,
        isLoading: false,
        playing: true,
        list_curr_index: nextidx,
        // playlist should be an array of objects
        url: state.playlist[nextIdx].url,
        title: state.playlist[nextIdx].title,
        resident: state.playlist[nextIdx].resident,
        img: state.playlist[nextIdx].img,
      };
    }

    // this case should be hit by dispatch called by onEnded() in radio player callback when last index item in playlist hit BUT playlist should loop (maybe only case we need vs PLAYLIST_END?)
    case "PLAYLIST_LOOP": {
      return {
        ...state,
        isLoading: false,
        playing: true,
        list_curr_index: 0,
        url: state.playlist[0].url,
        title: state.playlist[0].title,
        resident: state.playlist[0].resident,
        img: state.playlist[0].img,
      }
    }

    // this case should be hit by dispatch called by onEnded() in radio player callback when last index item in playlist hit AND we want playlist to stop and NOT loop
    case  "PLAYLIST_END": {
      return {
        ...state,
        isLoading: false,
        playing: false,
        // url: state.playlist[state.list_curr_index].url,
        // title: state.playlist[state.list_curr_index].title,
        // resident: state.playlist[state.list_curr_index].resident,
        // img: state.playlist[state.list_curr_index].img,
      }
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
