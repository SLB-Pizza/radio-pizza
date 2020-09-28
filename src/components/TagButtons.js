import React from "react";

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
