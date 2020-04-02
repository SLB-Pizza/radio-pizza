import React from "react";
import { ResidentsAlpha, SingleResident } from "./index";

// Fake Data
import dataSet from "../../__tests__/residentsFakeData.json";

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

function ResidentsPage() {
  return (
    <div className="residents-page">
      <div className="container is-fluid image-diffuser">
        <div className="columns is-mobile is-multiline">
          <div className="column is-full">
            <p className="title is-size-1-desktop is-size-3-touch">
              Halfmoon Residents
            </p>
          </div>
          <div className="column is-half">
            <p className="title is-size-3-desktop is-size-5-touch has-text-centered">
              Current Residents
            </p>
          </div>
          <div className="column is-half">
            <p className="title is-size-3-desktop is-size-5-touch has-text-centered">
              Halfmoon Alumni
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

export default ResidentsPage;
