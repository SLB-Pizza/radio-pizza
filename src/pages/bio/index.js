import React from "react";
import { BioImageBlurb, BioMixList, BioPagination } from "../../components/";

function ResidentBioIndexPage() {
  return (
    <div className="resident-bio">
      <div className="container is-fluid image-diffuser">
        <BioImageBlurb />
        <hr />
        <BioMixList />
        <BioPagination />
      </div>
    </div>
  );
}

export default ResidentBioIndexPage;
