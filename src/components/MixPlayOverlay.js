import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

/**
 * Creates a clickable play button that sends the selected mix to {@link RadioPlayer}
 * @category Site Elements
 * @subcategory Layout Helper
 * @function MixPlayOverlay
 * @param {String} url - URL of the mix to play
 * @param {String} title - title of the mix to play; shown in {@link RadioPlayer}
 * @param {String} resident - resident(s) that made the mix; shown in {@link RadioPlayer}, preprocessed by {@link getResidentString}
 * @param {String} img - the mix's image; shown in {@link RadioPlayer}
 * @returns {jsx} A play icon that onClick dispatches the SHOW_LOADING and CHANGE_URL actions, playing the audio source through RadioPlayer.js
 */

function MixPlayOverlay({ url, title, residents, img, wrapperClassName }) {
  const dispatch = useContext(GlobalDispatchContext);

  const changeUrl = async () => {
    await dispatch({ type: "SHOW_LOADING" });
    await dispatch({
      type: "CHANGE_URL",
      payload: {
        url,
        title,
        resident: residents,
        img: img.now_playing.url,
      },
    });
  };

  return (
    <div className={wrapperClassName}>
      <a
        href="#"
        className="sr-only display-text"
        tabIndex="0"
        onClick={() => changeUrl()}
      >
        Play This Mix
      </a>
      <figure className="image is-1by1">
        <img src={img.url} alt={img.alt} />
        <div className="play-btn-diffuser is-overlay">
          <FontAwesomeIcon
            icon={faPlay}
            size="5x"
            className="play-icon"
            onClick={() => changeUrl()}
          />
        </div>
      </figure>
    </div>
  );
}

export default MixPlayOverlay;