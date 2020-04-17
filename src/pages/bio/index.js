import React from "react";
import { BioImageBlurb, BioMixList } from "../../components/";

function ResidentBioIndexPage() {
  return (
    <div className="resident-bio">
      <div className="container is-fluid">
        <BioImageBlurb />
        <hr />
        <BioMixList />
      </div>
    </div>
  );
}

export default ResidentBioIndexPage;
