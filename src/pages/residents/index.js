import React from "react";
import { SingleResident } from "../../components";

import "../../styles/index.scss";
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
  "Z"
];

function ResidentsIndexPage() {
  return (
    <div className="residents-page">
      <div className="container is-fluid image-diffuser">
        <div className="columns is-mobile is-multiline">
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
          <div className="column is-half" id="current">
            <p className="title is-size-4-desktop is-size-6-touch has-text-centered">
              This Season
            </p>
          </div>
          <div className="column is-half" id="alumni">
            <p className="title is-size-4-desktop is-size-6-touch has-text-centered">
              Our Alumni
            </p>
          </div>
        </div>
        {/*
        Desktop
        */}
        <div className="columns is-multiline is-mobile">
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
        </div>
      </div>
    </div>
  );
}

export default ResidentsIndexPage;
