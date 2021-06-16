import React, { useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import { SearchColumns, SearchDropdown, SearchResults } from '../../components'

function SearchIndexPage() {
  const [isSelected, setIsSelected] = useState('mixes')
  const [visibleLogo, setVisibleLogo] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchStatus, setSearchStatus] = useState(false)

  const handleChange = e => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setVisibleLogo(false)
    setSearchStatus(true)
  }

  function toggleColumn(e) {
    if (isSelected !== e.currentTarget.id) {
      setIsSelected(e.currentTarget.id)
    }
  }

  return (
    <div className="container is-fluid site-content">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p
            className="title is-size-3-desktop is-size-4-touch"
            onClick={() => {
              setVisibleLogo(!visibleLogo)
            }}
          >
            Search
          </p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            Search non-functional – click/touch "Search" headline to see
            intended layout when functional. -WORK IN PROGRESS-
          </p>
        </div>
        <div className="column is-full">
          <div className="field">
            <div
              className={
                searchStatus
                  ? 'control is-expanded has-icons-left has-icons-right is-loading'
                  : 'control is-expanded has-icons-left'
              }
            >
              <input
                className="input is-medium is-rounded"
                type="text"
                value={searchValue}
                onChange={handleChange}
                onSubmit={handleSubmit}
                placeholder="Search HalfmoonBK..."
              />
              <span className="icon is-left">
                <Icon icon="faSearch" />
              </span>
              {/* {searchStatus ? (
                <span className="icon is-right is-large">
                  <Icon icon={faCheck} />
                </span>
              ) : null} */}
            </div>
          </div>
        </div>
      </div>

      <SearchColumns toggleColumn={toggleColumn} isSelected={isSelected} />

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
          <SearchDropdown />
          <SearchResults isSelected={isSelected} />
        </>
      )}
    </div>
  )
}

export default SearchIndexPage
