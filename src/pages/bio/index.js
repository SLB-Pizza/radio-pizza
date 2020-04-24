import React from "react";
import { BioImageBlurb, BioMixList } from "../../components/";

function ResidentBioIndexPage() {
  return (
    <div className="container is-fluid resident-bio">
      <BioImageBlurb />
      <hr />
      <BioMixList />
      <div className="columns is-mobile is-vcentered">
        <div className="column">
          <hr />
        </div>
        <div className="column is-narrow">
          <figure className="image is-64x64">
            <img src={`../../img/halfmoon-3.png`} alt="HalfmoonBK logo" />
          </figure>
        </div>

        <div className="column">
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ResidentBioIndexPage;
