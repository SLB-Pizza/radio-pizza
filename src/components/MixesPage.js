import React from "react";
import { SingleMix } from "./index";

function MixesPage() {
  return (
    <div className="container is-fluid mixes-page">
      <div className="columns is-multiline">
        <div className="column is-12">
          <p className="title is-1">Radio Mixes</p>
        </div>
        <SingleMix />
        <SingleMix />
        <SingleMix />
        <SingleMix />
        <SingleMix />
        <SingleMix />
        <SingleMix />
        <SingleMix />
        <SingleMix />
        <SingleMix />
      </div>
    </div>
  );
}

export default MixesPage;
