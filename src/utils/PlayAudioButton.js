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
 * @param {string} mixUrl - URL of the mix to play
 * @param {string} mixTitle - title of the mix to play; shown in TopNav
 * @param {string} mixResident - resident that made the mix; shown in TopNav
 * @param {string} mixImg - the mix's image; shown in TopNav
 * @returns {jsx} A play icon that onClick dispatches the CHANGE_URL action, playing the audio source through RadioPlayer.js
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
        setTimeout(() => {
          dispatch({
            type: "CHANGE_URL",
            payload: {
              url,
              title,
              resident,
              img,
            },
          });
        }, 2000);
      }}
    />
  );
}

export default PlayAudioButton;
