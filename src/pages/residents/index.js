import React, { useState } from "react";
import { SingleResident } from "../../components";

// Dummy data in __tests__ folder
import dummyArtists from "../../../__tests__/dummyArtists.json";

function ResidentsIndexPage() {
  const [isOpen, setIsOpen] = useState("current");

  function toggleColumn(e) {
    if (isOpen !== e.currentTarget.id) {
      setIsOpen(e.currentTarget.id);
    }
  }

  return (
    <div className="container is-fluid site-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile headline">
            Halfmoon Residents
          </p>
        </div>
        <div
          className={
            isOpen === "current" ? "column is-half is-active" : "column is-half"
          }
          id="current"
          onClick={toggleColumn}
        >
          <button className="button is-fullwidth is-outlined is-rounded is-dark is-inverted display-text">
            This Season
          </button>
        </div>
        <div
          className={
            isOpen === "alumni" ? "column is-half is-active" : "column is-half"
          }
          id="alumni"
          onClick={toggleColumn}
        >
          <button className="button is-fullwidth is-outlined is-rounded is-dark is-inverted display-text">
            Our Alumni
          </button>
        </div>
      </div>
      {isOpen === "current" ? (
        <div className="columns is-mobile is-multiline">
          {dummyArtists.map((resident) => (
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
          {dummyArtists.map((resident) => (
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

export default ResidentsIndexPage;
