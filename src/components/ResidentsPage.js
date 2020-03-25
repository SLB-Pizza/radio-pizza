import React from "react";
import { ResidentsAlpha, SingleResident } from "./index";

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
            <p className="title is-size-1">Residents</p>
          </div>
        </div>
        <div className="columns is-mobile resident-box">
          <div className="column is-narrow alphabet">
            {alphabet.map(letter => (
              <ResidentsAlpha key={letter} letter={letter} />
            ))}
          </div>
          <div className="column is-1">
            <p className="title is-size-5">size 1</p>
          </div>
          <div className="column is-9">
            <SingleResident />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResidentsPage;
