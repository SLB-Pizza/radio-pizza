import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";

function SearchIndexPage() {
  const [visibleLogo, setVisibleLogo] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue, "current value");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue, "submitted");
    setVisibleLogo(false);
    setSearchStatus(true);
  };

  return (
    <div className="container is-fluid mixes-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
            Search
          </p>
          <p className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">
            Not currently connected. You can see what search would look like by
            typing anything in and hitting enter.
          </p>
        </div>
        <div className="column is-full">
          <div className="field" onSubmit={handleSubmit}>
            <div
              className={
                searchStatus
                  ? "control is-expanded has-icons-left has-icons-right is-loading is-medium"
                  : "control is-expanded has-icons-left"
              }
            >
              <input
                className="input is-primary is-medium"
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder="Search HalfmoonBK..."
              />
              <span className="icon is-left is-medium">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              {/* {searchStatus ? (
                <span className="icon is-right is-large">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              ) : null} */}
            </div>
          </div>
        </div>
        {visibleLogo ? (
          <div className="column search-logo">
            <figure className="image is-128x128 is-hidden-tablet">
              <img src="../../img/Halfmoon-3.png" alt="HalfMoonBK Logo" />
            </figure>
            <figure className="image is-256x256 is-hidden-mobile">
              <img src="../../img/Halfmoon-3.png" alt="HalfMoonBK Logo" />
            </figure>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchIndexPage;
