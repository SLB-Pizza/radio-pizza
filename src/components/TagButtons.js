import PropTypes from "prop-types";
import React from "react";

/**
 * Makes tag buttons.
 *
 * Used in:
 * - {@link SingleMixCard}
 *
 * @category Layout Helper
 * @function TagButtons
 * @param {String[]} tagsArray - array of strings that are used to make the individual tag buttons
 * @returns {jsx} a button with the tag as the label
 */
function TagButtons({ tagsArray }) {
  return (
    <div className="buttons are-tags">
      {tagsArray.map((tag, index) => {
        const lowercaseTag = tag.toLowerCase();

        return (
          <button
            key={`button-tag-#${index}`}
            className="button is-small is-outlined is-rounded"
          >
            {lowercaseTag}
          </button>
        );
      })}
    </div>
  );
}

export default TagButtons;

TagButtons.propTypes = {
  tagsArray: PropTypes.arrayOf(PropTypes.string),
};
