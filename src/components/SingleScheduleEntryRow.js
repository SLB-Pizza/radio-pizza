import React from "react";

/**
 * @category Site Elements
 * @subcategory Layout Helper
 * @component
 * @param {Object} props
 * @returns {jsx}
 */
function SingleScheduleEntryRow() {
  return (
    <div className="column is-12 single-show-entry">
      <div className="columns is-mobile is-vcentered">
        <div className="column is-4">
          <p className="title is-size-6-tablet is-size-7-mobile has-text-centered">
            start – end
          </p>
        </div>
        {show.hasOwnProperty("showName") ? (
          <div className="column is-8">
            <p className="display-text is-size-6-tablet is-size-7-mobile has-text-centered">
              mix name
            </p>
            <p className="display-text is-size-7 has-text-centered">
              mix residents
            </p>
          </div>
        ) : (
          <div className="column is-8">
            <p className="display-text is-size-6-tablet is-size-7-mobile has-text-centered">
              mix residents
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleScheduleEntryRow;
