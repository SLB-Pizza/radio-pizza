import React from "react";
import { SingleMix } from "../../components/";

function ResidentBioIndexPage() {
  return (
    <div className="resident-bio">
      <div className="container is-fluid image-diffuser">
        <div className="columns is-vcentered is-multiline">
          <div className="column is-3">
            <figure className="image is-1by1">
              <img
                src="https://robohash.org/4H1.png?set=set1"
                alt="Rowdy Robo"
              />
            </figure>
          </div>
          <div className="column is-offset-2 is-7">
            <p className="title is-size-1-desktop is-size-3-touch ">
              RowdyRobo
            </p>
            <p className="subtitle is-size-3-desktop is-size-5-touch ">
              Homebuilt MixMasterDroid rev.9001
            </p>
            <p className="is-size-5-desktop is-size-7-touch">
              The only home we’ve ever known preserve and cherish that pale blue
              dot. Cosmic fugue, circumnavigated descended from astronomers
              decipherment, permanence of the stars science Euclid muse about! A
              still more glorious dawn awaits Euclid, tendrils of gossamer
              clouds extraplanetary muse about vastness is bearable only through
              love Cambrian explosion! Extraordinary claims require
              extraordinary evidence of brilliant syntheses? Take root and
              flourish, stirred by starlight billions upon billions Drake
              Equation.
            </p>
          </div>
        </div>
        <hr />
        <div className="columns is-vcentered is-multiline bio-mixes">
          <div className="column is-12">
            <p className="title is-size-2-desktop is-size-4-touch has-text-centered">
              Mixes by RowdyRobo
            </p>
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
          <SingleMix />
          <SingleMix />
          <SingleMix />
          <SingleMix />
        </div>
      </div>
    </div>
  );
}

export default ResidentBioIndexPage;
