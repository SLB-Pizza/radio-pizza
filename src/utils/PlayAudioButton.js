import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

/**
 * Creates a clickable play button that sends the selected mix to {@link RadioPlayer}
 * @category Site Elements
 * @subcategory Layout Helper
 * @function
 * @function PlayAudioButton
 * @param {string} url - URL of the mix to play
 * @param {string} title - title of the mix to play; shown in {@link RadioPlayer}
 * @param {string} resident - residents that made the mix; shown in {@link RadioPlayer}
 * @param {string} img - the mix's image; shown in {@link RadioPlayer}
 * @returns {jsx} A play icon that onClick dispatches the SHOW_LOADING and CHANGE_URL actions, playing the audio source through RadioPlayer.js
 */

function PlayAudioButton({ url, title, resident, img }) {
  const dispatch = useContext(GlobalDispatchContext);

  return (
    <FontAwesomeIcon
      icon={faPlay}
      size="5x"
      className="play-icon"
      onClick={() => {
        dispatch({ type: "SHOW_LOADING" });
        dispatch({
          type: "CHANGE_URL",
          payload: {
            url,
            title,
            resident,
            img,
          },
        });
      }}
    />
  );
}

export default PlayAudioButton;
