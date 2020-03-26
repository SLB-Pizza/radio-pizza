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
        <div className="columns">
          <div className="column">
            <p className="title is-size-1-desktop is-size-3-touch">
              Halfmoon Residents
            </p>
          </div>
        </div>
        {/*
        Desktop
        */}
        <div className="columns is-multiline is-hidden-touch">
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
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
          <SingleResident />
        </div>
        {/*
        Mobile
        */}
        <div className="columns is-mobile is-multiline is-hidden-desktop">
          <div className="column is-2-touch alphabet">
            {alphabet.map(letter => (
              <ResidentsAlpha key={letter} letter={letter} />
            ))}
          </div>
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
