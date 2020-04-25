import React from "react";

function SearchDropdown(props) {
  return (
    <div className="column is-full is-hidden-tablet">
      <div className="field">
        <div className="control is-expanded">
          <div className="select is-medium is-fullwidth">
            <select name="searchResults">
              <option value="">Mixes (40)</option>
              <option value="">Residents (12)</option>
              <option value="">Events (5)</option>
              <option value="">News (1)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchDropdown;
