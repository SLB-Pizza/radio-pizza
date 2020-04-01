import React from "react";
import { BioImageBlurb, BioMixList } from "../../components/";

function ResidentBioIndexPage() {
  return (
    <div className="resident-bio">
      <div className="container is-fluid image-diffuser">
        {/* <div className="columns in-progress">
          <div className="column is-full">
            <p className="title is-size-3-desktop is-size-5-touch has-text-centered">
              ⚠️ Layout In Progress! ⚠️
            </p>
          </div>
        </div> */}
        <BioImageBlurb />
        <hr />
        <BioMixList />
      </div>
    </div>
  );
}

export default ResidentBioIndexPage;
