import React from 'react';

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  url:
    'https://soundcloud.com/soundcloud-scenes/sets/currents-next-gen-chillwave',
  title: 'Next Gen ChillWave',
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
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PLAYING': {
      console.log('state in TOGGLE_PLAYING CASE: \n', state);
      return {
        ...state,
        playing: state.playing === true ? false : true,
      };
    }
    case 'CHANGE_URL': {
      console.log('state in CHANGE_URL CASE: \n', state);
      console.log('action in CHANGE_URL CASE: \n', action);

      // return {
      //   ...state,
      //   url: '??',
      // };
      break;
    }
    default:
      throw new Error('Bad Action Type');
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // console.log('state in GlobalContextProvider wrap: ', state);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
