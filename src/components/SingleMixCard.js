import React, { useContext } from "react";
import NanoClamp from "nanoclamp";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";
import { getResidentString, getResidentLinks, playAudioButton } from "../utils";

/**
 * @category Utilities
 * @subcategory Layout Helper
 * @function SingleMixCard
 * @param {Object} props
 * @property {String} props.date
 * @property {String} props.url
 * @property {Object[]} props.title
 * @property {Object[]} props.residents -
 * @property {Object} props.img
 * @property {String[]} props.tags
 * @property {String} props.columnLayout
 * @returns {jsx}
 */
function SingleMixCard({
  date,
  url,
  title,
  residents,
  img,
  tags,
  columnLayout,
  path,
}) {
  const dispatch = useContext(GlobalDispatchContext);

  const mixResidentsString = getResidentString(residents);

  return (
    <div className={columnLayout}>
      <div className="card">
        <div className="card-image">
          <a
            href="#"
            className="sr-only display-text"
            tabIndex="0"
            onClick={() =>
              dispatch({
                type: "CHANGE_URL",
                payload: {
                  url: url,
                  title: title,
                  residents: mixResidentsString,
                  img: img.now_playing.url,
                },
              })
            }
          >
            Play This Mix
          </a>
          <figure className="image is-1by1">
            <img src={img.url} alt={img.alt} />
            <div className="play-btn-diffuser is-overlay">
              {playAudioButton(
                url,
                title,
                mixResidentsString,
                img.now_playing.url
              )}
            </div>
          </figure>
        </div>

        <div className="card-content">
          {/**
           * title !== null : format title under list of residents
           * title === null : formart list of residents as title
           */
          title !== null ? (
            <div className="content-text">
              <p className="is-size-7">{date}</p>
              <NanoClamp
                className="content-details subtitle is-size-7"
                is="p"
                lines={2}
                text={getResidentLinks(residents, path)}
              />
              <NanoClamp
                className="title is-size-6"
                is="p"
                lines={2}
                text={title}
              />
            </div>
          ) : (
            <div className="content-text">
              <p className="is-size-7">{date}</p>
              <NanoClamp
                className="title is-size-6"
                is="p"
                lines={2}
                text={getResidentLinks(residents, path)}
              />
            </div>
          )}
          <div className="buttons are-tags">
            {tags.map((tag, index) => {
              const lowercaseTag = tag.toLowerCase();
              return (
                <button
                  key={`${title} tag #${index}`}
                  className="button is-small is-outlined is-rounded"
                >
                  {lowercaseTag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMixCard;
