import React from 'react'

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  // playlist is an array of shows to play in as a playlist;
  // should be array of show objects (that include title, url, resident, etc)
  playlist: [],
  list_curr_index: 0,
  url: null,
  title: null,
  resident: null,
  img: null,
  playing: false,
  controls: false,
  light: false,
  volume: 0.85,
  muted: false,
  played: 0,
  isLoading: false,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
  live: false,
  infoDisplay: null,
  playingRadio: false,
  scheduleOpen: false,
  navMenuOpen: false,
  currentClockTime: '',
  mixSearchTags: null,
  sameTagsInQuery: false,
  liveMarquee: {
    liveShowTitle: 'HMBK Presents',
    liveShowGuests: 'Radio Medley',
  },
}

function reducer(state, action) {
  console.log(action, state)
  switch (action.type) {
    /**
     * If `mixSearchTags` isn't already an array with at least one tag, create the array and add the tag.
     * Else, add the tag to the existing tag entries
     * Called by {@link addTagToSearchArray} inside {@link TagButtons}
     * @category Reducer Action
     * @name ADD_TAG_TO_MIX_SEARCH
     */
    case 'ADD_TAG_TO_MIX_SEARCH':
      if (!state.mixSearchTags) {
        return {
          ...state,
          mixSearchTags: action.payload.mixTag,
        }
      } else {
        return {
          ...state,
          mixSearchTags: [...state.mixSearchTags, action.payload.mixTag],
        }
      }

    /**
     * Remove the clicked 'selected' tag from the current mix search tags array
     * {@link RadioIndexPage}
     * @category Reducer Action
     * @name REMOVE_TAG_FROM_SEARCH_ARRAY
     */
    case 'REMOVE_TAG_FROM_SEARCH_ARRAY':
      return {
        ...state,
        mixSearchTags: state.mixSearchTags.filter(
          tag => tag !== action.payload.tagToRemove
        ),
      }

    /**
     * Clear the mix search tags when navigating away from {@link RadioIndexPage}. Dispatched by select links in {@link BottomNav} and home logo link in {@link RadioBar}.
     * @category Reducer Action
     * @name CLEAR_MIX_SEARCH_TAGS
     */
    case 'CLEAR_MIX_SEARCH_TAGS':
      return {
        ...state,
        mixSearchTags: null,
      }

    /**
     * Used to tell {@link processFetchedMixes} to combine the existing `receivedTagMixes.data` on {@link RadioIndexPage} with the incoming {@link fetchTaggedMixes} data to map the next set of mixes in {@link DisplayFetchedTaggedMixes}.
     * @category Reducer Action
     * @name USING_SAME_TAGS_IN_MIX_QUERY
     */
    case 'USING_SAME_TAGS_IN_MIX_QUERY':
      return {
        ...state,
        sameTagsInQuery: true,
      }

    /**
     * Used to tell {@link processFetchedMixes} on {@link RadioIndexPage} to use the incoming {@link fetchTaggedMixes} data to for a fresh map of {@link DisplayFetchedTaggedMixes}.
     * @category Reducer Action
     * @name NEW_TAGS_FOR_TAG_QUERY_SEARCH
     */
    case 'NEW_TAGS_FOR_TAG_QUERY_SEARCH':
      return {
        ...state,
        sameTagsInQuery: false,
      }

    /**
     * Called by {@link RadioPlayer}
     * @category Reducer Action
     * @name TOGGLE_PLAYING
     */
    case 'TOGGLE_PLAYING':
      return {
        ...state,
        playing: !state.playing,
      }

    case 'SET_CLOCK_TIME':
      return {
        ...state,
        currentClockTime: action.payload.clockTime,
      }

    /**
     * If a new audio source is selected while playing is NOT playing, set to play
     * Dispatched in {@link RadioBar} by useEffect
     * @category Reducer Action
     * @name SET_INITIAL_MIX
     */
    case 'SET_INITIAL_MIX':
      return {
        ...state,
        isLoading: true,
        url: action.payload.url,
        title: action.payload.title,
        resident: action.payload.resident,
        img: action.payload.img,
      }

    case 'MIX_LOADED':
      return {
        ...state,
        isLoading: false,
      }

    case 'SHOW_LOADING':
      return {
        ...state,
        isLoading: true,
        playing: false,
        url: null,
        title: null,
        resident: null,
        img: null,
      }

    /**
     * Changes the currently playing source in {@link RadioPlayer}.
     * Now handles cases where mixes don't have images.
     * @category Reducer Action
     * @name CHANGE_URL
     */
    case 'CHANGE_URL':
      if (!action.payload.img) {
        return {
          ...state,
          infoDisplay: 'recorded',
          isLoading: false,
          playing: true,
          playlist: [],
          list_curr_index: 0,
          url: action.payload.url,
          title: action.payload.title,
          resident: action.payload.resident,
          img: null,
          playingRadio: false,
        }
      } else {
        return {
          ...state,
          infoDisplay: 'recorded',
          isLoading: false,
          playing: true,
          playlist: [],
          list_curr_index: 0,
          url: action.payload.url,
          title: action.payload.title,
          resident: action.payload.resident,
          img: action.payload.img,
          playingRadio: false,
        }
      }

    case 'CLOSE_NAVMENU':
      return { ...state, navMenuOpen: false }

    case 'TOGGLE_NAVMENU':
      return { ...state, navMenuOpen: !state.navMenuOpen }

    case 'CLOSE_SCHEDULE':
      return { ...state, scheduleOpen: false }

    case 'TOGGLE_SCHEDULE':
      return { ...state, scheduleOpen: !state.scheduleOpen }

    case 'TOGGLE_LIVE_TEST':
      return {
        ...state,
        live: !state.live,
      }

    case 'SET_LIVE':
      return {
        ...state,
        live: true,
      }

    case 'SET_NOT_LIVE':
      return {
        ...state,
        live: false,
      }

    /**
     * @category Reducer Action
     * @name SET_INITIAL_LIVE
     */
    case 'SET_INITIAL_LIVE':
      return {
        ...state,
        infoDisplay: 'broadcast',
        isLoading: false,
        live: true,
        url: 'https://s3.radio.co/s6f093248d/listen',
      }

    /**
     * Dispatched by {@link setInitialSource} when radio is live.
     * Set url to live radio feed.
     * @category Reducer Action
     * @name SET_INITIAL_RADIO
     */
    case 'SET_INITIAL_RADIO':
      return {
        ...state,
        isLoading: false,
        live: true,
        playingRadio: true,
        url: 'https://s3.radio.co/s6f093248d/listen',
      }

    case 'PLAY_LIVE_RADIO':
      return {
        ...state,
        infoDisplay: 'broadcast',
        isLoading: false,
        playing: true,
        playingRadio: true,
        url: 'https://s3.radio.co/s6f093248d/listen',
      }

    // PLAYLIST_START should be hit by dispatch called when a NEW Curated Collection is played
    case 'PLAYLIST_START':
      /**
       * Payload looks like:
       * ```js
       * action: {
       *    payload: {
       *      ..state,
       *      playlist: [arrayOfShowObjects]
       *    }
       * }
       * ```
       */

      return {
        ...state,
        isLoading: false,
        playing: true,
        list_curr_index: 0,
        title: action.payload.title,
        img: action.payload.img,
        url: action.payload.url,
        resident: action.payload.resident,
        playlist: action.payload.playlist,
      }
    // RICH ORIGINAL
    // return {
    //   ...state,
    //   isLoading: false,
    //   playing: true,
    //   playlist: action.payload.playlist,
    //   list_curr_index: 0,
    //   url: action.payload.playlist[0].url,
    //   title: action.payload.playlist[0].title,
    //   resident: action.payload.playlist[0].resident,
    //   img: action.payload.playlist[0].img,
    // };

    // PLAYLIST_PLAY_NEXT should be hit by dispatch called by onEnded() in radio player callback
    case 'PLAYLIST_PLAY_NEXT':
      // TO-DO add handling in case idx is at last spot in array (can't do +1!)
      let nextIdx = state.list_curr_index + 1

      return {
        ...state,
        isLoading: false,
        playing: true,
        list_curr_index: nextIdx,
        // playlist should already exist as an array of objects
        url: state.playlist[nextIdx].url,
        resident: state.playlist[nextIdx].resident,
      }
    // RICH ORIGNAL
    // return {
    //   ...state,
    //   isLoading: false,
    //   playing: true,
    //   list_curr_index: nextidx,
    //   // playlist should be an array of objects
    //   url: state.playlist[nextIdx].url,
    //   title: state.playlist[nextIdx].title,
    //   resident: state.playlist[nextIdx].resident,
    //   img: state.playlist[nextIdx].img,
    // };

    // this case should be hit by dispatch called by onEnded() in radio player callback when last index item in playlist hit BUT playlist should loop (maybe only case we need vs PLAYLIST_END?)
    case 'PLAYLIST_LOOP':
      return {
        ...state,
        isLoading: false,
        playing: true,
        list_curr_index: 0,
        url: state.playlist[0].url,
        resident: state.playlist[0].resident,
      }
    // RICH ORIGINAL
    // return {
    //   ...state,
    //   isLoading: false,
    //   playing: true,
    //   list_curr_index: 0,
    //   url: state.playlist[0].url,
    //   title: state.playlist[0].title,
    //   resident: state.playlist[0].resident,
    //   img: state.playlist[0].img,
    // };

    case 'MARQUEE_UPDATE':
      return {
        ...state,
        liveMarquee: action.payload.marquee,
      }

    default:
      throw new Error('Bad Action Type')
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
