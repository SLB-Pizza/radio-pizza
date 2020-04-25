import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { SearchColumns, SearchDropdown, SearchResults } from "../../components";

function SearchIndexPage() {
  const [isSelected, setIsSelected] = useState("mixes");
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

  function toggleColumn(e) {
    if (isSelected !== e.currentTarget.id) {
      setIsSelected(e.currentTarget.id);
    }
  }

  return (
    <div className="container is-fluid mixes-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p
            className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile"
            onClick={() => {
              setVisibleLogo(!visibleLogo);
            }}
          >
            Search
          </p>
          <p className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">
            Search non-functional – click/touch "Search" headline to see
            intended layout when functional. -WORK IN PROGRESS-
          </p>
        </div>
        <div className="column is-full">
          <div className="field">
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
                onSubmit={handleSubmit}
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
        ) : (
          <>
            <SearchColumns
              toggleColumn={toggleColumn}
              isSelected={isSelected}
            />
            <SearchDropdown />
            <SearchResults isSelected={isSelected} />
          </>
        )}
      </div>
    </div>
  );
}

export default SearchIndexPage;
