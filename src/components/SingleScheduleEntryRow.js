import React from "react";
import { getResidentLinks } from "../utils";

/**
 * @category Site Elements
 * @subcategory Layout Helper
 * @component
 * @param {Object} props
 * @returns {jsx}
 */
function SingleScheduleEntryRow({ start, end, show }) {
  const { mix_title, featured_residents } = show;

  return (
    <div className="column is-12 single-show-entry">
      <div className="columns is-mobile is-vcentered">
        <div className="column is-4">
          <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
            {start} – {end}
          </p>
        </div>
        {mix_title !== null ? (
          <div className="column is-8">
            <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
              {mix_title}
            </p>
            <p className="subtitle is-size-7 has-text-centered">
              {getResidentLinks(featured_residents)}
            </p>
          </div>
        ) : (
          <div className="column is-8">
            <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
              {getResidentLinks(featured_residents)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleScheduleEntryRow;
