import React, { useState } from "react";
import { SingleResident } from "../../components";

// Fake Data
// import dataSet from "../../__tests__/residentsFakeData.json";

function ResidentsIndexPage() {
  const [isOpen, setIsOpen] = useState("current");

  function toggleColumn(e) {
    if (isOpen !== e.currentTarget.id) {
      setIsOpen(e.currentTarget.id);
    }
  }

  return (
    <div className="residents-page">
      <div className="container is-fluid image-diffuser">
        <div className="columns is-mobile is-multiline">
          <div className="column is-full">
            <p className="title is-size-1-desktop is-size-3-tablet is-size-4-mobile">
              Halfmoon Residents
            </p>
          </div>
          <div
            className={
              isOpen === "current"
                ? "column is-half is-active"
                : "column is-half"
            }
            id="current"
            onClick={toggleColumn}
          >
            <p className="title is-size-4-desktop is-size-6-touch has-text-centered">
              This Season
            </p>
          </div>
          <div
            className={
              isOpen === "alumni"
                ? "column is-half is-active"
                : "column is-half"
            }
            id="alumni"
            onClick={toggleColumn}
          >
            <p className="title is-size-4-desktop is-size-6-touch has-text-centered">
              Our Alumni
            </p>
          </div>
        </div>
        {isOpen === "current" ? (
          <div className="columns is-mobile is-multiline resident-selection">
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
            <SingleResident name={"CurrentRobo"} />
          </div>
        ) : null}
        {isOpen === "alumni" ? (
          <div className="columns is-mobile is-multiline resident-selection">
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
            <SingleResident name={"AlumniRobo"} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ResidentsIndexPage;
