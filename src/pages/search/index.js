import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchIndexPage() {
  return (
    <div className="container is-fluid mixes-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
            Search
          </p>
        </div>
        <div className="column is-full">
          <div className="field">
            <div className="control is-expanded has-icons-left has-icons-right">
              <input
                className="input is-primary is-large"
                type="text"
                placeholder="Search HalfmoonBK..."
              />
              <span className="icon is-left is-large">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
        </div>
        <div className="column is-full">
          {/* <img src={} alt="HMBK logo" /> */}
        </div>
      </div>
    </div>
  );
}

export default SearchIndexPage;
