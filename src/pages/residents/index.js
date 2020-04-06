import React, { useState } from "react";
import { SingleResident } from "../../components";

// Fake Data
// import dataSet from "../../__tests__/residentsFakeData.json";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function ResidentsIndexPage() {
  const [isOpen, setIsOpen] = useState("current");

  function toggleColumn(e) {
    if (isOpen === e.currentTarget.id) {
      setIsOpen("");
    } else {
      setIsOpen(e.currentTarget.id);
    }
  }

  return (
    <div className="residents-page">
      <div className="container is-fluid image-diffuser">
        <div className="columns is-mobile is-multiline resident-selection">
          <div className="column is-full">
            <p className="title is-size-1-desktop is-size-3-touch">
              Halfmoon Residents
            </p>
          </div>
          {/* <div className="column is-full">
            <div class="tabs is-centered is-fullwidth is-boxed">
              <ul>
                <li class="is-active">
                  <a href="#section">
                    <span>Current Season</span>
                  </a>
                </li>
                <li>
                  <a href="#section">
                    <span>Our Alumni</span>
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="column is-half" id="current" onClick={toggleColumn}>
            <p className="title is-size-4-desktop is-size-6-touch has-text-centered">
              This Season
            </p>
          </div>
          <div className="column is-half" id="alumni" onClick={toggleColumn}>
            <p className="title is-size-4-desktop is-size-6-touch has-text-centered">
              Our Alumni
            </p>
          </div>
        </div>
        {/*
        Desktop
        */}
        {isOpen === "current" ? (
          <div className="columns is-multiline is-mobile all-residents">
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
            <SingleResident name={"CurrentRobo"} />
          </div>
        ) : null}
        {isOpen === "alumni" ? (
          <div className="columns is-multiline is-mobile all-residents">
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
            <SingleResident name={"AlumniRobo"} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ResidentsIndexPage;
