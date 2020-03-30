import React from "react";

function BioImageBlurb(props) {
  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column is-half-mobile is-one-quarter-tablet is-3-desktop">
        <figure className="image is-1by1">
          <img src="https://robohash.org/4H1.png?set=set1" alt="Rowdy Robo" />
        </figure>
      </div>
      <div className="column is-half-mobile is-three-quarters-tablet is-9-desktop">
        <p className="title is-size-1-desktop is-size-3-touch ">RowdyRobo</p>
        <p className="subtitle is-size-3-desktop is-size-5-touch">
          Homebuilt MixMaster Droid rev.9001
        </p>
        <p className="is-size-5-desktop is-size-7-touch">
          The only home we’ve ever known preserve and cherish that pale blue
          dot. Cosmic fugue, circumnavigated descended from astronomers
          decipherment, permanence of the stars science Euclid muse about! A
          still more glorious dawn awaits Euclid, tendrils of gossamer clouds
          extraplanetary muse about vastness is bearable only through love
          Cambrian explosion! Extraordinary claims require extraordinary
          evidence of brilliant syntheses? Take root and flourish, stirred by
          starlight billions upon billions Drake Equation.
        </p>
      </div>
    </div>
  );
}

export default BioImageBlurb;
