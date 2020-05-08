import React from "react";
import { BioImageBlurb, BioMixList, HMBKDivider } from "../../components/";

function ResidentBioIndexPage() {
  return (
    <div className="container is-fluid resident-bio">
      <BioImageBlurb />
      <hr />
      <BioMixList />
      <HMBKDivider />
    </div>
  );
}

export default ResidentBioIndexPage;
