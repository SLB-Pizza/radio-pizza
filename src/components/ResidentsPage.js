import React from "react";
import { ResidentsAlpha } from "./index";

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
        <div className="columns is-mobile">
          <div className="column is-2">
            {alphabet.map(letter => (
              <ResidentsAlpha key={letter} letter={letter} />
            ))}
          </div>
          <div className="column is-1">
            <p className="title is-size-5">size 1</p>
          </div>
          <div className="column is-9">
            <p className="title is-size-5">SingleResident</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResidentsPage;
