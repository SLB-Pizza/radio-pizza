import React, { useState } from "react";
import { SelectedColumn, SingleResident } from "../../components";

// Dummy data in __test__ folder
import dummyArtists from "../../../__test__/dummyArtists.json";

/**
 * TO REMOVE IN THIS FILE FOR SHIPMENT
 * dummyArtists
 * alphabetizedResidents helper function (do it in gql query)
 *
 * TO CHANGE IN THIS FILE
 * change alphabetizedResidents map to actual artist data
 *
 * @category Pages
 * @subcategory Indexes
 * @function ResidentIndex
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/residents` landing page
 * @returns {jsx}
 */

function ResidentsIndex() {
  const [isOpen, setIsOpen] = useState("current");

  function toggleColumn(e) {
    if (isOpen !== e.currentTarget.id) {
      setIsOpen(e.currentTarget.id);
    }
  }

  const alphabetizedResidents = dummyArtists.sort((a, b) => {
    let nameA = a.name.toUpperCase(); // make both uppercase so...
    let nameB = b.name.toUpperCase(); // ...it ignore capitals in sorting

    if (nameA < nameB) {
      return -1; //nameA comes first
    }
    if (nameA > nameB) {
      return 1; // nameB comes first
    }
    return 0; // names are the same
  });

  return (
    <div className="container is-fluid full-height-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile headline">
            Halfmoon Residents
          </p>
        </div>
        <div className="column">
          <button
            className="button is-fullwidth is-outlined is-rounded display-text"
            id="current"
            onClick={toggleColumn}
          >
            This Season
          </button>
        </div>
        <div className="column">
          <button
            className="button is-fullwidth is-outlined is-rounded display-text"
            id="alumni"
            onClick={toggleColumn}
          >
            Our Alumni
          </button>
        </div>
      </div>
      {isOpen === "current" ? (
        <div className="columns is-mobile is-multiline">
          {alphabetizedResidents.map((resident) => (
            <SingleResident
              key={resident.name}
              name={`${resident.name} | current`}
              img={"https://source.unsplash.com/1280x1280/daily?cyberpunk"}
            />
          ))}
        </div>
      ) : null}
      {isOpen === "alumni" ? (
        <div className="columns is-mobile is-multiline">
          {alphabetizedResidents.map((resident) => (
            <SingleResident
              key={resident.name}
              name={`${resident.name} | alumnus`}
              img={"https://source.unsplash.com/1280x1280/daily?robot"}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ResidentsIndex;
