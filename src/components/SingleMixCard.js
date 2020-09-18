import React from "react";
import NanoClamp from "nanoclamp";
import { MixPlayOverlay } from "./index";
import { getResidentString, getResidentLinks, PlayAudioButton } from "../utils";

/**
 * @category Utilities
 * @subcategory Layout Helper
 * @function SingleMixCard
 * @param {Object} props
 * @property {String} props.date - archived mix's date
 * @property {String} props.url - url of the archived mix to play
 * @property {?String} props.title - Mix titles are optional, string of residents will be used to label mix if not present
 * @property {Object[]} props.residents - Array of data objects containing the mix's resident data
 * @property {Object} props.img - object containing the different sizes of a mix's image
 * @property {String[]} props.tags - the mix's tags
 * @property {String} props.columnLayout - string detailing the column layout across different responsive breakpoints @see {@link https://bulma.io/documentation/columns/sizes/|bulma.io column sizing}
 * @property {?String} props.path - optional string passed down only by {@link ResidentTemplate} for use with {@link linkResolver}
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
  const mixResidentsString = getResidentString(residents);

  return (
    <div className={columnLayout}>
      <div className="card">
        <MixPlayOverlay
          url={url}
          title={title}
          residents={mixResidentsString}
          img={img}
          wrapperClassName="card-image"
        />
        {/* <div className="card-image">
          <a
            href="#"
            className="sr-only display-text"
            tabIndex="0"
            onClick={() => {
              loadShow();
              changeUrl();
            }}
          >
            Play This Mix
          </a>
          <figure className="image is-1by1">
            <img src={img.url} alt={img.alt} />
            <div className="play-btn-diffuser is-overlay">
              <PlayAudioButton
                url={url}
                title={title}
                resident={mixResidentsString}
                img={img.now_playing.url}
              />
            </div>
          </figure>
        </div> */}

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
