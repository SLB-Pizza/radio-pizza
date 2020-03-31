import React from "react";
import {
  BioImageBlurb,
  BioMixList,
  SingleMix,
  InProgress
} from "../../components/";

function ResidentBioIndexPage() {
  return (
    <div className="resident-bio">
      <div className="container is-fluid image-diffuser">
        <div className="columns in-progress">
          <div className="column is-full">
            <p className="title is-size-3-desktop is-size-5-touch has-text-centered">
              ⚠️ Layout In Progress! ⚠️
            </p>
            {/* <p className="subtitle is-size-5 has-text-centered">
              Please view this page on desktop.
            </p> */}
          </div>
        </div>
        <BioImageBlurb />
        <hr />
        <BioMixList />
      </div>
    </div>
  );
}

export default ResidentBioIndexPage;
